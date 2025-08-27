<template>
  <!-- Modern iPhone-like phone frame -->
  <div
    class="relative mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl"
    style="width: 280px; height: 580px"
  >
    <!-- Phone bezel/frame -->
    <div class="relative w-full h-full bg-black rounded-[2rem] p-1">
      <!-- Screen -->
      <div
        class="relative w-full h-full bg-white rounded-[1.75rem] overflow-hidden"
      >
        <!-- Dynamic Island / Notch -->
        <div class="absolute top-2 left-1/2 transform -translate-x-1/2 z-50">
          <div
            class="w-24 h-6 bg-black rounded-full flex items-center justify-center"
          >
            <!-- Speaker grille -->
            <div class="w-12 h-1 bg-gray-800 rounded-full opacity-40"></div>
          </div>
        </div>

        <!-- Status bar -->
        <div
          class="absolute top-0 left-0 right-0 h-12 bg-white flex items-center justify-between px-6 pt-2 z-40"
        >
          <div class="flex items-center gap-1 text-black text-sm font-medium">
            <span>9:41</span>
          </div>
          <div class="flex items-center gap-1">
            <!-- Signal bars -->
            <div class="flex gap-0.5">
              <div class="w-1 h-2 bg-black rounded-full"></div>
              <div class="w-1 h-3 bg-black rounded-full"></div>
              <div class="w-1 h-4 bg-black rounded-full"></div>
              <div class="w-1 h-3 bg-gray-400 rounded-full"></div>
            </div>
            <!-- WiFi icon -->
            <svg
              class="w-4 h-4 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.166 4.999c1.515-1.287 3.473-2 5.834-2 2.36 0 4.318.713 5.834 2l1.166-1.166C13.747.833 10.986 0 8 0S2.253.833 1 1.833L2.166 4.999z"
              />
              <path
                d="M4.5 7.5c.97-.747 2.2-1.167 3.5-1.167s2.53.42 3.5 1.167L12.5 6.5C11.253 5.42 9.693 5 8 5s-3.253.42-4.5 1.5L4.5 7.5z"
              />
              <circle cx="8" cy="12" r="2" />
            </svg>
            <!-- Battery -->
            <div class="w-6 h-3 border border-black rounded-sm ml-1 relative">
              <div class="absolute inset-0.5 bg-green-500 rounded-sm"></div>
              <div
                class="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-r-sm"
              ></div>
            </div>
          </div>
        </div>

        <!-- Content area with scroll -->
        <div
          class="absolute top-12 left-0 right-0 bottom-8 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-blue-950"
        >
          <ThemeConfetti
            :images="form.messages?.map((m) => m.image).filter(Boolean) || []"
          >
            <!-- Website Header (matching actual website) -->
            <header class="relative z-10 pt-4 pb-4 px-2">
              <div class="text-center">
                <div class="inline-block">
                  <h1
                    class="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2"
                  >
                    {{ form.name || "Your Name" }}
                  </h1>
                  <div
                    class="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 mx-auto"
                  ></div>
                </div>
              </div>
            </header>

            <!-- Messages Section (matching actual website) -->
            <div class="relative z-10 px-2 pb-4">
              <div
                v-for="(message, index) in form.messages || []"
                :key="index"
                class="mb-12 last:mb-4"
              >
                <!-- Photo Container (matching PolaroidPhoto style) -->
                <div v-if="message.image" class="flex justify-center mb-4">
                  <div class="relative group/photo">
                    <!-- Shadow/Glow Effect -->
                    <div
                      class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-sm opacity-25"
                    ></div>

                    <!-- Polaroid-style Frame -->
                    <div class="relative bg-white rounded-xl p-2 shadow-lg">
                      <NuxtPicture
                        class="w-full max-w-[120px] rounded-lg h-auto"
                        :img-attrs="{
                          alt: 'Message image',
                          style:
                            'width: 100%; height: auto; object-fit: cover;',
                        }"
                        :src="message.image"
                      />

                      <!-- Floating Number Badge -->
                      <div
                        class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      >
                        {{ index + 1 }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Decorative Divider (matching website style) -->
                <div
                  class="flex items-center justify-center mb-4"
                  v-if="message.image"
                >
                  <div
                    class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
                  ></div>
                  <div class="mx-2">
                    <div
                      class="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    ></div>
                  </div>
                  <div
                    class="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"
                  ></div>
                </div>

                <!-- Message Content (matching website blockquote style) -->
                <div v-if="message.message" class="max-w-xs mx-auto px-2">
                  <div class="relative">
                    <!-- Quote Marks -->
                    <div
                      class="absolute -top-1 -left-1 text-lg text-purple-300/50 font-serif leading-none"
                    >
                      "
                    </div>
                    <div
                      class="absolute -bottom-2 -right-1 text-lg text-purple-300/50 font-serif leading-none"
                    >
                      "
                    </div>

                    <!-- Message Text -->
                    <blockquote
                      class="relative text-xs text-center leading-relaxed text-gray-200 font-medium italic p-3"
                    >
                      {{ message.message }}
                    </blockquote>
                  </div>
                </div>
              </div>

              <!-- End Decoration (matching website) -->
              <div
                v-if="form.messages && form.messages.length > 0"
                class="text-center mt-8"
              >
                <div class="inline-flex items-center space-x-1 text-purple-500">
                  <div class="w-1 h-1 rounded-full bg-current"></div>
                  <div class="w-1 h-1 rounded-full bg-current"></div>
                  <div class="w-1 h-1 rounded-full bg-current"></div>
                </div>
                <p class="mt-2 text-gray-400 text-xs">
                  Made with 💜 on SurpriseMe
                </p>
              </div>

              <!-- Placeholder when no messages -->
              <div
                v-if="!form.messages || form.messages.length === 0"
                class="text-center py-8"
              >
                <div
                  class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-purple-300/50"
                >
                  <div class="text-purple-300/70 mb-2">
                    <svg
                      class="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p class="text-purple-200/80 text-sm">
                    Add messages to see preview
                  </p>
                </div>
              </div>
            </div>
          </ThemeConfetti>
        </div>

        <!-- Home indicator -->
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div class="w-32 h-1 bg-black rounded-full opacity-30"></div>
        </div>
      </div>
    </div>

    <!-- Side buttons -->
    <!-- Volume buttons -->
    <div class="absolute left-0 top-24 w-1 h-8 bg-gray-700 rounded-r-md"></div>
    <div class="absolute left-0 top-36 w-1 h-8 bg-gray-700 rounded-r-md"></div>

    <!-- Power button -->
    <div
      class="absolute right-0 top-32 w-1 h-12 bg-gray-700 rounded-l-md"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  form: {
    type: Object,
    required: true,
  },
});
</script>
