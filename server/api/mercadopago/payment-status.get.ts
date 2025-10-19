import { MercadoPagoConfig, Payment } from "mercadopago";
import { z } from "zod";

// Query parameter validation
const querySchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required"),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow GET requests
  assertMethod(event, "GET");

  try {
    const query = getQuery(event);

    // Validate query parameters
    const validatedQuery = querySchema.parse(query);
    const { paymentId } = validatedQuery;

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({
      accessToken: config.mercadopago.accessToken,
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    // Get payment status
    const result = await payment.get({ id: paymentId });

    console.log(`Payment status check: ${paymentId} - Status: ${result.status}`);

    return {
      success: true,
      paymentId: result.id,
      status: result.status,
      statusDetail: result.status_detail,
      transactionAmount: result.transaction_amount,
      dateApproved: result.date_approved,
      dateCreated: result.date_created,
      metadata: result.metadata,
    };
  } catch (error: any) {
    console.error("Payment status check error:", error);

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid query parameters",
        data: error.errors,
      });
    }

    if (error.cause) {
      console.error("MercadoPago API error details:", error.cause);
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to get payment status: ${error.message}`,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to check payment status",
    });
  }
});
