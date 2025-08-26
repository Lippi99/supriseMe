<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  isDetail: {
    type: Boolean,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const isOpen = ref(true);
const isPlaying = ref(false);
const showFallback = ref(false);

// Extract video ID from YouTube URL
const videoId = computed(() => {
  if (!props.url) return null;
  const match = props.url.match(/(?:v=|\/v\/|youtu\.be\/|\/embed\/)([^&?/]+)/);
  return match ? match[1] : null;
});

// Extract video title from URL (basic approach)
const { t } = useI18n();
const videoTitle = computed(() => {
  if (!videoId.value) return t("youtubeMusic.youtubeVideo");
  return `${t("youtubeMusic.youtubeVideo")} (${videoId.value})`;
});

// Generate YouTube thumbnail URL
const thumbnailUrl = computed(() => {
  if (!videoId.value) return null;
  return `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg`;
});

// Generate YouTube nocookie embed URL (more likely to work with ad blockers)
const embedUrl = computed(() => {
  if (!videoId.value) return null;

  const baseUrl = `https://www.youtube-nocookie.com/embed/${videoId.value}`;
  const params = new URLSearchParams();

  if (props.isDetail) {
    params.set("autoplay", isPlaying.value ? "1" : "0");
    params.set("controls", "0");
  } else {
    params.set("controls", "1");
  }

  params.set("modestbranding", "1");
  params.set("rel", "0");
  params.set("iv_load_policy", "3");
  params.set("disablekb", "1");

  return `${baseUrl}?${params.toString()}`;
});

// Auto-fallback if URL provided but no video ID detected
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl && !videoId.value) {
      showFallback.value = true;
    } else {
      showFallback.value = false;
    }
  },
  { immediate: true }
);

// Play function - plays audio in hidden iframe
function playMusic() {
  isOpen.value = false;
  isPlaying.value = true;
}

function dontPlay() {
  isOpen.value = false;
  isPlaying.value = false;
}

function stopMusic() {
  isPlaying.value = false;
  isOpen.value = true;
}

function openYouTubeDirectly() {
  window.open(props.url, "_blank");
}

function playInNewTab() {
  // Open with timestamp if available
  const url = props.url.includes("t=") ? props.url : `${props.url}&autoplay=1`;
  window.open(url, "_blank");
}
</script>

