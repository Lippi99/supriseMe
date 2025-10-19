<template>
  <!-- Modern iPhone-like phone frame for demo video -->
  <div
    class="relative mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105"
    :class="responsiveClass"
  >
    <!-- Phone bezel/frame -->
    <div class="relative w-full h-full bg-black rounded-[2rem] sm:rounded-[2.5rem] p-1">
      <!-- Screen -->
      <div
        class="relative w-full h-full bg-black rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden"
      >
        <!-- Dynamic Island / Notch -->
        <div class="absolute top-2 sm:top-3 left-1/2 transform -translate-x-1/2 z-50">
          <div
            class="w-24 sm:w-28 h-6 sm:h-7 bg-black rounded-full flex items-center justify-center shadow-lg"
          >
            <!-- Camera -->
            <div class="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
            <!-- Speaker grille -->
            <div class="w-12 sm:w-14 h-1 bg-gray-900 rounded-full opacity-60"></div>
          </div>
        </div>

        <!-- Content area - Video container -->
        <div class="absolute inset-0 bg-black">
          <slot>
            <!-- Default content if no slot provided -->
            <div
              class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950"
            >
              <p class="text-gray-400 text-sm">No content</p>
            </div>
          </slot>
        </div>

        <!-- Home indicator -->
        <div class="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-50">
          <div class="w-28 sm:w-32 h-1 sm:h-1.5 bg-white rounded-full opacity-40"></div>
        </div>
      </div>
    </div>

    <!-- Side buttons -->
    <!-- Volume buttons (left side) -->
    <div
      class="absolute left-0 top-24 sm:top-28 w-0.5 sm:w-1 h-8 sm:h-10 bg-gray-700 rounded-r-md shadow-inner"
    ></div>
    <div
      class="absolute left-0 top-36 sm:top-40 w-0.5 sm:w-1 h-8 sm:h-10 bg-gray-700 rounded-r-md shadow-inner"
    ></div>

    <!-- Power button (right side) -->
    <div
      class="absolute right-0 top-28 sm:top-32 w-0.5 sm:w-1 h-12 sm:h-14 bg-gray-700 rounded-l-md shadow-inner"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
});

// Responsive classes based on size prop
const responsiveClass = computed(() => {
  const sizeClasses = {
    small: "w-[260px] h-[520px] sm:w-[280px] sm:h-[560px]",
    medium: "w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] lg:w-[340px] lg:h-[680px]",
    large: "w-[300px] h-[600px] sm:w-[340px] sm:h-[680px] lg:w-[380px] lg:h-[760px]",
  };
  return sizeClasses[props.size];
});
</script>

<style scoped>
/* Add subtle animations */
@keyframes float-phone {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1);
  }
}

.phone-float {
  animation: float-phone 6s ease-in-out infinite;
}
</style>
