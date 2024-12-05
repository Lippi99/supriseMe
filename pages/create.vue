<template>
  <NuxtLayout name="custom">
    <div class="py-[17px] px-14 lg:pr-0 lg:max-w-7xl m-auto">
      <h1 class="text-5xl font-bold">{{ $t("createPage.title") }}</h1>
      <span class="ml-1 mt-5 inline-block">{{
        $t("createPage.instructions")
      }}</span>
      <YoutubeMusic :isDetail="false" :url="formState.songUrl" />
      <div
        class="flex-col-reverse max-w-screen-xl w-full mt-10 flex items-center gap-32 lg:flex-row lg:items-start"
      >
        <UForm
          ref="form"
          :schema="schemas"
          :state="formState"
          class="flex-1"
          @submit="onSubmit"
        >
          <UFormGroup class="mb-8" name="plan">
            <label class="mb-2 inline-block" for="plan">{{
              $t("createPage.choosePlan")
            }}</label>
            <USelectMenu
              @change="handleSetPlanUrl"
              class="border border-[#FF4E6D]"
              v-model="formState.plan"
              value-attribute="name"
              :options="plans"
              option-attribute="name"
            >
            </USelectMenu>
          </UFormGroup>

          <UFormGroup
            v-if="formState.plan === 'Premium'"
            class="mb-8"
            name="songUrl"
          >
            <label class="mb-2 inline-block" for="songUrl">{{
              $t("createPage.pickSong")
            }}</label>
            <UInput
              v-model="formState.songUrl"
              placeholder="https://www.youtube.com/watch?v=4ZWKR2zJESk"
              class="border border-[#FF4E6D]"
            />
          </UFormGroup>

          <UFormGroup name="theme">
            <label class="mb-2 inline-block" for="theme">{{
              $t("createPage.chooseTheme")
            }}</label>
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
            <label class="mb-2 inline-block" for="name">{{
              $t("createPage.personName")
            }}</label>
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
                {{ $t("createPage.writeMessage") }} {{ index + 1 }}
                <span class="ml-5"
                  >{{ formState.messages[index].message.length }} /600
                </span>
              </label>
              <UTextarea
                @input="(event: Event) => limitTextAreaLength(event, index)"
                v-model="field.message"
                :rows="10"
                class="border border-[#FF4E6D]"
                variant="outline"
                :placeholder="
                  $t('createPage.messagePlaceholder') + ' ' + (index + 1)
                "
              />
            </UFormGroup>

            <!-- Image Upload Input for Each Message -->
            <UFormGroup :name="'image-' + index" class="mt-4">
              <label class="mb-2 inline-block" :for="'dropzone-file-' + index">
                {{ $t("createPage.pickOrUpdateImage") }} {{ index + 1 }}
              </label>
              <label
                v-if="!field.image"
                :for="'dropzone-file-' + index"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer dark:bg-gray-900 hover:bg-gray-100 dark:border-[#FF4E6D] dark:hover:border-[#FF4E6D] dark:hover:bg-gray-800"
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
                    <span class="font-semibold">{{
                      $t("createPage.clickToUpload")
                    }}</span>
                    {{ $t("createPage.orDragAndDrop") }}
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
                {{ $t("createPage.imagePreview") }} {{ index + 1 }}:
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
                {{ $t("createPage.removeImage") }}
              </UButton>
            </div>
          </div>

          <UButton
            color="red"
            :loading="isSubmitting"
            :class="
              cn(
                'mt-10 py-2 text-lg dark:bg-[#FF4E6D] dark:hover:bg-[#ff4e6eca] dark:text-white'
              )
            "
            block
            type="submit"
          >
            {{
              isSubmitting
                ? $t($t("createPage.creating"))
                : $t("createPage.createButton")
            }}
          </UButton>
        </UForm>

        <Preview :form="formState" />
      </div>
    </div>
    <PaymentModal :isOpen="isOpen" @closeModal="closeModal" />
    <UNotifications />
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
import type { Form, FormSubmitEvent } from "#ui/types";
import { reactive, ref } from "vue";
import { getUserLocationFromIP } from "~/utils/geolocation";

const theme = useThemeStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

useSeoMeta({
  title: t("seo.create.title"),
  ogTitle: t("seo.create.ogTitle"),
  description: t("seo.create.description"),
  ogDescription: t("seo.create.ogDescription"),
});

const { status, data: googleUserData } = useAuth();

const schemas = z.object({
  plan: z.enum(["Basic", "Premium"], { message: "Plan is empty or invalid" }),
  theme: z.string({ required_error: "Theme is required" }).min(1),
  songUrl: z.string().optional(),
  name: z
    .string({
      required_error: "Name is required",
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
          .max(600)
          .trim(),
        image: z
          .string()
          .optional()
          .nullable()
          .refine((value) => {
            return value === null || value?.startsWith("data:image");
          }),
      })
    )
    .min(1),
  images: z.array(z.string()).max(3),
});

