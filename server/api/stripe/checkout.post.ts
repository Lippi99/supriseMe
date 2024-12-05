import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event);
  const body = await readBody(event);

  const userCountry = body.country;
  const websiteId = body.websiteId as number;
  const plan = body.plan as string;

  try {
    const { data: prices } = await stripe.prices.list({
      product: process.env.STRIPE_PRODUCT_ID,
    });

    const preferredCurrency = userCountry === "BR" ? "brl" : "usd";

    const priceData = prices.find(
      (price) =>
        price.currency === preferredCurrency.toLowerCase() &&
        price.nickname?.includes(plan)
    );

    if (!priceData) {
      throw new Error(
        `Price not available for plan: ${plan} and currency: ${preferredCurrency}`
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceData.id,
          quantity: 1,
        },
      ],
      metadata: {
        websiteId,
        plan,
      },
      mode: "payment",
      success_url: `${process.env.NUXT_BASE_URL}/success/${websiteId}`,
      cancel_url: `${process.env.NUXT_BASE_URL}/`,
    });

    return {
      sessionId: session.id,
      error: null,
    };
  } catch (e) {
    return {
      sessionId: null,
      error: `Something went wrong: ${e}`,
    };
  }
});
