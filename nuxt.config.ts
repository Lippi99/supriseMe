export default defineNuxtConfig({
  ssr: true,
  devtools: {
    enabled: true,
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
    url: process.env.NUXT_PUBLIC_BASE_URL || "https://surpriseme.app",
    name: "SurpriseMe",
    description:
      "Create surprise pages for someone special with photos, messages and themes",
    defaultLocale: "pt",
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      googleSignInClientId: process.env.NUXT_GOOGLE_CLIENT,
    },
    stripe: {
      productId: process.env.NUXT_STRIPE_PRODUCT_ID,
      productName: process.env.NUXT_STRIPE_PRODUCT_NAME,
      webhook: {
        secret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
      },
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
    hostname: process.env.NUXT_PUBLIC_BASE_URL || "https://surpriseme.app",
    gzip: true,
    routes: ["/", "/create", "/privacy-policy", "/term-services"],
  },

  robots: {
    hostname: process.env.NUXT_PUBLIC_BASE_URL || "https://surpriseme.app",
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

  compatibilityDate: "2024-11-19",

  hub: {
    database: true,
    blob: false,
    kv: false,
  },
});
