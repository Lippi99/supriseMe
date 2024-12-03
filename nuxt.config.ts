export default defineNuxtConfig({
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
  },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@unlok-co/nuxt-stripe",
    "@nuxt/scripts",
    "@vite-pwa/nuxt",
  ],
  pwa: {
    manifest: {
      name: "surpriseMe",
      short_name: "surpriseMe",
      theme_color: "#000000",
      description:
        "Create custom websites for your special friends and family. Create a website for your loved ones in minutes. Share the link and let them know how much you care. Surprise them with a custom website.",
      icons: [
        {
          src: "icons/surpriseme_64_64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/surpriseme_144_144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/surpriseme_192_192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/surpriseme_512_512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },

    workbox: {
      // navigateFallback: "/",
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
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
