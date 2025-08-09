import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";
import { createUser, getUser } from "~/server/services/user";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.auth.secret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: config.auth.providers.google.client,
      clientSecret: config.auth.providers.google.secret,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email && user.name) {
        try {
          // Check if user already exists
          const existingUser = await getUser(user.email);
          
          if (!existingUser) {
            // Create new user with Gmail data
            await createUser({
              email: user.email,
              name: user.name,
              image: user.image || null,
            });
          }
          
          return true;
        } catch (error) {
          console.error("Error creating user during Google sign-in:", error);
          return false;
        }
      }
      
      return true;
    },
  },
});