import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import {
  deleteWebsiteFailure,
  updateWebsiteSuccess,
} from "~/server/services/website";

// Track processed events to prevent duplicate processing (in-memory)
const processedEvents = new Set<string>();

// Verify MercadoPago webhook signature
function verifyMercadoPagoSignature(event: any, webhookSecret: string): void {
  const xSignature = getHeader(event, "x-signature");
  const xRequestId = getHeader(event, "x-request-id");

  if (!xSignature || !xRequestId) {
    console.error("Missing signature headers");
    throw createError({
      statusCode: 401,
      statusMessage: "Missing webhook signature headers",
    });
  }

  // Get the data ID from query params (MercadoPago sends it)
  const query = getQuery(event);
  const dataId = query.data?.id || query["data.id"];

  if (!dataId) {
    console.error("Missing data ID in query params");
    throw createError({
      statusCode: 400,
      statusMessage: "Missing data ID",
    });
  }

  try {
    // MercadoPago signature format: ts=<timestamp>,v1=<hash>
    const parts = xSignature.split(",");
    let ts = "";
    let hash = "";

    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key === "ts") ts = value;
      if (key === "v1") hash = value;
    }

    if (!ts || !hash) {
      console.error("Invalid signature format");
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid signature format",
      });
    }

    // Create manifest: id + request_id + ts
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    // Calculate HMAC SHA256
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(manifest);
    const calculatedHash = hmac.digest("hex");

    if (calculatedHash !== hash) {
      console.error("Webhook signature validation failed", {
        expected: hash,
        calculated: calculatedHash,
      });
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid webhook signature",
      });
    }

    console.log("Webhook signature verified successfully");
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Error verifying webhook signature:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Signature verification failed",
    });
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow POST requests
  assertMethod(event, "POST");

  try {
    // Verify webhook signature
    const webhookSecret = config.mercadopago.webhookSecret;
    if (webhookSecret) {
      verifyMercadoPagoSignature(event, webhookSecret);
    } else {
      console.warn("⚠️  Webhook secret not configured - skipping signature verification");
    }

    const body = await readBody(event);

    console.log("MercadoPago webhook received:", {
      type: body.type,
      action: body.action,
      dataId: body.data?.id,
    });

    const { type, data } = body;

    // Handle different event types
    switch (type) {
      case "payment": {
        const paymentId = data?.id;

        if (!paymentId) {
          throw createError({
            statusCode: 400,
            statusMessage: "Missing payment ID in webhook",
          });
        }

        // Check idempotency
        const eventKey = `payment-${paymentId}-${body.action}`;
        if (processedEvents.has(eventKey)) {
          console.log(`Event ${eventKey} already processed, skipping`);
          return { received: true, message: "Event already processed" };
        }

        // Fetch payment details
        const client = new MercadoPagoConfig({
          accessToken: config.mercadopago.accessToken,
          options: { timeout: 5000 },
        });

        const payment = new Payment(client);
        const paymentData = await payment.get({ id: paymentId });

        console.log(`Processing payment: ${paymentId}`, {
          status: paymentData.status,
          dateApproved: paymentData.date_approved,
          metadata: paymentData.metadata,
        });

        // Check if payment is approved (credit card OR PIX)
        if (
          paymentData.status === "approved" ||
          paymentData.date_approved !== null
        ) {
          const websiteId = paymentData.metadata?.website_id;
          const userEmail =
            paymentData.metadata?.user_email || paymentData.payer?.email;

          if (!websiteId || !userEmail) {
            console.error("Missing required metadata:", {
              websiteId,
              userEmail,
              paymentId,
            });
            throw createError({
              statusCode: 400,
              statusMessage: "Invalid payment metadata",
            });
          }

          await updateWebsiteSuccess(userEmail, websiteId);
          console.log(
            `✅ Website ${websiteId} activated successfully (Payment: ${paymentId})`
          );

          // Mark as processed
          processedEvents.add(eventKey);

          // Clean up old events (keep last 1000)
          if (processedEvents.size > 1000) {
            const eventsArray = Array.from(processedEvents);
            processedEvents.clear();
            eventsArray.slice(-500).forEach((id) => processedEvents.add(id));
          }
        } else if (
          paymentData.status === "rejected" ||
          paymentData.status === "cancelled" ||
          paymentData.status === "refunded" ||
          paymentData.status === "charged_back"
        ) {
          const websiteId = paymentData.metadata?.website_id;
          const userEmail =
            paymentData.metadata?.user_email || paymentData.payer?.email;

          if (websiteId && userEmail) {
            await deleteWebsiteFailure(userEmail, websiteId);
            console.log(
              `❌ Website ${websiteId} deleted due to payment failure (Payment: ${paymentId}, Status: ${paymentData.status})`
            );
          }

          processedEvents.add(eventKey);
        } else {
          console.log(
            `⏳ Payment ${paymentId} is pending (status: ${paymentData.status})`
          );
        }

        break;
      }

      default:
        console.log("Unhandled event type:", type);
    }

    return { received: true };
  } catch (error: any) {
    console.error("MercadoPago webhook processing error:", error);

    // Re-throw validation and auth errors
    if (error.statusCode === 400 || error.statusCode === 401) {
      throw error;
    }

    // For other errors, log but return success to prevent retries
    console.error("Webhook processing failed, returning success:", error.message);
    return {
      received: true,
      error: error.message,
    };
  }
});
