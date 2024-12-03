<template>
  <header class="h-28">
    <div class="flex h-full justify-end items-center px-16 gap-4">
      <button type="button" @click="logout">Sair</button>
      <UButton
        v-if="isLogged"
        @click="isOpen = true"
        size="lg"
        variant="solid"
        class="dark:text-white"
        color="red"
        >My websites
      </UButton>
      <span class="cursor-pointer">PT</span>
      <span class="cursor-pointer">EN</span>
    </div>
  </header>

  <MyWebsites :isOpen="isOpen" @update:isOpen="isOpen = $event" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
const { status, signOut } = useAuth();

function logout() {
  signOut({ redirect: false });
}

const isLogged = computed(() => status.value === "authenticated");
</script>
