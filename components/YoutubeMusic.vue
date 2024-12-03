<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

const { onLoaded } = useScriptYouTubePlayer({});

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

const video = ref<HTMLDivElement | null>(null);
const player = ref<YT.Player | null>(null);
const isPlayerReady = ref(false);
const isOpen = ref(true);

// Extract video ID from YouTube URL
const videoId = computed(() => {
  const match = props.url.match(/(?:v=|\/v\/|youtu\.be\/|\/embed\/)([^&?/]+)/);
  return match ? match[1] : null;
});

onLoaded(async ({ YT }: any) => {
  const YouTube = await YT;
  await new Promise<void>((resolve) => {
    if (typeof YT.Player === "undefined") YouTube.ready(resolve);
    else resolve();
  });

  if (!props.isDetail) {
    player.value = new YT.Player(video.value, {
      videoId: videoId.value,
    });
  } else {
    player.value = new YT.Player(video.value, {
      videoId: videoId.value,
      playerVars: {
        autoplay: 1,
        mute: 1,
      },
    });
  }
});

watch(
  () => props.url,
  () => {
    const id = videoId.value;
    if (player.value && id) {
      player.value.loadVideoById(id);
      if (isPlayerReady.value) {
        player.value.playVideo();
      }
    }
  }
);

// Play function
function play() {
  if (video) {
    player.value?.playVideo();
    player.value?.unMute();
    isOpen.value = false;
  }
}
</script>

<template>
  <div>
    <div class="hidden" ref="video"></div>

    <UModal v-if="props.isDetail" v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h1 class="text-center text-3xl">Activate song</h1>
        </template>

        <p>
          For consentiment purpose, we would like to ask your permission to play
          the song provided by the website creator. Would you like to play the
          song?
        </p>

        <template #footer>
          <div class="flex gap-5 flex-col">
            <UButton @click="play" block color="green"> Yes </UButton>
            <UButton @click="isOpen = false" block color="red"> No </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
