import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getCurrentInstance } from 'vue';
import { defineStore } from 'pinia';

const useThemeStore = defineStore("theme", () => {
  var _a;
  const confetti = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties.$confetti;
  function start(preview = false) {
    if (preview) {
      const canvas = (void 0).getElementById("preview");
      if (canvas instanceof HTMLCanvasElement) {
        adjustCanvasResolution(canvas);
        confetti.start({
          canvasId: "preview",
          // Target the specific canvas
          defaultType: "circle",
          defaultSize: 7,
          defaultDropRate: 7,
          particlesPerFrame: 0.5,
          windSpeedMax: 0
        });
      } else {
        console.error("Canvas with id 'preview' not found or invalid.");
      }
    } else {
      confetti.start({
        defaultType: "circle",
        defaultSize: 7,
        defaultDropRate: 7,
        particlesPerFrame: 0.5,
        windSpeedMax: 0
      });
    }
    setTimeout(() => {
      stop();
    }, 1e4);
  }
  function startGlobal(theme) {
    start();
    if (theme === "Christmas") {
      snowTheme(false);
    } else if (theme === "Wedding") {
      loveTheme(false);
    } else if (theme === "Confetti") {
      confettiTheme(false);
    }
  }
  function stop() {
    confetti.stop();
  }
  function loveTheme(preview = false) {
    start(preview);
    confetti.update({
      ...preview && { canvasId: "preview" },
      // Apply only for preview
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
      particles: [{ type: "heart" }, { type: "circle" }],
      defaultColors: ["red", "pink", "#ba0000"]
    });
  }
  function snowTheme(preview = false) {
    start(preview);
    confetti.update({
      ...preview && { canvasId: "preview" },
      // Apply only for preview
      defaultSize: 10,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0.5,
      particles: [
        {
          type: "image",
          url: new URL("../assets/snow.svg", globalThis._importMeta_.url).href
        }
      ]
    });
  }
  function confettiTheme(preview = false) {
    start(preview);
    confetti.update({
      ...preview && { canvasId: "preview" },
      // Apply only for preview
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
      particles: [{ type: "circle" }]
    });
  }
  function adjustCanvasResolution(canvas) {
    const dpr = (void 0).devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    canvas.style.width = `${canvas.clientWidth}px`;
    canvas.style.height = `${canvas.clientHeight}px`;
    const context = canvas.getContext("2d");
    if (context) {
      context.scale(dpr, dpr);
    }
  }
  return {
    start,
    startGlobal,
    stop,
    loveTheme,
    snowTheme
  };
});

export { useThemeStore as u };
//# sourceMappingURL=useTheme-3OI58Mb0.mjs.map
