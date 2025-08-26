<template>
  <UModal
    :modelValue="isOpen"
    @update:modelValue="updateIsOpen"
    :ui="{
      container:
        'flex min-h-full items-center justify-center p-4 text-center sm:p-0',
      padding: 'p-0',
      width: 'w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl',
      height: 'max-h-[90vh] sm:max-h-[85vh]',
    }"
  >
    <UCard
      :ui="{
        ring: 'ring-1 ring-violet-200/50 dark:ring-violet-800/50',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        shadow: 'shadow-2xl',
        background: 'bg-white/95 dark:bg-gray-900/95',
        backdrop: 'backdrop-blur-xl',
        rounded: 'rounded-2xl sm:rounded-3xl',
        body: {
          padding: 'p-4 sm:p-6 lg:p-8',
        },
        header: {
          padding: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8',
        },
        footer: {
          padding: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8',
        },
      }"
      class="mx-auto my-8 overflow-hidden w-full"
    >
      <template #header>
        <div class="text-center space-y-2">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg mb-4"
          >
            <UIcon
              name="i-heroicons-globe-alt-20-solid"
              class="w-8 h-8 text-white"
            />
          </div>
          <h1
            class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
          >
            {{ $t("myWebsites.title") }}
          </h1>
          <p
            class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto"
          >
            Manage your surprise websites and their activation status
          </p>
        </div>
      </template>

      <!-- Content with proper mobile layout -->
      <div class="overflow-y-auto max-h-[50vh]">
        <div v-if="hasData" class="space-y-4 sm:space-y-6">
          <div
            v-for="site in data?.websites"
            :key="site.id"
            class="group relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 hover:shadow-lg"
          >
            <!-- Website URL Section -->
            <div class="mb-4 sm:mb-6">
              <label
                class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
              >
                Website URL
              </label>
              <div class="relative">
                <a
                  v-if="site.active"
                  target="_blank"
                  :href="config.public.baseUrl + '/website/' + site.guid"
                  class="block p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 group/link"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="text-sm sm:text-base font-mono text-violet-600 dark:text-violet-400 truncate pr-2"
                    >
                      {{ config.public.baseUrl + "/website/" + site.guid }}
                    </span>
                    <UIcon
                      name="i-heroicons-arrow-top-right-on-square-20-solid"
                      class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/link:text-violet-600 dark:group-hover/link:text-violet-400 transition-colors duration-300 flex-shrink-0"
                    />
                  </div>
                </a>
                <div
                  v-else
                  class="block p-3 sm:p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600"
                >
                  <span
                    class="text-sm sm:text-base font-mono text-gray-500 dark:text-gray-400 truncate block"
                  >
                    {{ config.public.baseUrl + "/website/" + site.guid }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Status and Action Section -->
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
            >
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'w-2 h-2 rounded-full',
                      site.active ? 'bg-green-500' : 'bg-red-500',
                    ]"
                  ></div>
                  <span class="text-sm sm:text-base font-medium capitalize">
                    {{ site.plan }} Plan
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <!-- Tooltip for inactive sites -->
                <UTooltip
                  v-if="!site.active"
                  text="You need to activate the site to access it"
                  :popper="{ arrow: true }"
                >
                  <UIcon
                    name="i-heroicons-question-mark-circle-20-solid"
                    class="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help"
                  />
                </UTooltip>

                <!-- Action Button -->
                <UButton
                  v-if="!site.active"
                  :loading="loadingStates[site.id]"
                  @click="stripeBuyNotActive(site.id, site.guid, site.plan)"
                  color="red"
                  variant="solid"
                  size="md"
                  class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[120px]"
                >
                  <UIcon
                    name="i-heroicons-credit-card-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  {{ $t("myWebsites.statusInactive") }}
                </UButton>

                <UButton
                  v-else
                  color="green"
                  variant="solid"
                  size="md"
                  class="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg min-w-[120px] cursor-default"
                  disabled
                >
                  <UIcon
                    name="i-heroicons-check-circle-20-solid"
                    class="w-4 h-4 mr-2"
                  />
                  {{ $t("myWebsites.statusActive") }}
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- No websites state -->
        <div v-else class="text-center py-8 sm:py-12">
          <div class="mb-4 sm:mb-6">
            <UIcon
              name="i-heroicons-globe-alt-20-solid"
              class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 dark:text-gray-600"
            />
          </div>
          <h3
            class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
          >
            No websites yet
          </h3>
          <p
            class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto"
          >
            {{ $t("myWebsites.noWebSite") }}
          </p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-center sm:justify-end">
          <UButton
            @click="updateIsOpen(false)"
            color="gray"
            variant="outline"
            size="lg"
            class="min-w-[120px] font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
          >
            <UIcon name="i-heroicons-x-mark-20-solid" class="w-4 h-4 mr-2" />
            {{ $t("myWebsites.close") }}
          </UButton>
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

const { data: countryCode } = await useFetch("/api/location/geo", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

const updateIsOpen = (value: boolean) => {
  emit("update:isOpen", value);
};
const config = useRuntimeConfig();
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

async function stripeBuyNotActive(
  websiteId: number,
  websiteGuid: string,
  plan: string
) {
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
