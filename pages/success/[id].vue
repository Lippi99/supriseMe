<template>
  <NuxtLayout>
    <UModal
      class="-z-10"
      prevent-close
      :ui="{ width: 'w-full sm:max-w-3xl', height: 'h-[630px]' }"
      v-model="isOpen"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <UIcon
            class="text-center w-full text-green-600"
            size="60"
            name="i-heroicons:check-circle-solid"
          />
          <h1 class="text-center text-3xl text-green-400 font-bold">
            Seu site foi criado com sucesso!
          </h1>
          <span class="w-full mt-5 text-center inline-block text-xl"
            >Acesse seu site pelo QRCode</span
          >
        </template>

        <div class="flex flex-col items-center justify-center">
          <QrcodeVue :value="link" :size="300" level="H" render-as="svg" />
          <span class="text-xl mt-5">OU</span>
        </div>

        <template #footer>
          <span class="text-xl text-center w-full inline-block"
            >Acesse
            <a
              :href="link"
              class="text-green-300 font-bold cursor-pointer underline"
              target="_blank"
              >seu site aqui!</a
            ></span
          >
        </template>
      </UCard>
    </UModal>
  </NuxtLayout>
</template>
<script setup lang="ts">
import QrcodeVue from "qrcode.vue";
import { useThemeStore } from "~/store/useTheme";

const { startGlobal } = useThemeStore();

onMounted(() => {
  startGlobal("Confetti");
});

const isOpen = ref(true);

const route = useRoute();
const id = route.params.id as string;

const link = `http://localhost:3000/website/${id}`;
</script>
