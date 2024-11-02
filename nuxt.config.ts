export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui", "@nuxt/image"],
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
