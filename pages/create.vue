<template>
  <NuxtLayout name="custom">
    <!-- Beautiful gradient background -->
    <div
      class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900/50 to-blue-950 relative"
    >
      <!-- Background decorative elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-violet-400/10 to-purple-600/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-violet-400/5 to-purple-400/5 rounded-full blur-xl sm:blur-2xl animate-spin-slow"
        ></div>
      </div>

      <main
        class="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen"
        role="main"
      >
        <!-- Enhanced header with modern styling -->
        <header class="text-center mb-8 sm:mb-12 lg:mb-16">
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 backdrop-blur-sm border border-violet-200 dark:border-violet-700 shadow-lg mb-4 sm:mb-6"
          >
            <span
              class="text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent"
            >
              ✨ Create Your Magic
            </span>
          </div>

          <h1
            class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6"
          >
            {{ $t("createPage.title") }}
          </h1>

          <div
            class="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mx-auto rounded-full shadow-lg mb-6 sm:mb-8"
          ></div>

          <p
            class="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-0"
          >
            {{ $t("createPage.instructions") }}
          </p>
        </header>

        <!-- YouTube Player with modern styling -->
        <div
          v-if="youtubeEmbedUrl"
          class="w-full max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-purple-100/50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl sm:rounded-3xl blur-xl scale-95 group-hover:scale-100 transition-transform duration-500"
            ></div>

            <iframe
              :src="youtubeEmbedUrl"
              width="100%"
              height="250"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="relative rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 backdrop-blur-sm sm:hidden"
            ></iframe>
          </div>
        </div>

        <!-- Main content with modern layout -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 w-full max-w-screen-2xl mx-auto items-start lg:min-h-screen"
        >
          <!-- Form with glassmorphism styling -->
          <div class="w-full">
            <div class="relative group">
              <!-- Glowing background -->

              <!-- Form container -->
              <div
                class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-violet-100 dark:border-violet-800"
              >
                <UForm
                  ref="form"
                  :state="formState"
                  class="space-y-6 sm:space-y-8"
                  @submit="onSubmit"
                >
                  <!-- Plan Selection -->
                  <UFormGroup name="plan">
                    <div class="mb-4">
                      <label
                        class="block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                        for="plan"
                      >
                        {{ $t("createPage.choosePlan") }}
                      </label>
                      <div class="relative group">
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <USelectMenu
                          @change="handleSetPlanUrl"
                          class="relative border-2 border-violet-200 dark:border-violet-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-50"
                          v-model="formState.plan"
                          value-attribute="name"
                          :options="plans"
                          option-attribute="label"
                          :ui="{
                            wrapper: 'relative z-50',
                            container: 'z-50 relative',
                            base: 'relative z-50',
                            option: {
                              container: 'z-50 relative',
                            },
                          }"
                        />
                      </div>
                    </div>
                  </UFormGroup>

                  <!-- Song URL for Premium -->
                  <UFormGroup
                    v-if="formState.plan === 'Premium'"
                    name="songUrl"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                        for="songUrl"
                      >
                        {{ $t("createPage.pickSong") }}
                      </label>
                      <div class="relative group">
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <UInput
                          v-model="formState.songUrl"
                          placeholder="https://www.youtube.com/watch?v=4ZWKR2zJESk"
                          class="relative border-2 border-fuchsia-200 dark:border-fuchsia-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </UFormGroup>

                  <!-- Theme Selection -->
                  <UFormGroup name="theme">
                    <div class="mb-4">
                      <label
                        class="block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                        for="theme"
                      >
                        {{ $t("createPage.chooseTheme") }}
                      </label>
                      <div class="relative group">
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <USelectMenu
                          @change="selectedTheme"
                          class="relative border-2 border-purple-200 dark:border-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-40"
                          v-model="formState.theme"
                          value-attribute="name"
                          :options="themes"
                          option-attribute="label"
                          :ui="{
                            wrapper: 'relative z-40',
                            container: 'z-40 relative',
                            base: 'relative z-40',
                          }"
                        >
                          <template #leading>
                            <UIcon
                              v-if="selected.icon"
                              :name="(selected.icon as string)"
                              class="w-5 h-5"
                            />
                          </template>
                        </USelectMenu>
                      </div>
                    </div>
                  </UFormGroup>

                  <!-- Custom Theme Image Upload -->
                  <UFormGroup
                    v-if="formState.theme === 'Custom'"
                    name="customThemeImage"
                  >
                    <div class="mb-4">
                      <label
                        class="block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                        for="customThemeImage"
                      >
                        {{ $t("createPage.uploadThemeImage") }}
                      </label>

                      <!-- Upload area with modern styling -->
                      <div
                        v-if="!formState.customThemeImage"
                        class="relative group"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <label
                          for="theme-dropzone-file"
                          class="relative flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-emerald-300 dark:border-emerald-600 rounded-xl cursor-pointer bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/30 backdrop-blur-sm transition-all duration-300 touch-manipulation"
                        >
                          <div
                            class="flex flex-col items-center justify-center pt-3 pb-3"
                          >
                            <svg
                              class="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-emerald-500 dark:text-emerald-400"
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
                            <p
                              class="mb-1 text-sm sm:text-base text-emerald-600 dark:text-emerald-300 text-center px-2"
                            >
                              <span class="font-semibold">
                                {{ $t("createPage.clickToUpload") }}
                              </span>
                              {{ $t("createPage.orDragAndDrop") }}
                            </p>
                            <p
                              class="text-xs sm:text-sm text-emerald-500 dark:text-emerald-400"
                            >
                              PNG, JPG, SVG (max 2MB)
                            </p>
                          </div>
                          <input
                            @change="uploadCustomThemeImage"
                            id="theme-dropzone-file"
                            accept="image/*"
                            type="file"
                            class="hidden"
                          />
                        </label>
                      </div>

                      <!-- Theme Image Preview -->
                      <div
                        v-if="formState.customThemeImage"
                        class="relative group"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <div
                          class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-emerald-200 dark:border-emerald-700"
                        >
                          <h3
                            class="text-base sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-200"
                          >
                            {{ $t("createPage.themeImagePreview") }}:
                          </h3>
                          <NuxtPicture
                            :src="formState.customThemeImage"
                            class="w-full h-40 sm:h-48 object-cover rounded-lg shadow-lg"
                            loading="lazy"
                            width="400"
                            height="192"
                            :img-attrs="{
                              alt: 'Preview of custom theme image',
                              style:
                                'width: 100%; height: 100%; object-fit: cover;',
                            }"
                          />
                          <UButton
                            color="red"
                            @click="removeCustomThemeImage"
                            class="mt-3 w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            size="sm"
                          >
                            {{ $t("createPage.removeThemeImage") }}
                          </UButton>
                        </div>
                      </div>
                    </div>
                  </UFormGroup>

                  <!-- Person Name -->
                  <UFormGroup name="name">
                    <div class="mb-4">
                      <label
                        class="block text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3"
                        for="name"
                      >
                        {{ $t("createPage.personName") }}
                      </label>
                      <div class="relative group">
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <UInput
                          v-model="formState.name"
                          placeholder="Sarah, Peter, John..."
                          class="relative border-2 border-violet-200 dark:border-violet-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </UFormGroup>

                  <!-- Messages Section -->
                  <div class="space-y-6 sm:space-y-8">
                    <div
                      v-for="(field, index) in formState.messages"
                      :key="index"
                      class="relative group"
                    >
                      <!-- Message card container -->
                      <div class="relative">
                        <div
                          class="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                        ></div>
                        <div
                          class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-indigo-200 dark:border-indigo-700 space-y-4"
                        >
                          <!-- Message number badge -->
                          <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                              <div
                                class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                              >
                                {{ index + 1 }}
                              </div>
                              <h3
                                class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200"
                              >
                                {{ $t("createPage.writeMessage") }}
                                {{ index + 1 }}
                              </h3>
                            </div>
                            <span
                              class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                            >
                              {{ formState.messages[index].message.length }} /
                              600
                            </span>
                          </div>

                          <!-- Image Upload Section -->
                          <UFormGroup :name="'image-' + index">
                            <label
                              class="block text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-3"
                              :for="'dropzone-file-' + index"
                            >
                              {{ $t("createPage.pickOrUpdateImage") }}
                              {{ index + 1 }}
                            </label>

                            <!-- Upload area -->
                            <div
                              v-if="!field.image"
                              class="relative group/upload"
                            >
                              <div
                                class="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-xl blur-sm scale-95 group-hover/upload:scale-100 transition-transform duration-300"
                              ></div>
                              <label
                                :for="'dropzone-file-' + index"
                                class="relative flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed border-rose-300 dark:border-rose-600 rounded-xl cursor-pointer bg-rose-50/50 dark:bg-rose-900/20 hover:bg-rose-100/50 dark:hover:bg-rose-800/30 backdrop-blur-sm transition-all duration-300 touch-manipulation"
                              >
                                <div
                                  class="flex flex-col items-center justify-center pt-5 pb-6"
                                >
                                  <svg
                                    class="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-rose-500 dark:text-rose-400"
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
                                  <p
                                    class="mb-2 text-sm sm:text-base text-rose-600 dark:text-rose-300 text-center px-2"
                                  >
                                    <span class="font-semibold">
                                      {{ $t("createPage.clickToUpload") }}
                                    </span>
                                    {{ $t("createPage.orDragAndDrop") }}
                                  </p>
                                  <p
                                    class="text-xs sm:text-sm text-rose-500 dark:text-rose-400"
                                  >
                                    SVG, PNG, JPG, WebP
                                  </p>
                                </div>
                                <input
                                  @change="
                                    (event) =>
                                      uploadImageForMessage(event, index)
                                  "
                                  :id="'dropzone-file-' + index"
                                  accept="image/*"
                                  type="file"
                                  class="hidden"
                                />
                              </label>
                            </div>

                            <!-- Image Preview -->
                            <div
                              v-if="field.image"
                              class="relative group/preview"
                            >
                              <div
                                class="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-orange-100/50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-xl blur-sm scale-95 group-hover/preview:scale-100 transition-transform duration-300"
                              ></div>
                              <div
                                class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-rose-200 dark:border-rose-700"
                              >
                                <h4
                                  class="text-base sm:text-lg font-bold mb-3 text-gray-800 dark:text-gray-200"
                                >
                                  {{ $t("createPage.imagePreview") }}
                                  {{ index + 1 }}:
                                </h4>
                                <NuxtPicture
                                  :src="field.image"
                                  class="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                                  loading="lazy"
                                  width="400"
                                  height="320"
                                  :img-attrs="{
                                    alt: `Preview of uploaded image ${
                                      index + 1
                                    } for message`,
                                    style:
                                      'width: 100%; height: 100%; object-fit: cover;',
                                  }"
                                />
                                <UButton
                                  color="red"
                                  @click="removeImage(index)"
                                  class="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                  block
                                >
                                  {{ $t("createPage.removeImage") }}
                                </UButton>
                              </div>
                            </div>
                          </UFormGroup>

                          <!-- Message Text Area -->
                          <UFormGroup :name="'message-' + index">
                            <label
                              class="block text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-3"
                              :for="'message-' + index"
                            >
                              {{ $t("createPage.writeMessage") }}
                              {{ index + 1 }}
                            </label>
                            <div class="relative group/textarea">
                              <div
                                class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-sm scale-95 group-hover/textarea:scale-100 transition-transform duration-300"
                              ></div>
                              <UTextarea
                                @input="(event: Event) => limitTextAreaLength(event, index)"
                                v-model="field.message"
                                :rows="8"
                                class="relative border-2 border-indigo-200 dark:border-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-sm sm:text-base resize-none"
                                variant="outline"
                                :placeholder="
                                  $t('createPage.messagePlaceholder') +
                                  ' ' +
                                  (index + 1)
                                "
                              />
                            </div>
                          </UFormGroup>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="pt-6 sm:pt-8">
                    <div class="relative group">
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-fuchsia-600/50 rounded-xl blur-sm scale-95 group-hover:scale-100 transition-transform duration-300"
                      ></div>
                      <UButton
                        color="red"
                        :loading="isSubmitting"
                        class="relative w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 text-white font-bold py-4 sm:py-5 text-lg sm:text-xl rounded-xl shadow-2xl hover:shadow-violet-500/25 transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 touch-manipulation"
                        block
                        type="submit"
                      >
                        {{
                          isSubmitting
                            ? $t("createPage.creating")
                            : $t("createPage.createButton")
                        }}
                      </UButton>
                    </div>
                  </div>
                </UForm>
              </div>
            </div>
          </div>

          <!-- Preview Section with Enhanced Styling -->
          <div class="w-full sticky top-32">
            <div class="max-h-[calc(100vh-2rem)] overflow-y-auto">
              <div class="group">
                <!-- Glowing background -->

                <!-- Preview container -->
                <div
                  class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-violet-100 dark:border-violet-800"
                >
                  <div class="mb-6">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <svg
                          class="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <h2
                        class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {{ $t("createPage.livePreview") }}
                      </h2>
                    </div>
                    <div
                      class="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full shadow-lg"
                    ></div>
                  </div>

                  <Preview :form="formState" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals and Notifications -->
    <PaymentModal :isOpen="isOpen" @closeModal="closeModal" />
    <PixPaymentModal
      v-if="currentWebsiteData"
      :isOpen="isPixPaymentModalOpen"
      :websiteId="currentWebsiteData.id"
      :websiteGuid="currentWebsiteData.guid"
      :plan="formState.plan"
      @close="closePixModal"
    />
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
import { reactive, ref, computed } from "vue";

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
  ogImage: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
  ogImageAlt: "Create your personalized surprise page with photos and messages",
  ogImageWidth: 512,
  ogImageHeight: 512,
  ogType: "website",
  ogSiteName: "SurpriseMe",
  ogUrl: `https://www.surpriseme.com.br${route.fullPath}`,
  twitterCard: "summary_large_image",
  twitterImage: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
  twitterTitle: t("seo.create.title"),
  twitterDescription: t("seo.create.description"),
  twitterSite: "@surprisemeapp",
  twitterCreator: "@surprisemeapp",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  author: "SurpriseMe Team",
  publisher: "SurpriseMe",
  applicationName: "SurpriseMe",
  referrer: "origin-when-cross-origin",
  keywords:
    "create surprise page, personalized messages, photo upload, custom themes, birthday surprise, wedding memories, christmas greetings, love letters, anniversary gifts, memory book creator",
  themeColor: "#8b5cf6",
  colorScheme: "light dark",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://www.surpriseme.com.br${route.fullPath}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://www.surpriseme.com.br${route.fullPath}#webpage`,
        url: `https://www.surpriseme.com.br${route.fullPath}`,
        name: t("seo.create.title"),
        description: t("seo.create.description"),
        inLanguage: locale.value,
        isPartOf: {
          "@id": "https://www.surpriseme.com.br/#website",
        },
        about: {
          "@type": "CreativeWork",
          name: "Surprise Page Creation Tool",
          description:
            "Interactive tool to create personalized surprise pages with photos, messages, and themes",
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
            {
              "@type": "ListItem",
              position: 2,
              name: "Create",
              item: "https://www.surpriseme.com.br/create",
            },
          ],
        },
        mainEntity: {
          "@type": "WebApplication",
          "@id": `https://www.surpriseme.com.br${route.fullPath}#application`,
          name: "SurpriseMe Page Creator",
          description:
            "Create beautiful surprise pages with photos and personalized messages",
          applicationCategory: "CreativeWorkSoftware",
          operatingSystem: "Web Browser",
          offers: [
            {
              "@type": "Offer",
              name: "Basic Plan",
              description:
                "Create surprise pages with 3 photos and 6 months access",
              price: "4.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "Premium Plan",
              description:
                "Create surprise pages with 5 photos, lifetime access, and background music",
              price: "7.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          ],
          featureList: [
            "Upload photos",
            "Add personalized messages",
            "Choose from multiple themes",
            "Add background music (Premium)",
            "Share with loved ones",
          ],
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Create a Surprise Page",
        description:
          "Step by step guide to create a personalized surprise page for your loved ones",
        image: "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
        totalTime: "PT10M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Photos of memories",
          },
          {
            "@type": "HowToSupply",
            name: "Personal messages",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: "SurpriseMe platform",
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Choose your plan",
            text: "Select between Basic (3 photos) or Premium (5 photos + music) plan",
            image:
              "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
          },
          {
            "@type": "HowToStep",
            name: "Select a theme",
            text: "Choose from Christmas, Birthday, Wedding, or upload your custom theme",
            image:
              "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
          },
          {
            "@type": "HowToStep",
            name: "Upload photos and write messages",
            text: "Add your favorite photos and write heartfelt messages for each one",
            image:
              "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
          },
          {
            "@type": "HowToStep",
            name: "Complete payment and share",
            text: "Complete the payment and share the unique link with your loved one",
            image:
              "https://www.surpriseme.com.br/icons/surpriseme_512_512.webp",
          },
        ],
      }),
    },
  ],
});

