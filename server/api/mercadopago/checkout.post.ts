import { MercadoPagoConfig, Preference } from "mercadopago";
import { z } from "zod";
import prisma from "~/lib/prisma";

// Input validation schema
const checkoutSchema = z.object({
  websiteId: z.number().int().positive("Website ID must be a positive integer"),
  websiteGuid: z.string().min(1, "Website GUID is required"),
  plan: z.enum(["Basic", "Premium"], {
    message: "Plan must be Basic or Premium",
  }),
});

// Plan pricing in BRL (Brazilian Real)
const PLAN_PRICES = {
  Basic: 6.0,
  Premium: 12.0,
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  // Only allow POST requests
  assertMethod(event, "POST");

  try {
    const body = await readBody(event);

    // Validate input
    const validatedData = checkoutSchema.parse(body);
    const { websiteId, websiteGuid, plan } = validatedData;

    // Extract user email from cookie
    const authCookie = getCookie(event, "surprise_me_auth_user");
    let userEmail: string;
    let userName: string;

    if (!authCookie) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication required - please sign in",
      });
    }

    try {
      const userData = JSON.parse(decodeURIComponent(authCookie));
      userEmail = userData.email;
      userName = userData.name || "Cliente";

      if (!userEmail) {
        throw new Error("No email found in auth cookie");
      }
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid authentication cookie",
      });
    }

    // Verify website ownership
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userEmail: userEmail,
      },
    });

    if (!website) {
      throw createError({
        statusCode: 403,
        statusMessage: "Unauthorized: Website not found or access denied",
      });
    }

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({
      accessToken: config.mercadopago.accessToken,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);

    // Get price based on plan
    const amount = PLAN_PRICES[plan];

    // Get origin from headers for back_urls
    const origin = config.public.baseUrl;

    console.log("Creating MercadoPago checkout preference:", {
      websiteId,
      plan,
      amount,
      email: userEmail,
    });

    // Create preference with multiple payment methods (PIX, credit card, etc)
    const createdPreference = await preference.create({
      body: {
        external_reference: `website-${websiteId}`,
        metadata: {
          website_id: websiteId.toString(),
          website_guid: websiteGuid,
          plan: plan,
          user_email: userEmail,
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
            name: userName,
            surname: userName.split(" ").slice(1).join(" ") || "SurpriseMe",
          },
        }),
        items: [
          {
            id: `surpriseme-${plan.toLowerCase()}`,
            title: `SurpriseMe - Plano ${plan}`,
            description: `Página de surpresa personalizada - Plano ${plan}`,
            quantity: 1,
            unit_price: amount,
            currency_id: "BRL",
            category_id: "digital_goods",
          },
        ],
        payment_methods: {
          installments: 1, // Maximum number of installments
        },
        auto_return: "approved",
        back_urls: {
          success: `${origin}/success/${websiteGuid}`,
          failure: `${origin}/create?payment=failed`,
          pending: `${origin}/api/mercadopago/pending`,
        },
        notification_url: `${origin}/api/mercadopago/webhook`,
        statement_descriptor: "SurpriseMe",
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preference ID returned");
    }

    console.log(
      `Checkout preference created: ${createdPreference.id} for website: ${websiteId}`
    );

    return {
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
      sandboxInitPoint: createdPreference.sandbox_init_point,
    };
  } catch (error: any) {
    console.error("MercadoPago checkout error:", error);

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

    // Handle MercadoPago API errors
    if (error.cause) {
      console.error("MercadoPago API error details:", error.cause);
      throw createError({
        statusCode: 500,
        statusMessage: `Checkout creation failed: ${error.message}`,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create checkout preference",
    });
  }
});
