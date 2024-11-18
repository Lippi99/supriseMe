<template>
  <UModal
    :modelValue="isOpen"
    @update:modelValue="($event: boolean) => (open = $event)"
    :transition="false"
  >
    <div class="p-4">
      <div @click="emit('isOpen')">Close</div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
const emit = defineEmits();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const open = ref<boolean>(props.isOpen);

const closeModal = () => {
  open.value = false;
  emit("update:isOpen", false); // Emit the updated value to parent
};
</script>
