export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    },
    auth: {
      secret: process.env.NUXT_AUTH_SECRET,
      providers: {
        google: {
          client: process.env.NUXT_AUTH_PROVIDERS_GOOGLE_CLIENT,
          secret: process.env.NUXT_AUTH_PROVIDERS_GOOGLE_SECRET,
        }
      },
    },
    stripe: {
      productId: process.env.NUXT_STRIPE_PRODUCT_ID,
      productName: process.env.NUXT_STRIPE_PRODUCT_NAME,
      webhook: {
        secret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
      },
    },
    s3: {
      accessKeyId: process.env.NUXT_STRIPE_CLIENT_KEY,
      secretKeyId: process.env.NUXT_STRIPE_SECRET_KEY,
    },
    database: {
      url: process.env.NUXT_DATABASE_URL,
    }
  },
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  auth: {
    isEnabled: true,
    baseURL: `${process.env.NUXT_PUBLIC_BASE_URL}/api/auth`,
    sessionRefresh: {
      enablePeriodically: 1000 * 60 * 60,
      enableOnWindowFocus: false,
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
      key: process.env.NUXT_STRIPE_SECRET_KEY,
    },
    client: {
      key: process.env.NUXT_STRIPE_CLIENT_KEY,
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