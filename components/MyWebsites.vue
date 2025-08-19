<template>
  <UModal :modelValue="isOpen" @update:modelValue="updateIsOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1 class="text-center text-3xl">{{ $t("myWebsites.title") }} 🔥</h1>
      </template>
      <div v-if="hasData">
        <ul class="flex flex-col gap-8">
          <li
            class="flex justify-between"
            v-for="site in data?.websites"
            :key="site.id"
          >
            <a
              target="_blank"
              class="font-bold"
              v-if="site.active"
              :href="config.public.baseUrl + '/website/' + site.guid"
            >
              {{ config.public.baseUrl + "/website/" + site.guid }}
            </a>
            <span class="text-gray-500" v-else>{{
              config.public.baseUrl + "website/" + site.guid
            }}</span>

            <div class="relative">
              <UTooltip
                v-if="!site.active"
                class="cursor-pointer absolute -right-3 -top-5"
                text="Você precisa ativar o site para acessar"
                :popper="{ arrow: true }"
              >
                <UIcon
                  size="25"
                  name="i-heroicons:question-mark-circle-16-solid"
                />
              </UTooltip>
              <UButton
                :loading="loadingStates[site.id]"
                v-if="!site.active"
                @click="stripeBuyNotActive(site.id, site.guid, site.plan)"
                :color="'red'"
              >
                {{ $t("myWebsites.statusInactive") }}</UButton
              >
              <UButton color="green" v-else>
                {{ $t("myWebsites.statusActive") }}
              </UButton>
            </div>
          </li>
        </ul>
      </div>

      <div v-else>
        <span class="text-center">{{ $t("myWebsites.noWebSite") }}</span>
      </div>

      <template #footer>
        <div class="flex items-end justify-end">
          <UButton @click="updateIsOpen(false)">
            {{ $t("myWebsites.close") }}</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
  <UNotifications />
</template>

<script lang="ts" setup>
import type { IWebsiteActiveClients } from "~/models/IWebsite";

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["update:isOpen"]);

const { data: countryCode }= await useFetch("/api/location/geo", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

const updateIsOpen = (value: boolean) => {
  emit("update:isOpen", value);
};
const config = useRuntimeConfig()
const { stripe } = useClientStripe();
const { data: googleData } = useAuthState();
const toast = useToast();

const loadingStates = reactive<Record<number, boolean>>({});

const googleEmail = googleData.value?.user?.email;


const { data } = await useFetch<IWebsiteActiveClients>(
  `/api/website/email/${googleEmail}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

const hasData = computed(() => !!data.value?.websites.length);

async function stripeBuyNotActive(websiteId: number, websiteGuid: string, plan: string) {
  const amount = plan === "Basic" ? 400 : 1000;
  loadingStates[websiteId] = true;

  try {
    const { data } = await useFetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        websiteId,
        websiteGuid,
        countryCode: countryCode.value,
        userEmail: googleData.value?.user?.email,
      }),
    });

    const sessionId = data.value?.sessionId;
    if (!sessionId) {
      throw new Error("Failed to create Checkout session");
    }

    // Use direct redirect to avoid mobile popup blockers
    const checkoutUrl = data.value?.url;
    if (checkoutUrl) {
      // Add slight delay to ensure UI updates before redirect
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 100);
    } else {
      // Fallback to sessionId redirect
      await stripe.value.redirectToCheckout({ sessionId });
    }
  } catch {
    toast.add({
      title: "An error occurred while trying to buy",
      color: "red",
    });
  } finally {
    loadingStates[websiteId] = false;
  }
}
</script>
