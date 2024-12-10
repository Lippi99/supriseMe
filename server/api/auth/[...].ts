import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: "asldfkhw8973zx69023aab38742",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: "241624940914-nealqrmkbn3evs73u2ua9e10rbe4v7g6.apps.googleusercontent.com",
      clientSecret: "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"
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
