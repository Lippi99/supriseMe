<template>
  <UModal :modelValue="isOpen" :transition="false">
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl">Sign in</h2>
      </div>
      <p class="mt-3 text-[#a3a3a3]">Sign in to your account to continue</p>

      <div
        @click="signInGoogle"
        class="mt-8 flex items-center justify-center gap-5 cursor-pointer w-11/12 border border-gray-500 px-3 py-3 rounded-md"
      >
        <UIcon name="i-logos:google-icon" class="w-5 h-5 ml-3" />
        <span>Continue with Google</span>
      </div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
const { data: googleUserData } = useAuth();
const { signIn } = useAuth();

const emit = defineEmits(["closeModal"]);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

async function signInGoogle() {
  await signIn("google", { callbackUrl: "/create" });
  closeModal();
}

const closeModal = () => {
  emit("closeModal", false);
};
</script>
