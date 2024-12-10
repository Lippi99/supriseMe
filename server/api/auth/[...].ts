import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_SECRET,
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session, token, user }) {
      console.log("Session callback triggered:", session, token, user);
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("Sign-in callback triggered:", user, account, profile);
      return true; // Always allow sign-in
    },
  }
});
