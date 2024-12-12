import { d as defineEventHandler, a as useRuntimeConfig, r as readBody } from '../../../_/nitro.mjs';
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

const checkout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const stripe = await useServerStripe(event);
  const body = await readBody(event);
  const userCountry = body.country;
  const websiteId = body.websiteId;
  const plan = body.plan;
  try {
    const { data: prices } = await stripe.prices.list({
      product: config.stripe.productId
    });
    const preferredCurrency = userCountry === "BR" ? "brl" : "usd";
    const priceData = prices.find(
      (price) => {
        var _a;
        return price.currency === preferredCurrency.toLowerCase() && ((_a = price.nickname) == null ? void 0 : _a.includes(plan));
      }
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
          quantity: 1
        }
      ],
      metadata: {
        websiteId,
        plan
      },
      mode: "payment",
      success_url: `${config.public.baseUrl}/success/${websiteId}`,
      cancel_url: `${config.public.baseUrl}/`
    });
    return {
      sessionId: session.id,
      error: null
    };
  } catch (e) {
    return {
      sessionId: null,
      error: `Something went wrong: ${e}`
    };
  }
});

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
