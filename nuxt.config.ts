export default defineNuxtConfig({
  plugins: [
    {
      src: "~/plugins/confetti.client",
    },
  ],
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
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
});
