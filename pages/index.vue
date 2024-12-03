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
            Surprise your friends, love and family
          </h1>
          <p
            class="text-lg w-11/12 mt-10 xl:text-2xl lg:text-lg md:text-lg sm:text-lg lg:w-3/4"
          >
            Dedique um tempo para fazer uma surpresa para quem você ama.
            Compartilhe momentos especiais e faça alguém sorrir.
          </p>
          <div class="max-w-72 w-full mt-8">
            <NuxtLink to="/create">
              <UButton
                class="text-2xl py-5 dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                block
                label="I want to surprise"
              />
            </NuxtLink>
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
      <h2 class="text-5xl">How it works</h2>

      <div
        class="mt-9 grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
      >
        <CardSupport title="1. Choose a sesional" />
        <CardSupport title="2. Make the payment" />
        <CardSupport title="3. Receive your page after via email " />
        <CardSupport title="4. Share with the person" />
      </div>
    </section>

    <section class="py-[187px] px-10 lg:max-w-7xl lg:pl-24 m-auto">
      <h2 class="text-center text-5xl font-bold mb-16">Plan prices</h2>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Plans
          title="Basic"
          :price="4"
          :benefits="['6 months access', '5 photos', 'No song']"
          @set-plan-url="handleSetPlanUrl"
        />
        <Plans
          :most-picked="true"
          title="Premium"
          :price="10"
          :benefits="['Lifetime access', '5 photos', 'With song']"
          @set-plan-url="handleSetPlanUrl"
        />
      </div>
    </section>

    <section class="py-[27px] px-10 lg:max-w-7xl lg:pl-24 m-auto">
      <h4 class="text-center text-5xl font-bold mb-10">
        Frequently Asked Questions
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
