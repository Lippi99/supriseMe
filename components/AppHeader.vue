<template>
  <!-- Enhanced header with glassmorphism and responsive design -->
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
  >
    <div class="max-w-7xl mx-auto">
      <div
        class="flex h-20 sm:h-24 justify-between items-center px-4 sm:px-6 lg:px-8 gap-4"
      >
        <!-- Logo with enhanced styling -->
        <NuxtLinkLocale to="/" class="group flex-shrink-0">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <NuxtImg
              alt="SurpriseMe Logo"
              class="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300"
              src="/logo.webp"
            />
          </div>
        </NuxtLinkLocale>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-4 lg:gap-6">
          <div class="flex items-center gap-3 lg:gap-4">
            <!-- User buttons for authenticated users -->
            <template v-if="isLogged">
              <UButton
                @click="isOpen = true"
                size="md"
                variant="solid"
                color="violet"
                class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <UIcon
                  name="i-heroicons-globe-alt-20-solid"
                  class="w-4 h-4 mr-2"
                />
                {{ $t("header.myWebsites") }}
              </UButton>
              <UButton
                @click="logout"
                size="md"
                variant="outline"
                color="gray"
                class="border-2 border-gray-300 dark:border-gray-600 dark:hover:bg-transparent font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
              >
                <UIcon
                  name="i-heroicons-arrow-right-on-rectangle-20-solid"
                  class="w-4 h-4 mr-2"
                />
                Logout
              </UButton>
            </template>

            <!-- Language switcher -->
            <div
              class="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner"
            >
              <button
                aria-label="Switch to Portuguese"
                @click="setLocale('pt')"
                type="button"
                :class="[
                  'p-2 rounded-lg transition-all duration-300 hover:scale-110',
                  currentLocale === 'pt'
                    ? 'bg-white dark:bg-gray-700 shadow-md ring-2 ring-violet-500/20'
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50',
                ]"
              >
                <UIcon
                  class="w-6 h-6 sm:w-7 sm:h-7 rounded-sm shadow-sm"
                  name="i-flag:br-4x3"
                />
              </button>
              <button
                aria-label="Switch to English"
                type="button"
                @click="setLocale('en')"
                :class="[
                  'p-2 rounded-lg transition-all duration-300 hover:scale-110',
                  currentLocale === 'en'
                    ? 'bg-white dark:bg-gray-700 shadow-md ring-2 ring-violet-500/20'
                    : 'hover:bg-white/50 dark:hover:bg-gray-700/50',
                ]"
              >
                <UIcon
                  class="w-6 h-6 sm:w-7 sm:h-7 rounded-sm shadow-sm"
                  name="i-flag:us-4x3"
                />
              </button>
            </div>
          </div>
        </nav>

        <!-- Mobile menu button -->
        <div class="flex md:hidden items-center gap-3">
          <!-- Mobile language switcher -->
          <div
            class="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner"
          >
            <button
              aria-label="Switch to Portuguese"
              @click="setLocale('pt')"
              type="button"
              :class="[
                'p-1.5 rounded transition-all duration-300',
                currentLocale === 'pt'
                  ? 'bg-white dark:bg-gray-700 shadow-sm ring-1 ring-violet-500/20'
                  : 'hover:bg-white/50 dark:hover:bg-gray-700/50',
              ]"
            >
              <UIcon class="w-5 h-5 rounded-sm" name="i-flag:br-4x3" />
            </button>
            <button
              aria-label="Switch to English"
              type="button"
              @click="setLocale('en')"
              :class="[
                'p-1.5 rounded transition-all duration-300',
                currentLocale === 'en'
                  ? 'bg-white dark:bg-gray-700 shadow-sm ring-1 ring-violet-500/20'
                  : 'hover:bg-white/50 dark:hover:bg-gray-700/50',
              ]"
            >
              <UIcon class="w-5 h-5 rounded-sm" name="i-flag:us-4x3" />
            </button>
          </div>

          <!-- Mobile menu toggle -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            type="button"
            class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <UIcon
              :name="
                mobileMenuOpen
                  ? 'i-heroicons-x-mark-20-solid'
                  : 'i-heroicons-bars-3-20-solid'
              "
              class="w-6 h-6 text-gray-700 dark:text-gray-300"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95"
        >
          <div class="px-4 py-4 space-y-3">
            <template v-if="isLogged">
              <UButton
                @click="
                  () => {
                    isOpen = true;
                    mobileMenuOpen = false;
                  }
                "
                size="lg"
                variant="solid"
                color="violet"
                block
                class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <UIcon
                  name="i-heroicons-globe-alt-20-solid"
                  class="w-5 h-5 mr-2"
                />
                {{ $t("header.myWebsites") }}
              </UButton>
              <UButton
                @click="
                  () => {
                    logout();
                    mobileMenuOpen = false;
                  }
                "
                size="lg"
                variant="outline"
                color="gray"
                block
                class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                <UIcon
                  name="i-heroicons-arrow-right-on-rectangle-20-solid"
                  class="w-5 h-5 mr-2"
                />
                Logout
              </UButton>
            </template>
            <template v-else>
              <div class="text-center py-4">
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Welcome to SurpriseMe
                </p>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </header>

  <MyWebsites :isOpen="isOpen" @update:isOpen="isOpen = $event" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { setLocale, locale } = useI18n();
const isOpen = ref(false);
const mobileMenuOpen = ref(false);
const { status, clearUser } = useAuthState();

const isLogged = computed(() => status.value === "authenticated");
const currentLocale = computed(() => locale.value);

const logout = () => {
  clearUser();
  mobileMenuOpen.value = false;
  navigateTo("/");
};

// Close mobile menu when clicking outside or on route change
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest("header") && mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

// Close mobile menu on route change
const router = useRouter();
router.afterEach(() => {
  mobileMenuOpen.value = false;
});
</script>
