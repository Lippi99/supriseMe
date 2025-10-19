<template>
  <NuxtLayout name="custom">
    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950"
      aria-labelledby="hero-heading"
    >
      <!-- Animated background elements - Responsive sizes -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-teal-400/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl sm:blur-3xl animate-spin-slow"
        ></div>
      </div>

      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 max-w-7xl relative z-10"
      >
        <div
          class="flex flex-col-reverse items-center justify-between gap-8 sm:gap-12 lg:flex-row lg:gap-16"
        >
          <div
            class="flex-1 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10"
          >
            <!-- Badge - Mobile optimized -->
            <div
              class="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-violet-200 dark:border-violet-700 shadow-lg"
            >
              <span
                class="text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
              >
                ✨ Create Magic Moments
              </span>
            </div>

            <!-- Mobile-first responsive heading -->
            <h1
              id="hero-heading"
              class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-[1.1] tracking-tight"
            >
              {{ $t("indexPage.sectionOne.title") }}
            </h1>

            <!-- Mobile-optimized description -->
            <p
              class="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light px-2 sm:px-0"
            >
              {{ $t("indexPage.sectionOne.description") }}
            </p>

            <!-- Mobile-optimized button layout -->
            <div
              class="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch xs:items-center px-2 sm:px-0"
            >
              <NuxtLinkLocale to="/create" class="group w-full xs:w-auto">
                <UButton
                  class="w-full xs:w-auto text-lg sm:text-xl lg:text-2xl px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 transform transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-violet-500/25 rounded-2xl border-0 relative overflow-hidden touch-manipulation"
                  block
                  :label="$t('indexPage.sectionOne.button')"
                />
              </NuxtLinkLocale>
            </div>
          </div>

          <!-- Mobile-optimized image section -->
          <div
            class="flex-1 relative w-full max-w-md sm:max-w-lg lg:max-w-none"
          >
            <div class="relative">
              <!-- Mobile-optimized floating cards -->
              <div
                class="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-violet-100 dark:border-violet-800 p-2 sm:p-3 lg:p-4 animate-float"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center"
                >
                  <span class="text-lg sm:text-xl lg:text-2xl">💝</span>
                </div>
              </div>

              <div
                class="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-fuchsia-100 dark:border-fuchsia-800 p-2 sm:p-3 animate-float-delayed"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center"
                >
                  <span class="text-sm sm:text-lg lg:text-xl">🎉</span>
                </div>
              </div>

              <div
                class="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-18 h-18 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-purple-100 dark:border-purple-800 p-2 sm:p-3 lg:p-4 animate-float-slow"
              >
                <div
                  class="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center"
                >
                  <span class="text-lg sm:text-xl lg:text-2xl">❤️</span>
                </div>
              </div>

              <!-- Mobile-optimized main image -->
              <div
                class="relative transform transition-all duration-700 hover:scale-105 lg:hover:rotate-1"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-violet-600/20 via-purple-600/20 to-fuchsia-600/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-105"
                ></div>
                <NuxtImg
                  class="relative w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/50 dark:border-gray-700/50 backdrop-blur-sm"
                  alt="People celebrating and creating personalized surprise pages with photos and messages"
                  src="/images/photo.svg"
                  loading="eager"
                  width="600"
                  height="500"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-2xl sm:rounded-3xl"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Video Section -->
    <section
      class="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden"
      aria-labelledby="demo-video-heading"
    >
      <!-- Background decorative elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-1/4 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-1/4 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-fuchsia-500/10 to-pink-500/10 rounded-full blur-3xl"
        ></div>
      </div>

      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        <!-- Main Section header -->
        <div class="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/50 dark:to-fuchsia-900/50 backdrop-blur-sm border border-violet-200 dark:border-violet-700 shadow-lg mb-4 sm:mb-6"
          >
            <span
              class="text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent"
            >
              🎬 See It In Action
            </span>
          </div>

          <h2
            id="demo-video-heading"
            class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
          >
            {{ $t("indexPage.demoSection.mainTitle") }}
          </h2>

          <p
            class="text-base sm:text-lg lg:text-xl text-gray-400 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            {{ $t("indexPage.demoSection.mainDescription") }}
          </p>

          <div
            class="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full shadow-lg mt-4 sm:mt-6"
          ></div>
        </div>

        <!-- Creation Process - Desktop Browser -->
        <div class="mb-16 sm:mb-20 lg:mb-24">
          <div class="text-center mb-8 sm:mb-12">
            <h3
              class="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4"
            >
              {{ $t("indexPage.demoSection.creationTitle") }}
            </h3>
            <p
              class="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4"
            >
              {{ $t("indexPage.demoSection.creationDescription") }}
            </p>
          </div>

          <div class="max-w-6xl mx-auto px-4">
            <div class="relative">
              <!-- Browser mockup with glowing effect -->
              <div class="relative group">
                <!-- Glowing border effect -->
                <div
                  class="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                ></div>

                <!-- Browser Mockup Component -->
                <BrowserMockup
                  size="large"
                  demo-path="create"
                  class="relative z-10 browser-float"
                >
                  <!-- Video inside the browser -->
                  <video
                    class="w-full h-full object-cover object-top"
                    src="https://pub-10ca3048728847c5b410c357acd03135.r2.dev/demo-video/demo-desktop.mp4"
                    autoplay
                    loop
                    muted
                    playsinline
                    title="SurpriseMe Creation Process Demo"
                  >
                    Your browser does not support the video tag.
                  </video>
                </BrowserMockup>
              </div>
            </div>
          </div>
        </div>

        <!-- Separator -->
        <div class="flex items-center justify-center mb-16 sm:mb-20 lg:mb-24">
          <div
            class="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent max-w-xs"
          ></div>
          <div class="mx-4">
            <svg
              class="w-8 h-8 text-violet-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <div
            class="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent max-w-xs"
          ></div>
        </div>

        <!-- Final Result - Mobile Phone -->
        <div class="mb-12 sm:mb-16">
          <div class="text-center mb-8 sm:mb-12">
            <h3
              class="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4"
            >
              {{ $t("indexPage.demoSection.resultTitle") }}
            </h3>
            <p
              class="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4"
            >
              {{ $t("indexPage.demoSection.resultDescription") }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="relative">
              <!-- Phone mockup with glowing effect -->
              <div class="relative group flex justify-center">
                <!-- Glowing border effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 rounded-[3rem] sm:rounded-[4rem] blur-2xl opacity-40 group-hover:opacity-50 transition-opacity duration-500 scale-105"
                ></div>

                <!-- iPhone Mockup Component -->
                <PhoneMockup size="medium" class="relative z-10 phone-float">
                  <!-- Video inside the phone -->
                  <video
                    class="w-full h-full object-cover"
                    src="https://pub-10ca3048728847c5b410c357acd03135.r2.dev/demo-video/demo.mp4"
                    autoplay
                    loop
                    muted
                    playsinline
                    title="SurpriseMe Mobile Result Demo"
                  >
                    Your browser does not support the video tag.
                  </video>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="text-center mt-12 sm:mt-16 lg:mt-20">
          <p
            class="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 font-medium"
          >
            {{ $t("indexPage.demoSection.ctaText") }}
          </p>
          <NuxtLinkLocale to="/create" class="inline-block">
            <UButton
              class="text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-violet-500/25 rounded-2xl touch-manipulation"
              :label="$t('indexPage.demoSection.ctaButton')"
            />
          </NuxtLinkLocale>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section
      class="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-gray-900 via-slate-900/30 to-gray-900 relative overflow-hidden"
      aria-labelledby="how-it-works"
    >
      <!-- Mobile-optimized background decorations -->

      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        <!-- Mobile-optimized header -->
        <div class="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 backdrop-blur-sm border border-violet-200 dark:border-violet-700 shadow-lg mb-4 sm:mb-6"
          >
            <span
              class="text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent"
            >
              🚀 Simple Process
            </span>
          </div>

          <h2
            id="how-it-works"
            class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
          >
            {{ $t("indexPage.sectionTwo.title") }}
          </h2>

          <div
            class="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full shadow-lg"
          ></div>
        </div>

        <!-- Mobile-first grid layout -->
        <div
          class="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-4"
        >
          <div class="group relative touch-manipulation">
            <div
              class="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-purple-100/50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>
            <CardSupport
              :title="$t('indexPage.sectionTwo.descriptionOne')"
              class="relative max-w-[500px] w-full h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-violet-500/25 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-violet-100 dark:border-violet-800 rounded-2xl sm:rounded-3xl"
            />
          </div>

          <div class="group relative touch-manipulation">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-fuchsia-100/50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>
            <CardSupport
              :title="$t('indexPage.sectionTwo.descriptionTwo')"
              class="relative max-w-[500px] w-full h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-purple-500/25 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-purple-100 dark:border-purple-800 rounded-2xl sm:rounded-3xl"
            />
          </div>

          <div class="group relative touch-manipulation">
            <div
              class="absolute inset-0 bg-gradient-to-br from-fuchsia-100/50 to-pink-100/50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>
            <CardSupport
              :title="$t('indexPage.sectionTwo.descriptionThree')"
              class="relative max-w-[500px] w-full h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-fuchsia-500/25 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-fuchsia-100 dark:border-fuchsia-800 rounded-2xl sm:rounded-3xl"
            />
          </div>

          <div class="group relative touch-manipulation">
            <div
              class="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>
            <CardSupport
              :title="$t('indexPage.sectionTwo.descriptionFour')"
              class="relative max-w-[500px] w-full h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-pink-500/25 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-pink-100 dark:border-pink-800 rounded-2xl sm:rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section
      class="py-12 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-blue-950/50 relative overflow-hidden"
      aria-labelledby="pricing-plans"
    >
      <!-- Mobile-optimized background decorations -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-0 left-1/4 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-300/20 to-cyan-400/20 rounded-full blur-2xl sm:blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 right-1/4 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-tl from-teal-300/20 to-blue-400/20 rounded-full blur-2xl sm:blur-3xl"
        ></div>
      </div>

      <div
        class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        <!-- Mobile-optimized header -->
        <div class="text-center mb-12 sm:mb-16 lg:mb-20">
          <div
            class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700 shadow-lg mb-4 sm:mb-6"
          >
            <span
              class="text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent"
            >
              💎 Choose Your Plan
            </span>
          </div>

          <h2
            id="pricing-plans"
            class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
          >
            {{ $t("indexPage.sectionThree.title") }}
          </h2>

          <div
            class="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full shadow-lg"
          ></div>
        </div>

        <!-- Mobile-first pricing grid -->
        <div
          class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12 max-w-5xl mx-auto"
        >
          <!-- Basic Plan -->
          <div class="group relative touch-manipulation">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>
            <Plans
              :title="$t('indexPage.sectionThree.basic.title')"
              :price="$t('indexPage.sectionThree.basic.price')"
              :benefits="[
                $t('indexPage.sectionThree.basic.descriptionOne'),
                $t('indexPage.sectionThree.basic.descriptionTwo'),
                $t('indexPage.sectionThree.basic.descriptionThree'),
              ]"
              @set-plan-url="handleSetPlanUrl"
              class="relative h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:shadow-blue-500/25 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-blue-100 dark:border-blue-800 rounded-2xl sm:rounded-3xl"
            />
          </div>

          <!-- Premium Plan -->
          <div class="group relative touch-manipulation">
            <!-- Mobile-optimized popular badge -->
            <div
              class="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div class="relative">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur-md sm:blur-lg opacity-75"
                ></div>
                <span
                  class="relative bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg sm:shadow-xl border border-white/20 backdrop-blur-sm"
                >
                  ⭐ Most Popular
                </span>
              </div>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>

            <!-- Mobile-optimized glowing border effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl opacity-75 blur-sm"
            ></div>
            <div
              class="absolute inset-0.5 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl"
            ></div>

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
              class="relative h-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-3 shadow-xl sm:shadow-2xl hover:shadow-violet-500/30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl border-2 border-transparent"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRouter();
