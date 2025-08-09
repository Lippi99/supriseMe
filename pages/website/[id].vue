<template>
  <title>{{ data?.website?.name }}</title>
  <NuxtLayout>
    <main class="relative left-0 top-0 right-0 bottom-0 h-full pt-10" role="main">
      <header>
        <h1 class="text-6xl text-center mb-10">{{ data?.website?.name }}</h1>
      </header>

      <YoutubeMusic v-if="linkUrlNotEmpty" isDetail :url="linkUrl || ''" />

      <section class="max-w-md m-auto w-full flex flex-col items-center" aria-label="Surprise messages and photos">
        <!-- Dynamically Iterate Over Messages -->
        <article
          v-for="(message, index) in data?.website?.messages"
          :key="index"
          class="w-full flex flex-col items-center mt-32 pb-10"
          :aria-labelledby="`message-${index}`"
        >
          <PolaroidPhoto>
            <NuxtImg
              class="w-full max-w-[500px] h-[400px] rounded-md object-cover"
              :alt="`Photo ${index + 1}: ${message?.message?.substring(0, 100)}${message?.message?.length > 100 ? '...' : ''}`"
              :src="message?.image"
              loading="lazy"
              width="500"
              height="400"
            />
          </PolaroidPhoto>
          <div class="my-10 w-full h-px bg-gray-500" role="separator" />
          <div class="w-full break-words">
            <h2 :id="`message-${index}`" class="text-xl">{{ message?.message }}</h2>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Footer from "~/components/Footer.vue";
import type { IWebsiteClient } from "~/models/IWebsite";
import { useThemeStore } from "~/store/useTheme";

const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id);
const { data, error } = await useFetch<IWebsiteClient>(
  `/api/website/${id.value}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

useSeoMeta({
  title: `${data?.value?.website?.name} - SurpriseMe`,
  ogTitle: `${data?.value?.website?.name} - SurpriseMe`,
  description: `A special surprise page created for ${data?.value?.website?.name}. View personalized messages and photos.`,
  ogDescription: `A special surprise page created for ${data?.value?.website?.name}. View personalized messages and photos.`,
  ogImage: data?.value?.website?.messages?.[0]?.image || '/icons/surpriseme_512_512.png',
  ogImageAlt: `Surprise page for ${data?.value?.website?.name}`,
  twitterCard: 'summary_large_image',
  twitterImage: data?.value?.website?.messages?.[0]?.image || '/icons/surpriseme_512_512.png',
  robots: 'noindex, nofollow',
  keywords: 'surprise page, personal message, gift, special moment',
});

const { startGlobal } = useThemeStore();

onMounted(() => {
  if (error.value?.statusCode == 400) {
    router.push("website/404");
    return;
  }
  startGlobal(
    data?.value?.website?.theme as string, 
    data?.value?.website?.customThemeImage as string
  );
});

const linkUrl = computed(() => {
  return data?.value?.website?.songUrl;
});

const linkUrlNotEmpty = computed(() => {
  return !!linkUrl.value;
});
</script>
