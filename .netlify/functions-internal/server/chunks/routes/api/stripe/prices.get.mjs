import { d as defineEventHandler, a as useRuntimeConfig, i as createError } from '../../../_/nitro.mjs';
import { u as useServerStripe } from '../../../_/useServerStripe.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'stripe';

const prices_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const stripe = await useServerStripe(event);
  try {
    const { data } = await stripe.prices.list({
      product: config.stripe.productId,
      expand: ["data.currency_options"]
    });
    const prices = data.map((price) => {
      var _a, _b;
      return {
        plan: price.nickname,
        brl: (parseInt(
          (_a = price.currency_options) == null ? void 0 : _a["brl"].unit_amount_decimal
        ) / 100).toFixed(2),
        usd: (parseInt(
          (_b = price.currency_options) == null ? void 0 : _b["usd"].unit_amount_decimal
        ) / 100).toFixed(2)
      };
    });
    return { prices };
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch prices"
    });
  }
});

export { prices_get as default };
//# sourceMappingURL=prices.get.mjs.map