const { t } = useI18n();
const { locale } = useI18n();

useSeoMeta({
  title: t("seo.index.title"),
  ogTitle: t("seo.index.ogTitle"),
  description: t("seo.index.description"),
  ogDescription: t("seo.index.ogDescription"),
  ogImage: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
  ogImageAlt: "SurpriseMe - Create surprise pages for loved ones",
  ogImageWidth: 512,
  ogImageHeight: 512,
  ogType: "website",
  ogSiteName: "SurpriseMe",
  ogUrl: "https://www.surpriseme.com.br",
  twitterCard: "summary_large_image",
  twitterImage: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
  twitterTitle: t("seo.index.title"),
  twitterDescription: t("seo.index.description"),
  twitterSite: "@surprisemeapp",
  twitterCreator: "@surprisemeapp",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  author: "SurpriseMe Team",
  publisher: "SurpriseMe",
  applicationName: "SurpriseMe",
  referrer: "origin-when-cross-origin",
  keywords:
    "surprise page, personalized gift, love letter, photo messages, special moments, birthday surprise, anniversary gift, custom webpage, romantic surprise, memory book",
  themeColor: "#8b5cf6",
  colorScheme: "light dark",
  viewport: "width=device-width, initial-scale=1.0",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://www.surpriseme.com.br",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.surpriseme.com.br/en",
    },
    {
      rel: "alternate",
      hreflang: "pt",
      href: "https://www.surpriseme.com.br",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.surpriseme.com.br",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.surpriseme.com.br/#website",
        name: "SurpriseMe",
        alternateName: "Surprise Me",
        url: "https://www.surpriseme.com.br",
        description: t("seo.index.description"),
        inLanguage: [locale.value, locale.value === "pt" ? "pt-BR" : "en-US"],
        isPartOf: {
          "@id": "https://www.surpriseme.com.br/#organization",
        },
        about: {
          "@type": "Thing",
          name: "Personalized surprise pages",
        },
        mainEntity: {
          "@type": "WebPage",
          "@id": "https://www.surpriseme.com.br/#webpage",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.surpriseme.com.br/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@id": "https://www.surpriseme.com.br/#organization",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.surpriseme.com.br/#organization",
        name: "SurpriseMe",
        alternateName: "Surprise Me",
        url: "https://www.surpriseme.com.br",
        logo: {
          "@type": "ImageObject",
          "@id": "https://www.surpriseme.com.br/#logo",
          url: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
          width: 512,
          height: 512,
          caption: "SurpriseMe Logo",
        },
        image: {
          "@id": "https://www.surpriseme.com.br/#logo",
        },
        description: t("seo.index.description"),
        sameAs: [
          "https://twitter.com/surprisemeapp",
          "https://facebook.com/surprisemeapp",
          "https://instagram.com/surprisemeapp",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Portuguese"],
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.surpriseme.com.br/#webpage",
        url: "https://www.surpriseme.com.br",
        name: t("seo.index.title"),
        description: t("seo.index.description"),
        inLanguage: locale.value,
        isPartOf: {
          "@id": "https://www.surpriseme.com.br/#website",
        },
        about: {
          "@type": "Service",
          "@id": "https://www.surpriseme.com.br/#service",
          name: "Personalized Surprise Page Creation",
          description:
            "Create beautiful, personalized surprise pages with photos and messages for your loved ones",
          provider: {
            "@id": "https://www.surpriseme.com.br/#organization",
          },
          areaServed: "Worldwide",
          availableLanguage: ["English", "Portuguese"],
          serviceType: "Digital Service",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.surpriseme.com.br",
            },
          ],
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "SurpriseMe Page Creation Service",
        description:
          "Create personalized surprise pages with photos, messages, and themes",
        brand: {
          "@type": "Brand",
          name: "SurpriseMe",
        },
        category: "Digital Service",
        offers: [
          {
            "@type": "Offer",
            name: "Basic Plan",
            description: "3 photos, 6 months access",
            price: "4",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            seller: {
              "@id": "https://www.surpriseme.com.br/#organization",
            },
          },
          {
            "@type": "Offer",
            name: "Premium Plan",
            description: "5 photos, lifetime access, with background music",
            price: "7",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            seller: {
              "@id": "https://www.surpriseme.com.br/#organization",
            },
          },
        ],
      }),
    },
  ],
});

function handleSetPlanUrl(url: string) {
  route.push(url);
}
</script>

<style scoped>
/* Keyframe animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin-slow {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Animation classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  /* Reduce animation intensity on mobile for better performance */
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 10s ease-in-out infinite;
    animation-delay: 1s;
  }

  .animate-float-slow {
    animation: float-slow 12s ease-in-out infinite;
    animation-delay: 0.5s;
  }

  /* Optimize hover effects for touch devices */
  .group:hover .group-hover\:scale-110 {
    transform: scale(1.05);
  }

  /* Ensure proper touch targets */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}

/* Tablet-specific optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Slightly reduced animations for tablet */
  .animate-spin-slow {
    animation: spin-slow 25s linear infinite;
  }
}

/* Ensure smooth scrolling on all devices */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-float-delayed,
  .animate-float-slow,
  .animate-spin-slow {
    animation: none;
  }

  .transition-all,
  .transition-transform,
  .transition-colors,
  .transition-shadow {
    transition: none;
  }
}

/* Custom width for extra small screens */
.w-18 {
  width: 4.5rem;
}

.h-18 {
  height: 4.5rem;
}

/* Enhanced focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
  border-radius: 0.375rem;
}
</style>
