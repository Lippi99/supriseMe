<template>
  <title>{{ data?.website.name }}</title>
  <NuxtLayout>
    <main
      class="absolute left-0 top-0 right-0 bottom-0 flex pt-32 items-center flex-col"
    >
      <h1 class="text-6xl">{{ data?.website.name }}</h1>

      <div class="max-w-md w-full mt-10 flex flex-col items-center">
        <div class="w-full flex flex-col items-center">
          <NuxtImg
            class="rounded-md"
            width="500"
            height="500"
            :alt="data?.website?.messages[0]?.message"
            :src="data?.website?.messages[0]?.image"
          />
          <div class="my-10 w-full h-px bg-gray-500" />
          <div class="w-full break-words">
            <h2>{{ data?.website?.messages[0]?.message }}</h2>
          </div>
        </div>

        <div class="w-full flex flex-col items-center mt-32">
          <NuxtImg
            class="rounded-md"
            width="500"
            height="500"
            :alt="data?.website?.messages[1]?.message"
            :src="data?.website?.messages[1]?.image"
          />
          <div class="my-10 w-full h-px bg-gray-500" />
          <div class="w-full break-words">
            <h2>{{ data?.website?.messages[1]?.message }}</h2>
          </div>
        </div>

        <div class="w-full flex flex-col items-center mt-32">
          <NuxtImg
            class="rounded-md"
            width="500"
            height="500"
            :alt="data?.website?.messages[2]?.message"
            :src="data?.website?.messages[2]?.image"
          />
          <div class="my-10 w-full h-px bg-gray-500" />
          <div class="w-full break-words">
            <h2>{{ data?.website?.messages[2]?.message }}</h2>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { IWebsiteClient } from "~/models/IWebsite";
import { useThemeStore } from "~/store/useTheme";

const route = useRoute();

const id = computed(() => route.params.id);
const { data } = await useFetch<IWebsiteClient>(`/api/website/${id.value}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

const { startGlobal } = useThemeStore();

onMounted(() => {
  startGlobal(data?.value?.website?.theme as string);
});
</script>
