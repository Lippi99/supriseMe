<template>
  <UModal :modelValue="isOpen" :transition="false">
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl">Sign in</h2>
      </div>
      <p class="mt-3 text-[#a3a3a3]">Sign in to your account to continue</p>

      <GoogleSignInButton @success="handleGoogleSuccess" @error="handleGoogleError">
        <div class="mt-8 flex items-center justify-center gap-5 cursor-pointer w-11/12 border border-gray-500 px-3 py-3 rounded-md">
          <UIcon name="i-logos:google-icon" class="w-5 h-5 ml-3" />
          <span>Continue with Google</span>
        </div>
      </GoogleSignInButton>
    </div>
  </UModal>
</template>
<script setup lang="ts">
const { setUser } = useAuthState();
const emit = defineEmits(["closeModal"]);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

async function handleGoogleSuccess(response: any) {
  try {
    const credential = response.credential;
    // Decode the JWT to get user info
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    const userData = {
      email: payload.email,
      name: payload.name,
      image: payload.picture,
    };

    // Send to server for processing
    const serverResponse = await $fetch('/api/auth/google', {
      method: 'POST',
      body: {
        user: userData,
        credential: credential,
      },
    });

    if (serverResponse?.success) {
      setUser(userData);
      closeModal();
    }
  } catch (error) {
    console.error('Google sign in failed:', error);
  }
}

function handleGoogleError(error: any) {
  console.error('Google sign in error:', error);
}

const closeModal = () => {
  emit("closeModal", false);
};
</script>
