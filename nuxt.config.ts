export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: `${process.env.NUXT_BASE_URL}/api/auth`,
  },
  runtimeConfig: {
    public: {
      authBaseUrl: `${process.env.NUXT_BASE_URL}/api/auth`,
    },
    authSecret: process.env.NUXT_AUTH_SECRET,
  },
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
