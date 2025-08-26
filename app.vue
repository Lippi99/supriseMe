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
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/logo.webp'
    },
    {
      rel: 'shortcut icon',
      type: 'image/webp', 
      href: '/logo.webp'
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/surpriseme_192_192.webp'
    }
  ],
});
</script>
