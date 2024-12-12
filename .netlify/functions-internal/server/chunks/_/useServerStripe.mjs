import Stripe from 'stripe';
import { a as useRuntimeConfig } from './nitro.mjs';

const useServerStripe = async (event) => {
  const { stripe: { key, options } } = useRuntimeConfig();
  if (event.context._stripe) return event.context._stripe;
  if (!key) console.warn("no key given for server service");
  const stripe = new Stripe(key, options);
  event.context._stripe = stripe;
  return event.context._stripe;
};

export { useServerStripe as u };
//# sourceMappingURL=useServerStripe.mjs.map
