<template>
  <header class="h-28">
    <div class="flex h-full justify-end items-center px-16 gap-4">
      <UButton
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
</script>
