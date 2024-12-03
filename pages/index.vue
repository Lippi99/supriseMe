<template>
  <NuxtLayout name="custom">
    <section class="py-[47px] pl-24 pr-24 lg:pr-0 lg:max-w-7xl m-auto">
      <div
        class="flex flex-col-reverse items-center justify-center lg:flex-row"
      >
        <div
          class="flex-1 my-10 flex flex-col items-center justify-center lg:justify-start lg:items-start"
        >
          <h1
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
          alt="gift"
          src="/images/photo.svg"
        />
      </div>
    </section>

    <section class="py-[47px] px-10 lg:max-w-7xl lg:pl-24 m-auto">
      <h2 class="text-5xl">{{ $t("indexPage.sectionTwo.title") }}</h2>

      <div
        class="mt-9 grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
      >
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionOne')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionTwo')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionThree')" />
        <CardSupport :title="$t('indexPage.sectionTwo.descriptionFour')" />
      </div>
    </section>

    <section class="py-[187px] px-10 lg:max-w-7xl lg:pl-24 m-auto">
      <h2 class="text-center text-5xl font-bold mb-16">
        {{ $t("indexPage.sectionThree.title") }}
      </h2>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Plans
          :title="$t('indexPage.sectionThree.basic.title')"
          :price="4"
          :benefits="[
            $t('indexPage.sectionThree.basic.descriptionOne'),
            $t('indexPage.sectionThree.basic.descriptionTwo'),
            $t('indexPage.sectionThree.basic.descriptionThree'),
          ]"
          @set-plan-url="handleSetPlanUrl"
        />
        <Plans
          :most-picked="true"
          :title="$t('indexPage.sectionThree.premium.title')"
          :price="10"
          :benefits="[
            $t('indexPage.sectionThree.premium.descriptionOne'),
            $t('indexPage.sectionThree.premium.descriptionTwo'),
            $t('indexPage.sectionThree.premium.descriptionThree'),
          ]"
          @set-plan-url="handleSetPlanUrl"
        />
      </div>
    </section>

    <section class="py-[27px] px-10 lg:max-w-7xl lg:pl-24 m-auto">
      <h4 class="text-center text-5xl font-bold mb-10">
        {{ $t("indexPage.sectionFour.title") }}
      </h4>
      <Faq />
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRouter();
const { signOut } = useAuth();

useSeoMeta({
  title: "SurpriseMe - Make a surprise for someone special",
  description:
    "SurpriseMe is a platform destinated to create a surprise letter for someone special. You can choose a template, write a message and send it to the person you want to surprise.",
  ogDescription:
    "SurpriseMe is a platform destinated to create a surprise letter for someone special. You can choose a template, write a message and send it to the person you want to surprise.",
});

function handleSetPlanUrl(url: string) {
  route.push(url);
}
</script>
