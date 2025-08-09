<template>
  <NuxtLayout name="custom">
    <section
      class="py-[47px] pl-24 pr-24 lg:pr-0 lg:max-w-7xl m-auto"
      aria-labelledby="hero-heading"
    >
      <div
        class="flex flex-col-reverse items-center justify-center lg:flex-row"
      >
        <div
          class="flex-1 my-10 flex flex-col items-center justify-center lg:justify-start lg:items-start"
        >
          <h1
            id="hero-heading"
            class="text-3xl w-11/12 xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl"
          >
            {{ $t("indexPage.sectionOne.title") }}
          </h1>
          <p
            class="text-lg w-11/12 mt-10 xl:text-2xl lg:text-lg md:text-lg sm:text-lg lg:w-3/4"
          >
            {{ $t("indexPage.sectionOne.description") }}
          </p>
          <div class="max-w-72 w-full mt-8">
            <NuxtLinkLocale to="/create">
              <UButton
                class="text-2xl py-5 dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                block
                :label="$t('indexPage.sectionOne.button')"
              />
            </NuxtLinkLocale>
          </div>
        </div>
        <NuxtImg
          class="flex-1 min-w-96 w-full object-cover"
          alt="People celebrating and creating personalized surprise pages with photos and messages"
          src="/images/photo.svg"
          loading="eager"
          width="500"
          height="400"
        />
      </div>
    </section>

    <section
      class="py-[47px] px-10 lg:max-w-7xl lg:pl-24 m-auto"
      aria-labelledby="how-it-works"
    >
      <h2 id="how-it-works" class="text-5xl">
        {{ $t("indexPage.sectionTwo.title") }}
      </h2>

      <div
        class="mt-9 grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
      >
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionOne')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionTwo')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionThree')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionFour')" />
      </div>
    </section>

    <section
      class="py-[187px] px-10 lg:max-w-7xl lg:pl-24 m-auto"
      aria-labelledby="pricing-plans"
    >
      <h2 id="pricing-plans" class="text-center text-5xl font-bold mb-16">
        {{ $t("indexPage.sectionThree.title") }}
      </h2>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Plans
          :title="$t('indexPage.sectionThree.basic.title')"
          :price="$t('indexPage.sectionThree.basic.price')"
          :benefits="[
            $t('indexPage.sectionThree.basic.descriptionOne'),
            $t('indexPage.sectionThree.basic.descriptionTwo'),
            $t('indexPage.sectionThree.basic.descriptionThree'),
          ]"
          @set-plan-url="handleSetPlanUrl"
        />
        <Plans
          mostPicked
          :title="$t('indexPage.sectionThree.premium.title')"
          :price="$t('indexPage.sectionThree.premium.price')"
          :benefits="[
            $t('indexPage.sectionThree.premium.descriptionOne'),
            $t('indexPage.sectionThree.premium.descriptionTwo'),
            $t('indexPage.sectionThree.premium.descriptionThree'),
          ]"
          @set-plan-url="handleSetPlanUrl"
        />
      </div>
    </section>

    <section
      class="py-[27px] px-10 lg:max-w-7xl lg:pl-24 m-auto"
      aria-labelledby="faq-section"
    >
      <h2 id="faq-section" class="text-center text-5xl font-bold mb-10">
        {{ $t("indexPage.sectionFour.title") }}
      </h2>
      <Faq />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRouter();
const { t } = useI18n();

const { data } = useFetch("/api/stripe/prices");

const { locale } = useI18n();

const pricePremium = computed(() => {
  return locale.value === "en"
    ? `$ ${data.value?.prices[1].usd}`
    : `R$ ${data.value?.prices[1].brl}`;
});

useSeoMeta({
  title: t("seo.index.title"),
  ogTitle: t("seo.index.ogTitle"),
  description: t("seo.index.description"),
  ogDescription: t("seo.index.ogDescription"),
  ogImage: "/icons/surpriseme_512_512.png",
  ogImageAlt: "SurpriseMe - Create surprise pages",
  twitterCard: "summary_large_image",
  twitterImage: "/icons/surpriseme_512_512.png",
  twitterTitle: t("seo.index.title"),
  twitterDescription: t("seo.index.description"),
  robots: "index, follow",
  author: "SurpriseMe",
  keywords:
    "surprise, gift, personalized page, messages, photos, love letter, special moments",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SurpriseMe",
        url: "https://surpriseme.app",
        description: t("seo.index.description"),
        inLanguage: locale.value,
        potentialAction: {
          "@type": "SearchAction",
          target: "https://surpriseme.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SurpriseMe",
        url: "https://surpriseme.app",
        logo: "https://surpriseme.app/icons/surpriseme_512_512.png",
      }),
    },
  ],
});

function handleSetPlanUrl(url: string) {
  route.push(url);
}
</script>
