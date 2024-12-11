export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      authBaseURL: process.env.AUTH_ORIGIN || "http://localhost:3000",
    },
    authSecret: process.env.NUXT_AUTH_SECRET
  },
  nitro: {
    preset: "cloudflare-pages"
  },
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  auth: {
    provider: {
      type: "authjs"
    },
    isEnabled: true,
    baseURL: `${process.env.AUTH_ORIGIN}/api/auth` || "http://localhost:3000/api/auth",
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@unlok-co/nuxt-stripe",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
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