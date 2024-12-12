export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      baseUrl: ''
    },
    auth: {
      secret: '',
      providers: {
        google: {
          client: '',
          secret: ''
        }
      },
    },
    stripe: {
      productId: '',
      productName: '',
      webhook: {
        secret: '',
      },
    },
    s3: {
      accessKeyId: '',
      secretKeyId: '',
    },
    database: {
      url: '',
    }
  },
  nitro: {
    preset: "netlify",
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