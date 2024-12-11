import GoogleProvider from "next-auth/providers/google";
// import { NuxtAuthHandler } from "#auth";

const config = useRuntimeConfig();

// export default NuxtAuthHandler({
//   secret: config.auth.secret,
//   providers: [
//     // @ts-expect-error Use .default here for it to work during SSR.
//     GoogleProvider.default({
//       clientId: config.auth.providers.google.client,
//       clientSecret: config.auth.providers.google.secret,
//     }),
//   ],
//   callbacks: {},
// });