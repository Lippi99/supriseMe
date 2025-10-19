export default defineNuxtConfig({
  ssr: true,
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },

        // Apple devices
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        // Android devices
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },

        // Web App Manifest
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  vite: {
    server: {},
  },
  nitro: {
    preset: "node-server",
    experimental: {
      wasm: true,
    },
    prerender: {
      routes: ["/sitemap.xml"],
      autoSubfolderIndex: false,
    },
    rollupConfig: {
      external: ["sharp"],
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL || "https://www.surpriseme.com.br",
    name: "SurpriseMe",
    description:
      "Create surprise pages for someone special with photos, messages and themes",
    defaultLocale: "pt",
  },
  runtimeConfig: {
    public: {
      baseUrl:
        process.env.NUXT_PUBLIC_BASE_URL || "https://www.surpriseme.com.br",
      googleSignInClientId: process.env.NUXT_GOOGLE_CLIENT,
    },
    stripe: {
      productId: process.env.NUXT_STRIPE_PRODUCT_ID,
      productName: process.env.NUXT_STRIPE_PRODUCT_NAME,
      webhook: {
        secret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
      },
    },
    mercadopago: {
      accessToken: process.env.NUXT_MERCADOPAGO_ACCESS_TOKEN,
      publicKey: process.env.NUXT_MERCADOPAGO_PK,
      webhookSecret: process.env.NUXT_MERCADOPAGO_WEBHOOK,
    },
    r2: {
      accountId: process.env.NUXT_R2_ACCOUNT_ID,
      apiToken: process.env.NUXT_R2_API_TOKEN,
      bucketName: process.env.NUXT_R2_BUCKET_NAME,
      publicDomain: process.env.NUXT_R2_PUBLIC_DOMAIN,
    },
  },
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  googleSignIn: {
    clientId: process.env.NUXT_GOOGLE_CLIENT,
  },
  modules: [
    "nuxt-vue3-google-signin",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@unlok-co/nuxt-stripe",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/seo",
    "nuxt-gtag",
  ],
  image: {
    cloudflare: {
      baseURL: "https://imagedelivery.net",
    },
    domains: ["pub-10ca3048728847c5b410c357acd03135.r2.dev"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en", "pt"],
    defaultLocale: "pt",
  },
  mercadopago: {
    publicKey: process.env.NUXT_MERCADOPAGO_PK || "",
    accessToken: process.env.NUXT_MERCADOPAGO_ACCESS_TOKEN || "",
  },
  stripe: {
    server: {
      key: process.env.NUXT_STRIPE_SECRET_KEY || "",
    },
    client: {
      key: process.env.NUXT_STRIPE_CLIENT_KEY || "",
    },
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ["~/public/css/tailwind.css"],

  colorMode: {
    preference: "dark",
  },

  sitemap: {
    hostname:
      process.env.NUXT_PUBLIC_BASE_URL || "https://www.surpriseme.com.br",
    gzip: true,
    routes: ["/", "/create", "/privacy-policy", "/term-services"],
  },

  robots: {
    hostname:
      process.env.NUXT_PUBLIC_BASE_URL || "https://www.surpriseme.com.br",
    sitemap: "/sitemap.xml",
    rules: [
      {
        UserAgent: "*",
        Allow: "/",
        Disallow: ["/api/*", "/success/*"],
      },
    ],
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: process.env.NUXT_GOOGLE_ANALYTICS_ID,
    initCommands: [
      // Setup up consent mode
      [
        "consent",
        "default",
        {
          ad_user_data: "granted",
          ad_personalization: "granted",
          ad_storage: "granted",
          analytics_storage: "granted",
          wait_for_update: 500,
        },
      ],
    ],
  },

  compatibilityDate: "2024-11-19",

  hub: {
    database: true,
    blob: false,
    kv: false,
  },
});
