<template>
  <div class="snow-container" aria-hidden="true" ref="snowContainer"></div>
</template>

<script>
export default {
  mounted() {
    const snowContainer = this.$refs.snowContainer;
    const snowflakesCount = 200;

    for (let i = 0; i < snowflakesCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      snowflake.style.left = `${Math.random() * 100}%`;

      const size = `${Math.random() * 5 + 5}px`;
      snowflake.style.width = size;
      snowflake.style.height = size;

      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;

      // Randomize the horizontal movement
      snowflake.style.setProperty("--random-x", Math.random());

      const opacity = Math.random() * 0.5 + 0.5;
      snowflake.style.opacity = opacity;
      snowflake.style.boxShadow = `0 0 20px 5px rgba(255, 255, 255, ${
        opacity * 0.7
      })`; // Corresponding glow opacity

      // Append snowflake to container
      snowContainer.appendChild(snowflake);
    }
  },
};
</script>

<style scoped>
.snow-container {
  @apply absolute top-0 left-0 w-full h-full pointer-events-none z-50; /* TailwindCSS equivalent */
}

@keyframes fall {
  0% {
    transform: translateX(0) translateY(-10vh);
    opacity: 1;
  }
  50% {
    transform: translateX(calc(-10vw + 20vw * var(--random-x))) translateY(50vh);
    opacity: 0.8;
  }
  100% {
    transform: translateX(calc(-20vw + 40vw * var(--random-x)))
      translateY(110vh);
    opacity: 0;
  }
}

.snowflake {
  @apply absolute bg-white rounded-full; /* TailwindCSS equivalent */
  top: -30px;
  animation: fall linear infinite;
}
</style>
