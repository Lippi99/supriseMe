export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
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
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@nuxthub/core",
  ],
  auth: {
    baseURL: "https://surprise-me.nuxt.dev/api/auth",
    isEnabled: true,
    provider: {
      type: "authjs"
    },
    disableServerSideAuth: false,
    originEnvKey: "https://surprise-me.nuxt.dev",
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: false,
    },
  },
  runtimeConfig: {
    authSecret:"asldfkhw8973zx69023aab38742",
    },
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en", "pt"],
    defaultLocale: "pt",
  },
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
