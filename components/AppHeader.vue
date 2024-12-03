<template>
  <header class="h-28">
    <div class="flex h-full justify-between items-center px-16 gap-4">
      <NuxtLinkLocale to="/">
        <NuxtImg
          alt="logo"
          class="w-16 h-16 rounded-full"
          src="/icons/surpriseme_512_512.png"
        />
      </NuxtLinkLocale>
      <div class="flex gap-5">
        <UButton
          v-if="isLogged"
          @click="isOpen = true"
          size="lg"
          variant="solid"
          class="dark:text-white"
          color="red"
          >{{ $t("header.myWebsites") }}
        </UButton>
        <button @click="setLocale('pt')" type="button" class="cursor-pointer">
          PT
        </button>
        <button type="button" @click="setLocale('en')" class="cursor-pointer">
          EN
        </button>
      </div>
    </div>
  </header>

  <MyWebsites :isOpen="isOpen" @update:isOpen="isOpen = $event" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const { setLocale } = useI18n();

const isOpen = ref(false);
const { status, signOut } = useAuth();

function logout() {
  signOut({ redirect: false });
}

const isLogged = computed(() => status.value === "authenticated");
</script>
