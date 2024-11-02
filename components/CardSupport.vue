<template>
  <div class="h-56 w-full border-4 border-[#FF4E6D]">
    <div class="p-7 h-full w-full dark:bg-zinc-800">
      <h1 class="text-2xl font-black text-white">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