const { status, data: googleUserData } = useAuthState();

const schemas = z
  .object({
    plan: z.enum(["Basic", "Premium"], {
      required_error: "Plan is required",
      invalid_type_error: "Plan is required",
    }),
    theme: z
      .string({
        required_error: "Theme is required",
      })
      .min(1, "Theme is required"),
    songUrl: z.string().optional(),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .trim(),
    messages: z
      .array(
        z.object({
          message: z
            .string({
              required_error: "Message is required",
              invalid_type_error: "Message must be text",
            })
            .min(1, "Message is required")
            .max(600, "Message must be 600 characters or less")
            .trim(),
          image: z
            .string({
              required_error: "Image is required",
            })
            .min(1, "Image is required")
            .refine((value) => {
              return value?.startsWith("data:image");
            }, "Invalid image format"),
        })
      )
      .min(1, "At least one message is required"),
    customThemeImage: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.plan === "Premium") {
        return data.songUrl && data.songUrl.trim().length > 0;
      }
      return true;
    },
    {
      message: "Song URL is required for Premium plan",
      path: ["songUrl"],
    }
  )
  .refine(
    (data) => {
      if (data.theme === "Custom") {
        return (
          data.customThemeImage &&
          data.customThemeImage.trim().length > 0 &&
          (data.customThemeImage.startsWith("data:image") ||
            data.customThemeImage.startsWith("http"))
        );
      }
      return true;
    },
    {
      message: "Custom theme image is required when Custom theme is selected",
      path: ["customThemeImage"],
    }
  );

