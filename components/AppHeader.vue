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
      <div class="flex gap-5 items-center">
        <UButton
          v-if="isLogged"
          @click="isOpen = true"
          size="lg"
          variant="solid"
          class="dark:text-white"
          color="red"
          >{{ $t("header.myWebsites") }}
        </UButton>
        <UButton
          v-if="isLogged"
          @click="logout"
          size="lg"
          variant="outline"
          class="dark:text-white"
          color="gray"
          >Logout
        </UButton>
        <button
          aria-label="lang"
          @click="setLocale('pt')"
          type="button"
          class="cursor-pointer"
        >
          <UIcon aria-label="br" class="w-10 h-10" name="i-flag:br-4x3" />
        </button>
        <button
          aria-label="lang"
          type="button"
          @click="setLocale('en')"
          class="cursor-pointer"
        >
          <UIcon aria-label="us" class="w-10 h-10" name="i-flag:us-4x3" />
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
const { status, clearUser } = useAuthState();

const isLogged = computed(() => status.value === "authenticated");

const logout = () => {
  clearUser();
  // Optionally redirect to home page
  navigateTo('/');
};
</script>
