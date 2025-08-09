import { useServerStripe } from "#stripe/server";
import { readRawBody } from "h3";
import {
  deleteWebsiteFailure,
  updateWebsiteSuccess,
} from "~/server/services/website";

// Track processed events to prevent duplicate processing
const processedEvents = new Set<string>();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow POST requests
  assertMethod(event, "POST");

  try {
    const stripe = await useServerStripe(event);
    const sig = event.node.req.headers["stripe-signature"];
    const body = await readRawBody(event);

    if (!sig) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing Stripe signature",
      });
    }

    if (!body) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing request body",
      });
    }

    // Verify webhook signature
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      config.stripe.webhook.secret as string
    );

    // Implement idempotency - prevent duplicate event processing
    if (processedEvents.has(stripeEvent.id)) {
      console.log(`Event ${stripeEvent.id} already processed, skipping`);
      return { received: true, message: "Event already processed" };
    }

    console.log(`Processing Stripe event: ${stripeEvent.type} (${stripeEvent.id})`);

    // Handle different event types
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object as any;
        
        // Validate required data
        if (!session.metadata?.websiteId || !session.customer_details?.email) {
          console.error("Missing required session data:", {
            websiteId: session.metadata?.websiteId,
            email: session.customer_details?.email,
          });
          throw createError({
            statusCode: 400,
            statusMessage: "Invalid session data",
          });
        }

        // Only process if payment was successful
        if (session.payment_status === "paid") {
          await updateWebsiteSuccess(
            session.customer_details.email,
            session.metadata.websiteId
          );
          console.log(`Website ${session.metadata.websiteId} activated successfully`);
        } else {
          console.log(`Payment not completed for session ${session.id}, status: ${session.payment_status}`);
        }
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = stripeEvent.data.object as any;
        
        if (session.metadata?.websiteId && session.customer_details?.email) {
          await updateWebsiteSuccess(
            session.customer_details.email,
            session.metadata.websiteId
          );
          console.log(`Website ${session.metadata.websiteId} activated after async payment`);
        }
        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = stripeEvent.data.object as any;
        
        if (session.metadata?.websiteId && session.customer_details?.email) {
          await deleteWebsiteFailure(
            session.customer_details.email,
            session.metadata.websiteId
          );
          console.log(`Website ${session.metadata.websiteId} deleted due to payment failure/expiry`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    // Mark event as processed
    processedEvents.add(stripeEvent.id);

    // Clean up old processed events (keep last 1000)
    if (processedEvents.size > 1000) {
      const eventsArray = Array.from(processedEvents);
      processedEvents.clear();
      eventsArray.slice(-500).forEach(id => processedEvents.add(id));
    }

    return { 
      received: true, 
      eventId: stripeEvent.id,
      eventType: stripeEvent.type 
    };

  } catch (error: any) {
    console.error("Webhook processing error:", error);

    // Handle Stripe signature verification errors
    if (error.type === "StripeSignatureVerificationError") {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid signature",
      });
    }

    // Handle other errors
    if (error.statusCode) {
      throw error; // Re-throw HTTP errors
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal webhook processing error",
    });
  }
});
