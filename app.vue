<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/webp",
      href: "/logo.webp",
    },
    {
      rel: "shortcut icon",
      type: "image/webp",
      href: "/logo.webp",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/surpriseme_192_192.webp",
    },
  ],
});

// TypeScript declarations for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

useScript("https://www.googletagmanager.com/gtag/js?id=G-F0JDJGDP4H");

onMounted(() => {
  if (import.meta.client) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-F0JDJGDP4H");
  }
});
</script>
