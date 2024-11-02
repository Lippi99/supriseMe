<template>
  <div
    :class="[
      'dark:bg-zinc-800 w-full border-2 rounded-xl p-5',
      { 'border-[#FF4E6D]': mostPicked, 'border-[#ccc]': !mostPicked },
    ]"
  >
    <div class="flex justify-between">
      <h3 class="text-2xl mb-5">{{ title }}</h3>
      <span
        class="bg-[#FF4E6D] rounded-full py-1 px-3 flex items-center font-bold"
        v-if="mostPicked"
        >Most popular</span
      >
    </div>
    <span class="text-5xl font-extrabold mb-10 inline-block"
      >$ {{ price }}</span
    >
    <ul class="mb-10 flex flex-col gap-3">
      <li
        class="flex items-center gap-3"
        v-for="(benefit, index) in benefits"
        :key="index"
      >
        <UIcon name="i-heroicons:check-circle-16-solid" class="w-5 h-5" />
        <span class="text-2xl">{{ benefit }}</span>
      </li>
    </ul>

    <UButton
      class="py-5 dark:text-white font-bold text-2xl dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D]"
      block
      label="Buy plan"
    />
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";
defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  benefits: {
    type: Array as () => String[],
    required: true,
  },
  mostPicked: {
    type: Boolean,
    default: false,
  },
});
</script>
