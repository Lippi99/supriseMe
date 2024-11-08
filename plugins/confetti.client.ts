import VueConfetti from "vue-confetti";

export default defineNuxtPlugin({
  name: "vue-confetti",

  setup(nuxtApp) {
    nuxtApp.vueApp.use(VueConfetti);
  },
});
