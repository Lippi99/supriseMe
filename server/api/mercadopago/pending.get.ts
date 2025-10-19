import { MercadoPagoConfig, Payment } from "mercadopago";
import { z } from "zod";

// Query parameter validation
const querySchema = z.object({
  payment_id: z.string().min(1, "Payment ID is required"),
  external_reference: z.string().min(1, "External reference is required"),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow GET requests
  assertMethod(event, "GET");

  try {
    const query = getQuery(event);

    // Validate query parameters
    const validatedQuery = querySchema.parse(query);
    const { payment_id: paymentId, external_reference: externalReference } = validatedQuery;

    console.log("Pending payment redirect:", { paymentId, externalReference });

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({
      accessToken: config.mercadopago.accessToken,
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    // Get payment data
    const paymentData = await payment.get({ id: paymentId });

    console.log("Payment status on return:", {
      paymentId,
      status: paymentData.status,
      dateApproved: paymentData.date_approved,
    });

    // If payment is approved or has approval date, redirect to success
    if (paymentData.status === "approved" || paymentData.date_approved !== null) {
      // Extract website GUID from metadata
      const websiteGuid = paymentData.metadata?.website_guid;

      if (websiteGuid) {
        return sendRedirect(event, `/success/${websiteGuid}`, 302);
      }

      // Fallback if no GUID in metadata
      return sendRedirect(event, `/create?payment=success`, 302);
    }

    // Payment is still pending, redirect to create page with pending status
    return sendRedirect(event, `/create?payment=pending`, 302);
  } catch (error: any) {
    console.error("Pending payment redirect error:", error);

    if (error instanceof z.ZodError) {
      // Invalid parameters, redirect to create page
      return sendRedirect(event, `/create?payment=error`, 302);
    }

    // Any other error, redirect to create page
    return sendRedirect(event, `/create?payment=error`, 302);
  }
});