export type Schema = z.output<typeof schemas>;
const formState = reactive({
  plan: (route.query.plan as string) || "Basic",
  theme: undefined,
  name: undefined,
  songUrl: "",
  messages: [] as Array<{ message: string; image: string | null }>,
  customThemeImage: null as string | null,
});

const form = ref<Form<Schema>>();

function handleSetPlanUrl(url: string) {
  router.push({ query: { plan: url } });

  // Reset theme to undefined if switching to Basic and it's Custom
  if (url === "Basic" && formState.theme === "Custom") {
    formState.theme = undefined;
    formState.customThemeImage = null;
    // Stop any active theme effects
    theme.stop();
  }

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

const themes = computed(() => {
  const baseThemes = [
    {
      name: "Christmas",
      label: t("createPage.themes.christmas"),
      icon: "i-icon-park-solid-christmas-tree-one",
    },
    {
      name: "Birthday",
      label: t("createPage.themes.birthday"),
      icon: "i-heroicons-cake-20-solid",
    },
    {
      name: "Wedding",
      label: t("createPage.themes.wedding"),
      icon: "i-fluent-emoji-high-contrast-wedding",
    },
  ];

  // Only add Custom theme if plan is Premium
  if (formState.plan === "Premium") {
    baseThemes.push({
      name: "Custom",
      label: t("createPage.themes.custom"),
      icon: "i-heroicons-photo-20-solid",
    });
  }

  return baseThemes;
});

const plans = computed(() => [
  {
    name: "Basic",
    label: t("createPage.plans.basic"),
  },
  {
    name: "Premium",
    label: t("createPage.plans.premium"),
  },
]);

const selected = computed(() => {
  const currentTheme = themes.value.find(
    (theme) => theme.name === formState.theme
  );
  return currentTheme || themes.value[0] || { name: "", label: "", icon: "" };
});
const isOpen = ref(false);
const isSubmitting = ref(false);

const { data: countryCode } = await useFetch("/api/location/geo", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

// Extract YouTube video ID from URL
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|\/v\/|youtu\.be\/|\/embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

// Create YouTube embed URL with autoplay (unmuted)
const youtubeEmbedUrl = computed(() => {
  const videoId = extractYouTubeId(formState.songUrl);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
});

onMounted(async () => {
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
  } else if (value === "Custom" && formState.customThemeImage) {
    theme.customTheme(true, formState.customThemeImage);
  } else if (value === "Custom") {
    // Show regular confetti if no custom image yet
    theme.start(true);
  } else {
    theme.start(true);
  }
}

const { stripe } = useClientStripe();

// Payment provider selection
const isPixPaymentModalOpen = ref(false);
const currentWebsiteData = ref<{ id: number; guid: string } | null>(null);

// Determine payment provider based on country code
const paymentProvider = computed(() => {
  // Use MercadoPago/PIX for Brazil, Stripe for others
  return countryCode.value === "BR" ? "mercadopago" : "stripe";
});

async function subscribeMercadoPago(websiteId: number, websiteGuid: string) {
  if (!websiteId) {
    toast.add({
      title: "Failed to create website",
      color: "red",
    });
    return;
  }

  try {
    const { data } = await useFetch("/api/mercadopago/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteId,
        websiteGuid,
        plan: formState.plan,
      }),
    });

    // Use production init_point or fallback to sandbox for testing
    const checkoutUrl = data.value?.initPoint || data.value?.sandboxInitPoint;

    if (!checkoutUrl) {
      throw new Error("Failed to create checkout session");
    }

    // Redirect to MercadoPago checkout page
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 100);
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Erro ao criar checkout PIX",
      color: "red",
    });
  }
}

