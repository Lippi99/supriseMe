<template>
  <div class="relative w-full -z-10 h-full">
    <canvas
      class="absolute left-0 top-0 w-full h-[-webkit-fill-available !important]"
      id="preview"
    ></canvas>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  images: Array,
});
</script>

<style>
#preview {
  height: -webkit-fill-available !important;
}
</style>
