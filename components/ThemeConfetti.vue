<template>
  <div class="relative w-full h-full">
    <canvas
      class="absolute left-0 top-0 w-full h-full pointer-events-none"
      id="preview"
    ></canvas>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  images: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
#theme-preview {
  z-index: -1;
}
</style>