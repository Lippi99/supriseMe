import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const stripe = await useServerStripe(event);

  try {
    const { data } = await stripe.prices.list({
      product: config.stripe.productId,
      expand: ["data.currency_options"],
    });

    const prices = data.map((price) => {
      return {
        plan: price.nickname,
        brl: (
          parseInt(
            price.currency_options?.["brl"].unit_amount_decimal as string
          ) / 100
        ).toFixed(2),
        usd: (
          parseInt(
            price.currency_options?.["usd"].unit_amount_decimal as string
          ) / 100
        ).toFixed(2),
      };
    });

    // Only return necessary data (avoid exposing sensitive details)

    return { prices };
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch prices",
    });
  }
});
