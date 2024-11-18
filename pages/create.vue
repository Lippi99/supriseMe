<template>
  <NuxtLayout name="custom">
    <div class="py-[17px] px-14 lg:pr-0 lg:max-w-7xl m-auto">
      <h1 class="text-5xl font-bold">Create your page</h1>
      <span class="ml-1 mt-5 inline-block">Fill the fields in blank</span>
      <div
        class="flex-col-reverse max-w-screen-xl w-full mt-10 flex items-center gap-32 lg:flex-row lg:items-start"
      >
        <UForm
          :schema="schemas"
          :state="formState"
          class="flex-1"
          @submit="onSubmit"
        >
          <UFormGroup name="theme">
            <label class="mb-2 inline-block" for="theme"
              >Choose the theme</label
            >
            <USelectMenu
              @change="selectedTheme"
              class="border border-[#FF4E6D]"
              v-model="formState.theme"
              value-attribute="name"
              :options="themes"
              option-attribute="name"
            >
              <template #leading>
                <UIcon
                  v-if="selected.icon"
                  :name="(selected.icon as string)"
                  class="w-5 h-5"
                />
              </template>
            </USelectMenu>
          </UFormGroup>
          <UFormGroup class="mt-8" name="name">
            <label class="mb-2 inline-block" for="name"
              >Person or people's name</label
            >
            <UInput
              v-model="formState.name"
              placeholder="Sarah, Peter, John..."
              class="border border-[#FF4E6D]"
            />
          </UFormGroup>

          <div
            v-for="(field, index) in formState.messages"
            :key="index"
            class="mt-4 flex flex-col-reverse"
          >
            <UFormGroup :name="'message-' + index">
              <label class="mb-2 mt-5 inline-block" :for="'message-' + index">
                Write your message {{ index + 1 }}
                <span class="ml-5"
                  >{{ formState.messages[index].message.length }} /200
                </span>
              </label>
              <UTextarea
                @input="(event: Event) => limitTextAreaLength(event, index)"
                v-model="field.message"
                :rows="10"
                class="border border-[#FF4E6D]"
                variant="outline"
                :placeholder="'Message ' + (index + 1)"
              />
            </UFormGroup>

            <!-- Image Upload Input for Each Message -->
            <UFormGroup :name="'image-' + index" class="mt-4">
              <label class="mb-2 inline-block" :for="'dropzone-file-' + index">
                Pick or update a picture for Message {{ index + 1 }}
              </label>
              <label
                v-if="!field.image"
                :for="'dropzone-file-' + index"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-900 dark:hover:bg-gray-800"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, Webp
                  </p>
                </div>
                <input
                  @change="(event) => uploadImageForMessage(event, index)"
                  :id="'dropzone-file-' + index"
                  accept="image/*"
                  type="file"
                  class="hidden"
                />
              </label>
            </UFormGroup>

            <!-- Image Preview Section -->
            <div v-if="field.image" class="mt-4">
              <h3 class="text-lg font-bold">
                Image Preview for Message {{ index + 1 }}:
              </h3>
              <NuxtPicture
                :src="field.image"
                class="w-full h-96 object-cover inline-block"
                :img-attrs="{
                  alt: 'Image preview',
                  style: 'width: 100%; height: 100%; object-fit: cover;',
                }"
              />
              <UButton
                color="red"
                @click="removeImage(index)"
                class="mt-2 dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D] py-2 dark:text-white text-lg"
                block
              >
                Remove Image
              </UButton>
            </div>
          </div>

          <UButton
            class="mt-10 dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D] py-2 dark:text-white text-lg"
            block
            type="submit"
          >
            Submit
          </UButton>
        </UForm>

        <Preview :form="formState" />
      </div>
    </div>
    <button @click="isOpen = true" type="button">test</button>
    <PaymentModal :isOpen="isOpen" @update:modelValue="closeModal" />
  </NuxtLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Create your page",
  description:
    "Create your page for someone special, choose a theme, write a message and send it to the person you want to surprise.",
});

import { z } from "zod";
import { useThemeStore } from "~/store/useTheme";
import type { FormSubmitEvent } from "#ui/types";
import { reactive, ref } from "vue";

const theme = useThemeStore();

const schemas = z.object({
  theme: z.any(),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Must be a text",
    })
    .trim(),
  messages: z
    .array(
      z.object({
        message: z
          .string({
            required_error: "Message is required",
            invalid_type_error: "Must be a text",
          })
          .min(1)
          .max(200)
          .trim(),
      })
    )
    .min(1),
  images: z.array(z.string()).max(3),
});

export type Schema = z.output<typeof schemas>;

const formState = reactive({
  theme: undefined,
  name: undefined,
  messages: [
    { message: "", image: null },
    { message: "", image: null },
    { message: "", image: null },
  ] as Array<{ message: string; image: string | null }>,
  images: [] as string[],
});

function closeModal(modal: boolean) {
  isOpen.value = modal;
}

const themes = [
  {
    name: "Christmas",
    icon: "i-icon-park-solid-christmas-tree-one",
  },
  {
    name: "Birthday",
    icon: "i-heroicons-cake-20-solid",
  },
  {
    name: "Wedding",
    icon: "i-fluent-emoji-high-contrast-wedding",
  },
];
const selected = ref(themes[0]);
const isOpen = ref(false);

function selectedTheme(value: string) {
  if (value === "") return;

  if (value === "Christmas") {
    theme.snowTheme();
  } else if (value == "Wedding") {
    theme.loveTheme();
  } else {
    theme.start();
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}

async function uploadImageForMessage(event: Event, index: number) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const base64 = await getBase64(input.files[0]);
    formState.messages[index].image = base64;
    console.log(formState);
  }
}

function removeImage(index: number) {
  const imageToRemove = formState.messages[index].image;
  if (imageToRemove) {
    const imageIndex = formState.images.indexOf(imageToRemove);
    if (imageIndex > -1) {
      formState.images.splice(imageIndex, 1);
    }
    formState.messages[index].image = null;
  }
}

function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

function limitTextAreaLength(event: Event, index: number) {
  const input = event.target as HTMLTextAreaElement;
  if (input.value.length > 200) {
    input.value = input.value.slice(0, 200);
    formState.messages[index].message = input.value;
  }
}
</script>
