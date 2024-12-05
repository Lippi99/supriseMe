<template>
  <footer class="mt-32 pt-10 border-t-2 border-[#FF4E6D]">
    <div class="mx-auto max-w-7xl px-6 mb-16 lg:px-4">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm/6 font-semibold text-white">
                {{ $t("footer.socialMedia") }}
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li
                  class="flex gap-4 items-center"
                  v-for="item in navigation.socialMedia"
                  :key="item.href"
                >
                  <a
                    target="_blank"
                    :href="item.href"
                    class="text-sm/6 text-gray-400 hover:text-white"
                  >
                    <UIcon size="30" :name="item.icon" />
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm/6 font-semibold text-white">
                {{ $t("footer.support") }}
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.support" :key="item.href">
                  <a
                    target="_blank"
                    :href="item.href"
                    class="text-sm/6 text-gray-400 hover:text-white"
                  >
                    <UIcon size="30" :name="item.icon"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm/6 font-semibold text-white">
                {{ $t("footer.legal.title") }}
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.legal" :key="item.name">
                  <a
                    target="_blank"
                    :href="item.href"
                    class="text-sm/6 text-gray-400 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const navigation = {
  socialMedia: [
    {
      icon: "i-skill-icons:instagram",
      href: "#",
    },
    {
      icon: "i-logos:facebook",
      href: "#",
    },
    {
      icon: "i-logos:tiktok-icon",
      href: "#",
    },
  ],
  support: [{ icon: "i-logos:whatsapp-icon", href: "#" }],

  legal: [
    { name: t("footer.legal.termsOfService"), href: "/term-services" },
    { name: t("footer.legal.privacyPolicy"), href: "/privacy-policy" },
  ],
};
</script>
