<template>
  <UModal
    :modelValue="isOpen"
    :transition="false"
    :ui="{ 
      width: 'sm:max-w-md',
      container: 'flex min-h-full items-center justify-center p-4'
    }"
  >
    <div
      class="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-auto my-8"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500"
        ></div>
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                stroke-width="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Close Button -->
      <div class="absolute top-4 right-4 z-10">
        <button
          @click="closeModal"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200 group"
          :aria-label="$t('signInModal.close')"
        >
          <UIcon
            name="i-heroicons:x-mark-20-solid"
            class="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
          />
        </button>
      </div>

      <!-- Content -->
      <div class="relative z-10 p-6 sm:p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
          >
            <UIcon
              name="i-heroicons:user-circle-20-solid"
              class="w-8 h-8 text-white"
            />
          </div>
          <h2
            class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {{ $t("signInModal.title") }}
          </h2>
          <p
            class="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            {{ $t("signInModal.subtitle") }}
          </p>
        </div>

        <!-- Sign In Button -->
        <div class="space-y-4 w-full flex items-center justify-center flex-col">
          <GoogleSignInButton
            @success="handleGoogleSuccess"
            @error="handleGoogleError"
          >
            <button
              class="w-full group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <div class="flex items-center justify-center space-x-3">
                <div class="flex-shrink-0">
                  <UIcon name="i-logos:google-icon" class="w-5 h-5" />
                </div>
                <span
                  class="font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200"
                >
                  {{ $t("signInModal.continueWithGoogle") }}
                </span>
              </div>

              <!-- Subtle hover effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/5 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              ></div>
            </button>
          </GoogleSignInButton>

          <!-- Privacy Notice -->
          <div class="text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {{ $t("signInModal.privacyNotice") }}
            </p>
          </div>
        </div>
      </div>
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
    const payload = JSON.parse(atob(credential.split(".")[1]));

    const userData = {
      email: payload.email,
      name: payload.name,
      image: payload.picture,
    };

    // Send to server for processing
    const serverResponse = await $fetch("/api/auth/google", {
      method: "POST",
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
    console.error("Google sign in failed:", error);
  }
}

function handleGoogleError(error: any) {
  console.error("Google sign in error:", error);
}

const closeModal = () => {
  emit("closeModal", false);
};
</script>
