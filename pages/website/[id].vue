<template>
  <title>{{ data?.website?.name }}</title>
  <NuxtLayout>
    <main class="relative left-0 top-0 right-0 bottom-0 h-full pt-10">
      <h1 class="text-6xl text-center mb-10">{{ data?.website?.name }}</h1>

      <YoutubeMusic v-if="linkUrlNotEmpty" isDetail :url="linkUrl || ''" />

      <div class="max-w-md m-auto w-full flex flex-col items-center">
        <!-- Dynamically Iterate Over Messages -->
        <div
          v-for="(message, index) in data?.website?.messages"
          :key="index"
          class="w-full flex flex-col items-center mt-32 pb-10"
        >
          <PolaroidPhoto>
            <NuxtImg
              class="w-full max-w-[500px] h-[400px] rounded-md object-cover"
              :alt="message?.message"
              :src="message?.image"
            />
          </PolaroidPhoto>
          <div class="my-10 w-full h-px bg-gray-500" />
          <div class="w-full break-words">
            <h2>{{ message?.message }}</h2>
          </div>
        </div>
      </div>
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
  title: data?.value?.website?.name,
  ogTitle: data?.value?.website?.name,
  description: data?.value?.website?.name,
  ogDescription: data?.value?.website?.name,
});

const { startGlobal } = useThemeStore();

onMounted(() => {
  if (error.value?.statusCode == 400) {
    router.push("website/404");
    return;
  }
  startGlobal(data?.value?.website?.theme as string);
});

const linkUrl = computed(() => {
  return data?.value?.website?.songUrl;
});

const linkUrlNotEmpty = computed(() => {
  return !!linkUrl.value;
});
</script>
