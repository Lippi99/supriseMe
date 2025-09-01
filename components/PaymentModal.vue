<template>
  <UModal
    :modelValue="isOpen"
    :transition="false"
    :ui="{
      width: 'sm:max-w-md',
      container: 'flex min-h-full items-center justify-center p-4',
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
            {{
              currentView === "register"
                ? $t("auth.register.title")
                : $t("auth.login.title")
            }}
          </h2>
          <p
            class="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            {{
              currentView === "register"
                ? $t("auth.register.subtitle")
                : $t("auth.login.subtitle")
            }}
          </p>
        </div>

        <!-- Login Form -->
        <div v-if="currentView === 'login'" class="space-y-6">
          <!-- Email/Password Form -->
          <form @submit.prevent="handleEmailLogin" class="space-y-4">
            <div>
              <UInput
                v-model="loginForm.email"
                type="email"
                :placeholder="$t('auth.login.emailPlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <div>
              <UInput
                v-model="loginForm.password"
                type="password"
                :placeholder="$t('auth.login.passwordPlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <div class="w-full flex items-center justify-center">
              <UButton
                type="submit"
                class="w-full flex items-center text-white justify-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                :loading="isLoading"
                size="lg"
              >
                {{ $t("auth.login.signInButton") }}
              </UButton>
            </div>
          </form>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-600"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500">{{
                $t("auth.common.or")
              }}</span>
            </div>
          </div>

          <!-- Google Sign In -->
          <!-- <div class="w-full flex items-center justify-center">
            <GoogleSignInButton
              @success="handleGoogleSuccess"
              @error="handleGoogleError"
            >
              <button
                class="w-full group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                :disabled="isLoading"
              >
                <div class="flex items-center justify-center space-x-3">
                  <div class="flex-shrink-0">
                    <UIcon name="i-logos:google-icon" class="w-5 h-5" />
                  </div>
                  <span
                    class="font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200"
                  >
                    {{ $t("auth.common.googleContinue") }}
                  </span>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/5 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                ></div>
              </button>
            </GoogleSignInButton>
          </div> -->

          <!-- Register Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("auth.login.noAccount") }}
              <button
                @click="currentView = 'register'"
                class="text-violet-600 hover:text-violet-500 font-medium"
              >
                {{ $t("auth.login.signUpLink") }}
              </button>
            </p>
          </div>
        </div>

        <!-- Register Form -->
        <div v-else-if="currentView === 'register'" class="space-y-6">
          <form @submit.prevent="handleEmailRegister" class="space-y-4">
            <div>
              <UInput
                v-model="registerForm.name"
                type="text"
                :placeholder="$t('auth.register.namePlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <div>
              <UInput
                v-model="registerForm.email"
                type="email"
                :placeholder="$t('auth.register.emailPlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <div>
              <UInput
                v-model="registerForm.password"
                type="password"
                :placeholder="$t('auth.register.passwordPlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <div>
              <UInput
                v-model="registerForm.confirmPassword"
                type="password"
                :placeholder="$t('auth.register.confirmPasswordPlaceholder')"
                required
                class="w-full"
                :disabled="isLoading"
              />
            </div>
            <UButton
              type="submit"
              class="w-full flex items-center justify-center bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              :loading="isLoading"
              size="lg"
            >
              {{ $t("auth.register.createAccountButton") }}
            </UButton>
          </form>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-600"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500">{{
                $t("auth.common.or")
              }}</span>
            </div>
          </div>

          <!-- Google Sign In -->
          <!-- <div class="flex items-center justify-center">
            <GoogleSignInButton
              @success="handleGoogleSuccess"
              @error="handleGoogleError"
            >
              <button
                class="w-full group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                :disabled="isLoading"
              >
                <div class="flex items-center justify-center space-x-3">
                  <div class="flex-shrink-0">
                    <UIcon name="i-logos:google-icon" class="w-5 h-5" />
                  </div>
                  <span
                    class="font-medium text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200"
                  >
                    {{ $t("auth.common.googleContinue") }}
                  </span>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-purple-500/5 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                ></div>
              </button>
            </GoogleSignInButton>
          </div> -->

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t("auth.register.hasAccount") }}
              <button
                @click="currentView = 'login'"
                class="text-violet-600 hover:text-violet-500 font-medium"
              >
                {{ $t("auth.register.signInLink") }}
              </button>
            </p>
          </div>
        </div>

        <!-- Privacy Notice -->
        <div class="text-center mt-6">
          <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ $t("signInModal.privacyNotice") }}
          </p>
        </div>
      </div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
const { setUser } = useAuthState();
const emit = defineEmits(["closeModal"]);
const toast = useToast();
const { t } = useI18n();

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Form states
const currentView = ref<"login" | "register">("login");
const isLoading = ref(false);

const loginForm = reactive({
  email: "",
  password: "",
});

const registerForm = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleEmailLogin() {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: loginForm.email,
        password: loginForm.password,
      },
    });

    if (response?.success) {
      setUser(response.user);
      closeModal();
      toast.add({
        title: t("auth.login.signInSuccess"),
        color: "green",
      });
    }
  } catch (error: any) {
    toast.add({
      title: error?.data?.statusMessage || t("auth.login.signInFailed"),
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

async function handleEmailRegister() {
  if (isLoading.value) return;

  // Validate password confirmation
  if (registerForm.password !== registerForm.confirmPassword) {
    toast.add({
      title: t("auth.register.passwordMismatch"),
      color: "red",
    });
    return;
  }

  isLoading.value = true;
  try {
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
      },
    });

    if (response?.success) {
      setUser(response.user);
      closeModal();
      toast.add({
        title: t("auth.register.accountCreated"),
        color: "green",
      });
    }
  } catch (error: any) {
    toast.add({
      title:
        error?.data?.statusMessage || t("auth.register.registrationFailed"),
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

async function handleGoogleSuccess(response: any) {
  if (isLoading.value) return;

  isLoading.value = true;
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
      toast.add({
        title: t("auth.common.googleSuccess"),
        color: "green",
      });
    }
  } catch (error) {
    console.error("Google sign in failed:", error);
    toast.add({
      title: t("auth.common.googleError"),
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
}

function handleGoogleError(error: any) {
  console.error("Google sign in error:", error);
  toast.add({
    title: t("auth.common.googleError"),
    color: "red",
  });
}

const closeModal = () => {
  // Reset forms
  currentView.value = "login";
  loginForm.email = "";
  loginForm.password = "";
  registerForm.name = "";
  registerForm.email = "";
  registerForm.password = "";
  registerForm.confirmPassword = "";
  isLoading.value = false;

  emit("closeModal", false);
};
</script>
