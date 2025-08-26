<template>
  <title>{{ data?.website?.name }}</title>
  <NuxtLayout>
    <main
      class="relative min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      role="main"
    >
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/20 dark:to-pink-900/20"></div>
          <div class="absolute inset-0 dot-pattern"></div>
        </div>
        
        <header class="relative z-10 max-w-6xl mx-auto pt-8 sm:pt-16 lg:pt-20 pb-8 px-4">
          <div class="text-center">
            <div class="inline-block">
              <h1
                class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in"
              >
                {{ data?.website?.name }}
              </h1>
              <div class="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-20 mx-auto"></div>
            </div>
            <p class="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
              A special collection of memories just for you ✨
            </p>
          </div>
        </header>
      </div>

      <YoutubeMusic v-if="linkUrlNotEmpty" isDetail :url="linkUrl || ''" class="mb-12" />

      <!-- Messages Section -->
      <section
        class="relative z-10 max-w-4xl mx-auto px-4 pb-20"
        aria-label="Surprise messages and photos"
      >
        <article
          v-for="(message, index) in data?.website?.messages"
          :key="index"
          class="group mb-24 sm:mb-32 lg:mb-40 last:mb-12"
          :aria-labelledby="`message-${index}`"
          :class="`animate-slide-up-${index % 3}`"
        >
          <!-- Photo Container -->
          <div class="flex justify-center mb-8 sm:mb-12">
            <div class="relative group/photo">
              <!-- Shadow/Glow Effect -->
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-sm opacity-25 group-hover/photo:opacity-75 transition-opacity duration-700"></div>
              
              <!-- Polaroid Frame -->
              <div class="relative">
                <PolaroidPhoto class="transform group-hover:scale-105 transition-all duration-700 shadow-2xl hover:shadow-purple-500/25">
                  <NuxtImg
                    class="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] rounded-lg h-auto"
                    :alt="`Photo ${index + 1}: ${message?.message?.substring(0, 100)}${message?.message?.length > 100 ? '...' : ''}`"
                    :src="message?.image"
                    loading="lazy"
                  />
                </PolaroidPhoto>
                
                <!-- Floating Number Badge -->
                <div class="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Divider -->
          <div class="flex items-center justify-center mb-8 sm:mb-12">
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-700"></div>
            <div class="mx-4">
              <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent dark:via-purple-700"></div>
          </div>

          <!-- Message Content -->
          <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative">
              <!-- Quote Marks -->
              <div class="absolute -top-2 -left-2 text-6xl text-purple-200 dark:text-purple-800 font-serif leading-none">"</div>
              <div class="absolute -bottom-8 -right-2 text-6xl text-purple-200 dark:text-purple-800 font-serif leading-none">"</div>
              
              <!-- Message Text -->
              <blockquote
                :id="`message-${index}`"
                class="relative text-xl sm:text-2xl lg:text-3xl text-center leading-relaxed text-gray-800 dark:text-gray-200 font-medium italic p-8"
              >
                {{ message?.message }}
              </blockquote>
            </div>
          </div>
        </article>

        <!-- End Decoration -->
        <div class="text-center mt-16">
          <div class="inline-flex items-center space-x-2 text-purple-500 dark:text-purple-400">
            <div class="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            <div class="w-2 h-2 rounded-full bg-current animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 rounded-full bg-current animate-pulse" style="animation-delay: 0.4s"></div>
          </div>
          <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm">Made with 💜 on SurpriseMe</p>
        </div>
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
  title: `${data?.value?.website?.name} - Your Special Surprise | SurpriseMe`,
  ogTitle: `A Special Surprise for ${data?.value?.website?.name}`,
  description: `${data?.value?.website?.name}, this special surprise page was created just for you! Discover personalized messages, beautiful photos, and heartfelt memories. Created with love on SurpriseMe.`,
  ogDescription: `A heartfelt surprise page created especially for ${data?.value?.website?.name}, filled with personalized messages and cherished photos.`,
  ogImage: data?.value?.website?.messages?.[0]?.image || "https://surpriseme.app/icons/surpriseme_512_512.png",
  ogImageAlt: `Personal photo from ${data?.value?.website?.name}'s surprise page`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: "article",
  ogSiteName: "SurpriseMe",
  ogUrl: `https://surpriseme.app/website/${id.value}`,
  twitterCard: "summary_large_image",
  twitterImage: data?.value?.website?.messages?.[0]?.image || "https://surpriseme.app/icons/surpriseme_512_512.png",
  twitterTitle: `A Special Surprise for ${data?.value?.website?.name}`,
  twitterDescription: `Discover this beautiful collection of memories created especially for ${data?.value?.website?.name}`,
  twitterSite: "@surprisemeapp",
  robots: "noindex, nofollow, noarchive, nosnippet",
  author: "SurpriseMe",
  publisher: "SurpriseMe",
  themeColor: "#8b5cf6",
  colorScheme: "light dark",
  keywords: `${data?.value?.website?.name}, surprise page, personal message, gift, special moment, memories, photos, ${data?.value?.website?.theme?.toLowerCase() || 'celebration'}`,
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

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-delay {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up-0 {
  from { opacity: 0; transform: translateY(60px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slide-up-1 {
  from { opacity: 0; transform: translateY(60px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slide-up-2 {
  from { opacity: 0; transform: translateY(60px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in-delay 1s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-slide-up-0 {
  animation: slide-up-0 0.8s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-slide-up-1 {
  animation: slide-up-1 0.8s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-slide-up-2 {
  animation: slide-up-2 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

.dot-pattern {
  background-image: radial-gradient(circle, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@media (prefers-color-scheme: dark) {
  .dot-pattern {
    background-image: radial-gradient(circle, rgba(147, 51, 234, 0.2) 1px, transparent 1px);
  }
}
</style>
