export default defineNuxtConfig({
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@unlok-co/nuxt-stripe",
  ],
  stripe: {
    server: {
      key: process.env.STRIPE_SERVER_SECRET_KEY,
    },
    client: {
      key: process.env.NUXT_STRIPE_PUBLIC_KEY,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: {
    preference: "dark",
  },

  css: ["~/public/css/tailwind.css"],
  compatibilityDate: "2024-11-19",
});
