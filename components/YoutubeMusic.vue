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
const videoTitle = computed(() => {
  if (!videoId.value) return 'YouTube Video';
  return `YouTube Video (${videoId.value})`;
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
    params.set('autoplay', isPlaying.value ? '1' : '0');
    params.set('controls', '0');
  } else {
    params.set('controls', '1');
  }
  
  params.set('modestbranding', '1');
  params.set('rel', '0');
  params.set('iv_load_policy', '3');
  params.set('disablekb', '1');
  
  return `${baseUrl}?${params.toString()}`;
});

// Auto-fallback if URL provided but no video ID detected
watch(() => props.url, (newUrl) => {
  if (newUrl && !videoId.value) {
    showFallback.value = true;
  } else {
    showFallback.value = false;
  }
}, { immediate: true });

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
  window.open(props.url, '_blank');
}

function playInNewTab() {
  // Open with timestamp if available
  const url = props.url.includes('t=') ? props.url : `${props.url}&autoplay=1`;
  window.open(url, '_blank');
}
</script>

<template>
  <div>
    <!-- Show when URL is detected -->
    <div v-if="props.url && (videoId || showFallback)" class="w-full max-w-md mx-auto mt-4">
      
      <!-- Try to show embedded player first (for valid YouTube URLs) -->
      <div v-if="videoId && !props.isDetail" class="mb-4">
        <!-- Video thumbnail with play overlay -->
        <div class="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            v-if="thumbnailUrl"
            :src="thumbnailUrl" 
            :alt="videoTitle"
            class="w-full h-full object-cover"
            @error="() => {}"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <button 
              @click="playInNewTab"
              class="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-colors"
            >
              <UIcon name="i-heroicons-play-solid" class="w-8 h-8" />
            </button>
          </div>
        </div>
        
        <!-- Video info -->
        <div class="mt-3 text-center">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ videoTitle }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to play on YouTube</p>
        </div>
      </div>

      <!-- Fallback for invalid URLs or general links -->
      <div v-if="showFallback || !videoId" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
        <UIcon name="i-heroicons-link" class="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">External Link Detected</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
          This appears to be a link. Click below to open it.
        </p>
        <UButton @click="openYouTubeDirectly" color="blue" size="sm">
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 mr-2" />
          Open Link
        </UButton>
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

    <!-- Audio player controls for detail view -->
    <div v-if="props.isDetail && isPlaying && videoId" class="fixed bottom-4 right-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center gap-3">
        <UIcon name="i-heroicons-musical-note" class="w-5 h-5 text-blue-500" />
        <div>
          <p class="text-sm font-medium">Playing Audio</p>
          <p class="text-xs text-gray-500">YouTube track</p>
        </div>
        <UButton @click="stopMusic" size="xs" color="red" variant="ghost">
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <!-- Consent Modal for Detail View -->
    <UModal v-if="props.isDetail" v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="text-center">
            <UIcon name="i-heroicons-musical-note" class="w-12 h-12 mx-auto mb-2 text-blue-500" />
            <h1 class="text-2xl font-bold">Play Music?</h1>
          </div>
        </template>

        <div class="text-center py-4">
          <p class="mb-4">
            This page includes a YouTube track. Would you like to play the music in the background?
          </p>
          <div v-if="thumbnailUrl" class="mb-4">
            <img 
              :src="thumbnailUrl" 
              :alt="videoTitle"
              class="w-32 h-18 object-cover rounded mx-auto"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex gap-3 flex-col">
            <UButton @click="playMusic" block color="green">
              <UIcon name="i-heroicons-play" class="w-4 h-4 mr-2" />
              Play music
            </UButton>
            <UButton @click="dontPlay" block variant="ghost">
              Don't play
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
