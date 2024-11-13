<template>
  <NuxtLayout name="custom">
    <div class="py-[17px] px-14 lg:pr-0 lg:max-w-7xl m-auto">
      <h1 class="text-5xl font-bold">Create your page</h1>
      <span class="ml-1 mt-5 inline-block">Fill the fields in blank</span>
      <div
        class="flex-col-reverse max-w-screen-xl w-full mt-10 flex items-center gap-32 lg:flex-row"
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
              id="name"
            />
          </UFormGroup>

          <!-- Dynamic Message Fields -->
          <div v-for="(field, index) in formState.messages" :key="index">
            <UFormGroup class="mt-8" :name="'message-' + index">
              <label class="mb-2 inline-block" :for="'message-' + index">
                Write your message {{ index + 1 }}
                <span>({{ formState.messages[index].message.length }})</span>
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
            <UButton
              v-if="formState.messages.length > 1"
              @click="removeMessage(index)"
              class="py-4 px-8 mt-2 dark:bg-red-500 dark:hover:bg-red-500 dark:text-white"
              type="button"
            >
              Remove
            </UButton>
          </div>

          <UButton
            @click="addMessage"
            class="py-5 px-10 mt-32 dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D] dark:text-white"
            type="button"
          >
            Add more messages (max 3)
          </UButton>

          <UFormGroup class="mt-8" name="images">
            <label class="mb-2 inline-block" for="dropzone-file"
              >Pick some pictures (max 3)</label
            >
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-900 dark:hover:bg-gray-800"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, Webp
                </p>
              </div>
              <input
                @change="uploadImage($event)"
                id="dropzone-file"
                accept="image/*"
                type="file"
                class="hidden"
              />
            </label>
          </UFormGroup>

          <!-- Image preview section -->
          <div class="mt-4">
            <h3 class="text-lg font-bold">Image Previews:</h3>
            <div class="w-full space-x-4 mt-2">
              <div class="flex gap-10 h-28">
                <div v-for="(image, index) in formState.images" :key="index">
                  <NuxtPicture
                    :src="image"
                    class="w-full h-full object-cover cursor-pointer"
                    :img-attrs="{
                      alt: 'Image preview',
                      style: 'width: 100%; height: 100%; object-fit: cover;',
                    }"
                    @click="openImageDialog(image)"
                  />
                  <UButton
                    color="red"
                    @click="formState.images.splice(index, 1)"
                    class="mt-2 dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D] py-2 dark:text-white text-lg"
                    block
                  >
                    Remove
                  </UButton>
                </div>
              </div>
            </div>
          </div>

          <UButton
            class="mt-28 dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D] py-2 dark:text-white text-lg"
            block
            type="submit"
          >
            Submit
          </UButton>
        </UForm>

        <div
          class="flex-1 flex items-center justify-center flex-col mb-0 lg:mb-[321px]"
        >
          <h2 class="text-center mb-5 text-2xl">Website's preview</h2>
          <Phone :form="formState" />
        </div>
      </div>

      <!-- Modal for image preview -->
      <div
        v-if="showDialog"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
      >
        <div
          class="p-4 max-w-3xl w-full h-[512px] rounded-lg shadow-lg flex items-center flex-col justify-center"
        >
          <NuxtPicture
            v-if="selectedImage"
            :src="selectedImage"
            :img-attrs="{
              alt: 'Image preview',
              style: 'width: 100%; height: 100%; object-fit: cover;',
            }"
            class="w-full h-full object-cover"
          />
          <button
            @click="closeImageDialog"
            class="mt-10 max-w-md w-full px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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
  messages: [{ message: "" }] as Array<{ message: string }>,
  images: [] as string[],
});

// Functions to manage dynamic fields
function addMessage() {
  if (formState.messages.length > 2) {
    alert("Maximum of 3 messages allowed.");
    return;
  }
  selectedTheme(formState.theme || "");
  formState.messages.push({ message: "" });
}

function removeMessage(index: number) {
  if (formState.messages.length > 1) {
    formState.messages.splice(index, 1);
  } else {
    alert("At least one message field is required.");
  }
}

const showDialog = ref(false);
const selectedImage = ref<string | null>(null);

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

async function uploadImage(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (const file of Array.from(input.files)) {
      const base64 = await getBase64(file);
      if (formState.images.length < 3) {
        selectedTheme(formState.theme || "");
        formState.images.push(base64);
      } else {
        alert("Maximum of 3 images allowed.");
        break;
      }
    }
  }
}

// Helper function to convert file to base64
function getBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

// Open the image dialog
function openImageDialog(image: string) {
  selectedImage.value = image;
  showDialog.value = true;
}

// Close the image dialog
function closeImageDialog() {
  selectedImage.value = null;
  showDialog.value = false;
}

function limitTextAreaLength(event: Event, index: number) {
  const input = event.target as HTMLTextAreaElement;
  if (input.value.length > 200) {
    input.value = input.value.slice(0, 200);
    formState.messages[index].message = input.value;
  }
}
</script>
