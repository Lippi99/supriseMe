<script setup lang="ts">
const items = [
  {
    label: "What is letter surpriseme?",
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    content:
      "SurpriseMe is a platform destinated to create a surprise letter for someone special. You can choose a template, write a message and send it to the person you want to surprise.",
  },
  {
    label: "How do I receive my page after payment?",
    icon: "i-heroicons-arrow-down-tray",
    content:
      "After payment, you will receive an email with a link to access your page. You can share this link with the person you want to surprise.",
  },
  {
    label: "Can I edit after it's creation?",
    icon: "i-heroicons-eye-dropper",
    content:
      "Yes, you can edit your page after creation. You can change the message, the photos and the song if you got the premium plan.",
  },
];
</script>

<template>
  <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
    <template #default="{ item, index, open }">
      <UButton
        color="gray"
        variant="ghost"
        class="border-b border-gray-200 dark:border-gray-700"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
      >
        <span class="truncate text-2xl"> {{ item.label }}</span>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
  </UAccordion>
</template>
