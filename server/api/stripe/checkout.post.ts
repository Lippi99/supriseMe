import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  const body = await readBody(event);
  const orderAmount = body.amount || 0;
  const websiteId = body.websiteId;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: process.env.STRIPE_PRODUCT_NAME as string,
            },
            unit_amount: orderAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        websiteId,
      },
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/",
    });

    return {
      sessionId: session.id,
      error: null,
    };
  } catch (e) {
    return {
      form: null,
      sessionId: null,
      error: "Something went wrong" + e,
    };
  }
});