<template>
  <div>
    <!-- Show when URL is detected -->
    <div
      v-if="props.url && (videoId || showFallback)"
      class="w-full max-w-md mx-auto mt-4"
    >
      <!-- Enhanced YouTube player preview (for valid YouTube URLs) -->
      <div v-if="videoId && !props.isDetail" class="mb-4">
        <div class="relative group">
          <!-- Glow effect background -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-2xl blur-sm scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <!-- Main video card -->
          <div
            class="relative bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300"
          >
            <!-- Video thumbnail with enhanced play overlay -->
            <div
              class="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
            >
              <img
                v-if="thumbnailUrl"
                :src="thumbnailUrl"
                :alt="videoTitle"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                @error="() => {}"
              />

              <!-- Play overlay with enhanced styling -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center"
              >
                <button
                  @click="playInNewTab"
                  class="group/play bg-red-600 hover:bg-red-700 text-white rounded-full p-4 sm:p-5 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-red-500/25"
                >
                  <UIcon
                    name="i-heroicons-play-solid"
                    class="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover/play:scale-110"
                  />
                </button>

                <!-- YouTube logo -->
                <div
                  class="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold"
                >
                  YouTube
                </div>
              </div>
            </div>

            <!-- Enhanced video info -->
            <div class="mt-4 space-y-2">
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-musical-note"
                  class="w-4 h-4 text-red-500 flex-shrink-0"
                />
                <p
                  class="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate"
                >
                  {{ $t("youtubeMusic.backgroundMusicTrack") }}
                </p>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {{ $t("youtubeMusic.clickToPlayOnYoutube") }}
                </p>
                <div
                  class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                >
                  <UIcon
                    name="i-heroicons-arrow-top-right-on-square"
                    class="w-3 h-3"
                  />
                  <span>{{ $t("youtubeMusic.external") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced fallback for invalid URLs or general links -->
      <div v-if="showFallback || !videoId" class="relative group">
        <!-- Glow effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl blur-sm scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        <div
          class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300"
        >
          <div class="space-y-4">
            <!-- Icon with background -->
            <div
              class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full"
            >
              <UIcon
                name="i-heroicons-link"
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
              />
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <h3
                class="text-base font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ $t("youtubeMusic.externalLinkDetected") }}
              </h3>
              <p
                class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {{ $t("youtubeMusic.externalLinkDescription") }}
              </p>
            </div>

            <!-- Action button -->
            <UButton
              @click="openYouTubeDirectly"
              color="blue"
              size="md"
              class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <UIcon
                name="i-heroicons-arrow-top-right-on-square"
                class="w-4 h-4 mr-2"
              />
              {{ $t("youtubeMusic.openLink") }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden iframe for audio playback -->
    <div v-if="props.isDetail && isPlaying && embedUrl" class="hidden">
      <iframe
        :src="embedUrl"
        width="1"
        height="1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <!-- Enhanced audio player controls for detail view -->
    <div
      v-if="props.isDetail && isPlaying && videoId"
      class="fixed bottom-4 right-4 z-50"
    >
      <div
        class="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 flex items-center gap-4 min-w-[280px] transform hover:scale-105 transition-all duration-300"
      >
        <!-- Animated music icon -->
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-20"
          ></div>
          <div
            class="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 shadow-lg"
          >
            <UIcon
              name="i-heroicons-musical-note"
              class="w-5 h-5 text-white animate-bounce"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {{ $t("youtubeMusic.nowPlaying") }}
            </p>
            <div class="flex gap-1">
              <div class="w-1 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                class="w-1 h-2 bg-purple-500 rounded-full animate-pulse"
                style="animation-delay: 0.1s"
              ></div>
              <div
                class="w-1 h-4 bg-blue-400 rounded-full animate-pulse"
                style="animation-delay: 0.2s"
              ></div>
            </div>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ $t("youtubeMusic.backgroundSoundtrack") }}
          </p>
        </div>

        <!-- Close button -->
        <UButton
          @click="stopMusic"
          size="sm"
          color="red"
          variant="soft"
          class="rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 group-hover:scale-110"
        >
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <!-- Enhanced Consent Modal for Detail View -->
    <UModal
      v-if="props.isDetail"
      v-model="isOpen"
      prevent-close
      :ui="{
        container:
          'flex min-h-full items-center justify-center p-4 text-center sm:p-0',
        padding: 'p-0',
        width: 'w-full max-w-md sm:max-w-lg',
      }"
    >
      <UCard
        :ui="{
          ring: 'ring-1 ring-blue-200/50 dark:ring-blue-800/50',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          shadow: 'shadow-2xl',
          background: 'bg-white/95 dark:bg-gray-900/95',
          backdrop: 'backdrop-blur-xl',
          rounded: 'rounded-2xl sm:rounded-3xl',
          body: {
            padding: 'p-4 sm:p-6 lg:p-8',
          },
          header: {
            padding: 'px-4 py-4 sm:px-6 sm:py-6',
          },
          footer: {
            padding: 'px-4 py-4 sm:px-6 sm:py-6',
          },
        }"
        class="mx-auto my-8 overflow-hidden w-full"
      >
        <template #header>
          <div class="text-center space-y-4">
            <!-- Music Icon with gradient background -->
            <div
              class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4 relative"
            >
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse opacity-75"
              ></div>
              <UIcon
                name="i-heroicons-musical-note"
                class="relative w-10 h-10 text-white"
              />
            </div>

            <!-- Title with gradient text -->
            <h1
              class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {{ $t("youtubeMusic.playMusicTitle") }}
            </h1>

            <!-- Subtitle -->
            <p
              class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto"
            >
              {{ $t("youtubeMusic.specialSoundtrack") }}
            </p>
          </div>
        </template>

        <div class="text-center space-y-6">
          <!-- Enhanced description -->
          <div class="space-y-3">
            <p
              class="text-base sm:text-lg text-gray-800 dark:text-gray-200 font-medium"
            >
              {{ $t("youtubeMusic.backgroundMusicAvailable") }}
            </p>
            <p
              class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {{ $t("youtubeMusic.backgroundMusicDescription") }}
            </p>
          </div>

          <!-- Video thumbnail with enhanced styling -->
          <div v-if="thumbnailUrl" class="relative inline-block">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl blur-sm scale-110"
            ></div>
            <div
              class="relative bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg"
            >
              <img
                :src="thumbnailUrl"
                :alt="videoTitle"
                class="w-48 h-28 sm:w-56 sm:h-32 object-cover rounded-lg shadow-md"
                @error="() => {}"
              />
              <!-- Play overlay -->
              <div
                class="absolute inset-2 rounded-lg bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-play-solid"
                    class="w-6 h-6 text-gray-800 ml-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Music info card -->
          <div
            class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50"
          >
            <div
              class="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400"
            >
              <UIcon name="i-heroicons-speaker-wave" class="w-5 h-5" />
              <span>{{ $t("youtubeMusic.audioPlaysSoftly") }}</span>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="space-y-3">
            <!-- Play button with enhanced styling -->
            <UButton
              @click="playMusic"
              block
              size="lg"
              class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 py-4"
            >
              <UIcon name="i-heroicons-play-solid" class="w-5 h-5 mr-3" />
              {{ $t("youtubeMusic.yesPlayMusic") }}
            </UButton>

            <!-- Skip button -->
            <UButton
              @click="dontPlay"
              block
              variant="outline"
              color="gray"
              size="lg"
              class="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 py-4"
            >
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5 mr-3" />
              {{ $t("youtubeMusic.continueWithoutMusic") }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
