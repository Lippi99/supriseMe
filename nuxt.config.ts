export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    authSecret: "asldfkhw8973zx69023aab3874",
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
    baseURL: `${process.env.AUTH_ORIGIN}/api/auth`,
    originEnvKey: `${process.env.NUXT_AUTH_ORIGIN}`,
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