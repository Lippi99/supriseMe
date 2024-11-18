<template>
  <div
    class="flex-1 flex items-center justify-center flex-col mb-0 lg:sticky top-10"
  >
    <h2 class="text-center mb-5 text-2xl">Website's preview</h2>
    <Phone :form="form" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  form: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>