async function subscribeStripe(websiteId: number, websiteGuid: string) {
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
        websiteGuid,
        countryCode,
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
  } catch (error) {
    console.log(error);
  }
}

function closePixModal() {
  isPixPaymentModalOpen.value = false;
  currentWebsiteData.value = null;
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
    let customThemeImageUrl = null;

    // Upload custom theme image to R2 if it exists and is base64
    if (
      event.data.customThemeImage &&
      event.data.customThemeImage.startsWith("data:image")
    ) {
      try {
        const { data: uploadData } = await useFetch<{
          imageUrl: string;
          success: boolean;
        }>("/api/theme/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: event.data.customThemeImage,
            userEmail: googleUserData.value?.user?.email,
          }),
        });

        if (uploadData.value?.imageUrl) {
          customThemeImageUrl = uploadData.value.imageUrl;
        }
      } catch (uploadError) {
        console.error("Failed to upload custom theme image:", uploadError);
        toast.add({
          title: "Failed to upload custom theme image",
          color: "red",
        });
        return;
      }
    } else if (event.data.customThemeImage) {
      // If it's already a URL (not base64), use it as is
      customThemeImageUrl = event.data.customThemeImage;
    }

    const { data, error: websiteError } = await useFetch<{
      body: { websiteId: number; websiteGuid: string };
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
        customThemeImage: customThemeImageUrl,
      },
    });

    const parsedBody = JSON.parse(data.value?.body as any);
    const websiteId = parsedBody.websiteId;
    const websiteGuid = parsedBody.websiteGuid;

    if (websiteError.value?.statusCode === 400) {
      toast.add({
        title: "Você precisa ter uma subscrição ativa para criar o site",
        color: "red",
      });
      return;
    }

    console.log(websiteError.value);

    // Choose payment provider based on country
    if (paymentProvider.value === "mercadopago") {
      await subscribeMercadoPago(websiteId as number, websiteGuid as string);
    } else {
      await subscribeStripe(websiteId as number, websiteGuid as string);
    }

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
  formState.customThemeImage = null;
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
    formState.messages.some(
      (message) => message.message === "" || !message.image
    ) ||
    (formState.theme === "Custom" && !formState.customThemeImage)
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

