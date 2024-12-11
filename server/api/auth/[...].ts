import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_SECRET,
    }),
  ],
  callbacks: {},
});