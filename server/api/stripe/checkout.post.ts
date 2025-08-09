import { useServerStripe } from "#stripe/server";
import { z } from "zod";
import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";

// Input validation schema
const checkoutSchema = z.object({
  websiteId: z.number().int().positive("Website ID must be a positive integer"),
  websiteGuid: z.string().min(1, "Website GUID is required"),
  plan: z.enum(["Basic", "Premium"], {
    message: "Plan must be Basic or Premium",
  }),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow POST requests
  assertMethod(event, "POST");

  try {
    const stripe = await useServerStripe(event);
    const body = await readBody(event);

    // Validate input
    const validatedData = checkoutSchema.parse(body);
    const { websiteId, websiteGuid, plan } = validatedData;

    // Get authenticated user info
    const session = await getServerSession(event);
    if (!session?.user?.email) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication required",
      });
    }

    // Verify website ownership
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userEmail: session.user.email,
      },
    });

    if (!website) {
      throw createError({
        statusCode: 403,
        statusMessage: "Unauthorized: Website not found or access denied",
      });
    }

    // Generate lookup key based on plan
    const lookupKey = plan === "Basic" 
      ? "surpriseme-website-basic" 
      : "surpriseme-website-premium";

    // Get price using lookup key
    let priceData;
    try {
      const { data: prices } = await stripe.prices.list({
        lookup_keys: [lookupKey],
        active: true,
      });

      priceData = prices[0];
    } catch (error) {
      console.error(`Failed to fetch price with lookup key: ${lookupKey}`, error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to retrieve pricing information",
      });
    }

    if (!priceData) {
      throw createError({
        statusCode: 400,
        statusMessage: `Price not found for plan: ${plan} (lookup key: ${lookupKey})`,
      });
    }

    // Create checkout session with enhanced security
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceData.id,
          quantity: 1,
        },
      ],
      metadata: {
        websiteId: websiteId.toString(),
        plan,
        userEmail: session.user.email,
      },
      customer_email: session.user.email,
      mode: "payment",
      success_url: `${config.public.baseUrl}/success/${websiteGuid}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.baseUrl}/create?canceled=true`,
      // Add session expiration (24 hours)
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      // Enable automatic tax calculation if configured
      automatic_tax: { enabled: false },
      // Add billing address collection for compliance
      billing_address_collection: "required",
      // Add phone number collection for better fraud prevention
      phone_number_collection: { enabled: true },
      // Set default locale to English
      locale: "en",
    });

    // Log successful session creation (without sensitive data)
    console.log(
      `Checkout session created: ${checkoutSession.id} for website: ${websiteId}`
    );

    return {
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      error: null,
    };
  } catch (error: any) {
    // Enhanced error handling
    console.error("Checkout session creation failed:", error);

    if (error.statusCode) {
      throw error; // Re-throw HTTP errors
    }

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid input data",
        data: error.errors,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create checkout session",
    });
  }
});