export type Schema = z.output<typeof schemas>;
const formState = reactive({
  plan: (route.query.plan as string) || "Basic",
  theme: undefined,
  name: undefined,
  songUrl: "",
  messages: [] as Array<{ message: string; image: string | null }>,
  images: [] as string[],
});

const form = ref<Form<Schema>>();

function handleSetPlanUrl(url: string) {
  router.push({ query: { plan: url } });

  // Reset formState.messages to avoid accumulating extra fields
  formState.messages = [];

  if (url === "Basic") {
    for (let i = 0; i < 3; i++) {
      formState.messages.push({ message: "", image: null });
    }
  } else if (url === "Premium") {
    for (let i = 0; i < 5; i++) {
      formState.messages.push({ message: "", image: null });
    }
  }
}

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

const plans = [
  {
    name: "Basic",
  },
  {
    name: "Premium",
  },
];

const selected = ref(themes[0]);
const isOpen = ref(false);
const isSubmitting = ref(false);
const countryCode = ref("");

onMounted(async () => {
  countryCode.value = await getUserLocationFromIP();

  if (status.value === "unauthenticated") {
    isOpen.value = true;
    return;
  }

  if (!route.query.plan) {
    router.push({ query: { plan: "Basic" } });
    formState.plan = route.query.plan || "Basic";
  }

  if (formState.plan === "Basic") {
    for (let i = 0; i < 3; i++) {
      formState.messages.push({ message: "", image: null });
    }
  } else if (formState.plan === "Premium") {
    for (let i = 0; i < 5; i++) {
      formState.messages.push({ message: "", image: null });
    }
  }
});

function selectedTheme(value: string) {
  if (value === "") return;

  if (value === "Christmas") {
    theme.snowTheme(true);
  } else if (value == "Wedding") {
    theme.loveTheme(true);
  } else {
    theme.start(true);
  }
}

const { stripe } = useClientStripe();

async function subscribeStripe(websiteId: number) {
  if (!websiteId) {
    toast.add({
      title: "Failed to create website",
      color: "red",
    });
    return;
  }
  try {
    const { data } = await useFetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: formState.plan,
        websiteId,
        countryCode,
      }),
    });
    const sessionId = data.value?.sessionId;

    if (!sessionId) {
      throw new Error("Failed to create Checkout session");
    }

    // Redirect to Stripe Checkout
    await stripe.value.redirectToCheckout({ sessionId });
  } catch (error) {
    console.log(error);
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (status.value === "unauthenticated") {
    isOpen.value = true;
    return;
  }
  if (areFieldsEmpty()) {
    toast.add({
      title: "Fill all the fields",
      color: "red",
    });
    return;
  }
  isSubmitting.value = true;
  try {
    const { data, error: websiteError } = await useFetch<{
      body: { websiteId: number };
    }>("/api/website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userEmail: googleUserData.value?.user?.email,
        name: event.data.name,
        theme: event.data.theme,
        messages: event.data.messages,
        plan: event.data.plan,
        googleUserData: googleUserData.value?.user,
        songUrl: event.data.songUrl,
      },
    });

    const parsedBody = JSON.parse(data.value?.body as any);
    const websiteId = parsedBody.websiteId;

    if (websiteError.value?.statusCode === 400) {
      toast.add({
        title: "Você precisa ter uma subscrição ativa para criar o site",
        color: "red",
      });
      return;
    }

    console.log(websiteError.value);

    await subscribeStripe(websiteId as number);

    const body = {
      userEmail: googleUserData.value?.user?.email,
      name: event.data.name,
      theme: event.data.theme,
      messages: event.data.messages,
      googleUserData: googleUserData.value?.user,
    };

    localStorage.setItem("formState", JSON.stringify(body));

    form.value!.clear();
    clearFields();
    toast.add({
      title: "Página criada com sucesso!",
      color: "green",
      timeout: 4000,
    });
  } catch (e) {
    console.log(e);
    toast.add({
      title: "Houve um erro ao criar a página",
      color: "red",
    });
  } finally {
    isSubmitting.value = false;
  }
}

function clearFields() {
  formState.theme = undefined;
  formState.name = undefined;
  formState.messages = [
    { message: "", image: null },
    { message: "", image: null },
    { message: "", image: null },
  ];
}

function areFieldsEmpty() {
  return (
    formState.theme === undefined ||
    formState.name === undefined ||
    formState.messages.some((message) => message.message === "")
  );
}

async function uploadImageForMessage(event: Event, index: number) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const base64 = await getBase64(input.files[0]);
    formState.messages[index].image = base64;
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
  if (input.value.length > 600) {
    input.value = input.value.slice(0, 600);
    formState.messages[index].message = input.value;
  }
}
</script>
