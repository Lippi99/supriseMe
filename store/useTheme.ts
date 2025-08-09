export const useThemeStore = defineStore("theme", () => {
  const confetti = getCurrentInstance()?.appContext.config.globalProperties
    .$confetti as any;

  function start(preview: boolean = false) {
    if (preview) {
      const canvas = document.getElementById("preview");

      if (canvas instanceof HTMLCanvasElement) {
        adjustCanvasResolution(canvas);
        confetti.start({
          canvasId: "preview", // Target the specific canvas
          defaultType: "circle",
          defaultSize: 7,
          defaultDropRate: 7,
          particlesPerFrame: 0.5,
          windSpeedMax: 0,
        });
      } else {
        console.error("Canvas with id 'preview' not found or invalid.");
      }
    } else {
      // Use the global canvas for full-screen animation
      confetti.start({
        defaultType: "circle",
        defaultSize: 7,
        defaultDropRate: 7,
        particlesPerFrame: 0.5,
        windSpeedMax: 0,
      });
    }

    setTimeout(() => {
      stop();
    }, 10000);
  }

  function startGlobal(theme: string, customThemeImage?: string) {
    start(); // Start with global confetti

    if (theme === "Christmas") {
      snowTheme(false);
    } else if (theme === "Wedding") {
      loveTheme(false);
    } else if (theme === "Custom" && customThemeImage) {
      customTheme(false, customThemeImage);
    } else if (theme === "Confetti") {
      confettiTheme(false);
    }
  }

  function stop() {
    confetti.stop();
  }

  function loveTheme(preview: boolean = false) {
    start(preview);
    confetti.update({
      ...(preview && { canvasId: "preview" }), // Apply only for preview
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
      particles: [{ type: "heart" }, { type: "circle" }],
      defaultColors: ["red", "pink", "#ba0000"],
    });
  }

  function snowTheme(preview: boolean = false) {
    start(preview);
    confetti.update({
      ...(preview && { canvasId: "preview" }), // Apply only for preview
      defaultSize: 10,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0.5,
      particles: [
        {
          type: "image",
          url: new URL("../assets/snow.svg", import.meta.url).href,
        },
      ],
    });
  }

  function confettiTheme(preview: boolean = false) {
    start(preview);
    confetti.update({
      ...(preview && { canvasId: "preview" }), // Apply only for preview
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
      particles: [{ type: "circle" }],
    });
  }

  function customTheme(preview: boolean = false, imageUrl: string) {
    start(preview);
    confetti.update({
      ...(preview && { canvasId: "preview" }), // Apply only for preview
      defaultSize: 10,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0.5,
      particles: [
        {
          type: "image",
          url: imageUrl,
        },
      ],
    });
  }

  function adjustCanvasResolution(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
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
    snowTheme,
    customTheme,
  };
});
