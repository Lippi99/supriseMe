<template>
  <div
    class="z-10 relative flex justify-center h-[520px] w-[250px] border-4 border-[#FF4E6D] rounded-2xl"
  >
    <div class="absolute w-full h-full overflow-y-auto overflow-x-hidden">
      <ThemeConfetti :images="form.images">
        <div
          class="text-black w-full max-w-56 ml-2 rounded-2xl px-6 py-1 mt-10 bg-white z-10"
        >
          supriseMe.com/
        </div>

        <h1 class="text-center my-5">{{ form.name }}</h1>

        <div class="w-full mt-5 px-3 flex-col gap-6 flex items-center">
          <NuxtPicture
            v-if="form.images[0]"
            class="w-11/12 h-[200px] object-cover flex items-center justify-center"
            :img-attrs="{
              alt: 'Image preview',
              style: 'w-full; height: 100%; object-fit: cover;',
            }"
            :src="form.images[0]"
          />

          <div class="w-1/2 h-0.5 dark:bg-gray-500 flex items-center" />

          <p class="break-words">{{ form.messages[0]?.message }}</p>
        </div>

        <div class="w-full mt-20 px-3 flex flex-col gap-6 items-center">
          <NuxtPicture
            v-if="form.images[1]"
            class="w-11/12 h-[200px] object-cover flex items-center justify-center"
            :img-attrs="{
              alt: 'Image preview',
              style: 'w-full; height: 100%; object-fit: cover;',
            }"
            :src="form.images[1]"
          />

          <div class="w-1/2 h-0.5 dark:bg-gray-500 dark:text-red-500" />

          <p class="break-words">{{ form.messages[1]?.message }}</p>
        </div>

        <div class="w-full mt-20 px-3 flex flex-col gap-6 items-center">
          <NuxtPicture
            v-if="form.images[2]"
            class="w-11/12 h-[200px] object-cover flex items-center justify-center"
            :img-attrs="{
              alt: 'Image preview',
              style: 'w-full; height: 100%; object-fit: cover;',
            }"
            :src="form.images[2]"
          />

          <div class="w-1/2 h-0.5 dark:bg-gray-500 flex items-center" />

          <p class="break-words">{{ form.messages[2]?.message }}</p>
        </div>
      </ThemeConfetti>
    </div>

    <span
      class="border border-black bg-white w-28 h-5 rounded-br-xl rounded-bl-xl"
    ></span>

    <span
      class="absolute -right-2 top-20 border-4 border-white h-10 rounded-md"
    ></span>
    <span
      class="absolute -right-2 top-44 border-4 border-white h-24 rounded-md"
    ></span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  form: {
    type: Object,
    required: true,
  },
});
</script>