async function uploadCustomThemeImage(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.add({
        title: "Image too large. Please use an image smaller than 2MB.",
        color: "red",
      });
      return;
    }

    try {
      const base64 = await getBase64(file);

      // Store base64 for preview (just like message images)
      formState.customThemeImage = base64;

      // Trigger theme preview if custom theme is selected
      if (formState.theme === "Custom") {
        theme.customTheme(true, base64);
      }

      toast.add({
        title: "Custom theme image added!",
        color: "green",
      });
    } catch (error) {
      toast.add({
        title: "Failed to load theme image",
        color: "red",
      });
      console.error("Theme image load error:", error);
    }
  }
}

function removeCustomThemeImage() {
  formState.customThemeImage = null;

  // Re-trigger theme preview without custom image
  if (formState.theme === "Custom") {
    theme.start(true);
  }
}
</script>

<style scoped>
/* Enhanced animations from index page */
@keyframes float {
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

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-pulse {
  animation: pulse-soft 3s ease-in-out infinite;
}

/* Mobile-specific optimizations */
@media (max-width: 640px) {
  /* Reduce animation intensity on mobile for better performance */
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 30s linear infinite;
  }

  /* Optimize touch interactions */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Better mobile form styling */
  .group:hover .group-hover\:scale-100 {
    transform: scale(1.02);
  }

  /* Ensure dropdown menus are properly layered on mobile */
  .relative.z-50 {
    z-index: 50 !important;
  }

  .relative.z-40 {
    z-index: 40 !important;
  }

  /* Fix mobile dropdown positioning */
  [data-headlessui-state="open"] {
    z-index: 60 !important;
    position: relative;
  }
}

/* Tablet-specific optimizations */
@media (min-width: 641px) and (max-width: 1024px) {
  .animate-spin-slow {
    animation: spin-slow 25s linear infinite;
  }
}

/* Ensure smooth scrolling */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-spin-slow,
  .animate-pulse {
    animation: none;
  }

  .transition-all,
  .transition-transform,
  .transition-colors,
  .transition-shadow {
    transition: none;
  }
}

/* Enhanced focus states for accessibility */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
  border-radius: 0.375rem;
}

/* Custom gradient backgrounds for better visual hierarchy */
.gradient-bg-1 {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(168, 85, 247, 0.1) 100%
  );
}

.gradient-bg-2 {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.1) 0%,
    rgba(239, 68, 68, 0.1) 100%
  );
}

.gradient-bg-3 {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(37, 99, 235, 0.1) 100%
  );
}

/* Glassmorphism enhancements */
.glass-effect {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-effect-dark {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}
</style>
