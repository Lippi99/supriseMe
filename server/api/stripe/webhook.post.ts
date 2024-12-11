import { useServerStripe } from "#stripe/server";
import { readRawBody } from "h3";
import {
  deleteWebsiteFailure,
  updateWebsiteSuccess,
} from "~/server/services/website";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const stripe = await useServerStripe(event);
  const sig = event.node.req.headers["stripe-signature"];
  const body = await readRawBody(event);
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string | string[],
      config.stripe.webhook.secret as string
    );

    if (stripeEvent.type === "checkout.session.async_payment_succeeded") {
      const session = stripeEvent.data.object;
      const websiteId = session.metadata?.websiteId;

      await updateWebsiteSuccess(
        session.customer_details?.email as string,
        websiteId as string
      );
    } else if (stripeEvent.type === "checkout.session.async_payment_failed") {
      const session = stripeEvent.data.object;
      const websiteId = session.metadata?.websiteId;

      await deleteWebsiteFailure(
        session.customer_details?.email as string,
        websiteId as string
      );
    } else if (stripeEvent.type === "checkout.session.expired") {
      const session = stripeEvent.data.object;
      const websiteId = session.metadata?.websiteId;

      await deleteWebsiteFailure(
        session.customer_details?.email as string,
        websiteId as string
      );
    } else if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const websiteId = session.metadata?.websiteId;
      await updateWebsiteSuccess(
        session.customer_details?.email as string,
        websiteId as string
      );
    }

    return { status: 200 };
  } catch (err) {
    return createError({
      statusCode: 400,
      statusMessage: "Webhook error",
    });
  }
});
