<script setup lang="ts">
const { t } = useI18n();
const items = [
  {
    label: t("indexPage.sectionFour.title"),
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    content: t("indexPage.sectionFour.questionOne.description"), // Adjusted for translation
  },
  {
    label: t("indexPage.sectionFour.questionTwo.title"),
    icon: "i-heroicons-arrow-down-tray",
    content: t("indexPage.sectionFour.questionTwo.description"), // Adjusted for translation
  },
  {
    label: t("indexPage.sectionFour.questionThree.title"),
    icon: "i-heroicons-eye-dropper",
    content: t("indexPage.sectionFour.questionThree.description"), // Adjusted for translation
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
