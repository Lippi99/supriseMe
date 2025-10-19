<template>
  <!-- Modern Browser Window Mockup for desktop demo video -->
  <div
    class="relative mx-auto bg-gray-800 rounded-t-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
    :class="responsiveClass"
  >
    <!-- Browser Chrome/Header -->
    <div
      class="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-2xl px-4 py-3 border-b border-gray-600"
    >
      <!-- Window Controls (macOS style) -->
      <div class="flex items-center gap-2 mb-3">
        <div class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
        <div class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
      </div>

      <!-- Address Bar -->
      <div class="flex items-center gap-2">
        <!-- Navigation buttons -->
        <div class="flex items-center gap-1">
          <button
            class="w-7 h-7 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors flex items-center justify-center"
            aria-label="Back"
          >
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            class="w-7 h-7 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors flex items-center justify-center"
            aria-label="Forward"
          >
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            class="w-7 h-7 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors flex items-center justify-center ml-1"
            aria-label="Refresh"
          >
            <svg
              class="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        <!-- URL Bar -->
        <div
          class="flex-1 bg-gray-900/50 rounded-lg px-3 py-1.5 flex items-center gap-2 border border-gray-600/50"
        >
          <svg
            class="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span class="text-gray-300 text-xs sm:text-sm font-medium flex-1 truncate">
            surpriseme.com.br/{{ demoPath }}
          </span>
        </div>

        <!-- Menu button -->
        <button
          class="w-7 h-7 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors flex items-center justify-center"
          aria-label="Menu"
        >
          <svg
            class="w-4 h-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Browser Content Area -->
    <div class="relative bg-white dark:bg-gray-900 overflow-hidden" :class="contentHeightClass">
      <slot>
        <!-- Default content if no slot provided -->
        <div
          class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
        >
          <p class="text-gray-500 dark:text-gray-400">No content</p>
        </div>
      </slot>
    </div>

    <!-- Bottom edge shadow for depth -->
    <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/20"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: "small" | "medium" | "large";
  demoPath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  demoPath: "demo",
});

// Responsive classes based on size prop
const responsiveClass = computed(() => {
  const sizeClasses = {
    small: "w-full max-w-3xl",
    medium: "w-full max-w-4xl",
    large: "w-full max-w-6xl",
  };
  return sizeClasses[props.size];
});

// Content height classes
const contentHeightClass = computed(() => {
  const heightClasses = {
    small: "h-[400px] sm:h-[450px]",
    medium: "h-[450px] sm:h-[500px] lg:h-[550px]",
    large: "h-[500px] sm:h-[600px] lg:h-[700px]",
  };
  return heightClasses[props.size];
});
</script>

<style scoped>
/* Add subtle animations */
@keyframes float-browser {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1);
  }
}

.browser-float {
  animation: float-browser 8s ease-in-out infinite;
}

/* Prevent text selection on controls */
button {
  user-select: none;
  -webkit-user-select: none;
}
</style>
