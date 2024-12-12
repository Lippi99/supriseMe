import { d as defineEventHandler, a as useRuntimeConfig, x as readRawBody, i as createError } from '../../../_/nitro.mjs';
import { u as updateWebsiteSuccess, d as deleteWebsiteFailure } from '../../../_/website.mjs';
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
import 'uuid';
import '../../../_/prisma.mjs';
import '@prisma/client';
import '@aws-sdk/client-s3';
import 'stripe';

const webhook_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const config = useRuntimeConfig(event);
  const stripe = await useServerStripe(event);
  const sig = event.node.req.headers["stripe-signature"];
  const body = await readRawBody(event);
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      config.stripe.webhook.secret
    );
    if (stripeEvent.type === "checkout.session.async_payment_succeeded") {
      const session = stripeEvent.data.object;
      const websiteId = (_a = session.metadata) == null ? void 0 : _a.websiteId;
      await updateWebsiteSuccess(
        (_b = session.customer_details) == null ? void 0 : _b.email,
        websiteId
      );
    } else if (stripeEvent.type === "checkout.session.async_payment_failed") {
      const session = stripeEvent.data.object;
      const websiteId = (_c = session.metadata) == null ? void 0 : _c.websiteId;
      await deleteWebsiteFailure(
        (_d = session.customer_details) == null ? void 0 : _d.email,
        websiteId
      );
    } else if (stripeEvent.type === "checkout.session.expired") {
      const session = stripeEvent.data.object;
      const websiteId = (_e = session.metadata) == null ? void 0 : _e.websiteId;
      await deleteWebsiteFailure(
        (_f = session.customer_details) == null ? void 0 : _f.email,
        websiteId
      );
    } else if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const websiteId = (_g = session.metadata) == null ? void 0 : _g.websiteId;
      await updateWebsiteSuccess(
        (_h = session.customer_details) == null ? void 0 : _h.email,
        websiteId
      );
    }
    return { status: 200 };
  } catch (err) {
    return createError({
      statusCode: 400,
      statusMessage: "Webhook error"
    });
  }
});

export { webhook_post as default };
//# sourceMappingURL=webhook.post.mjs.map
