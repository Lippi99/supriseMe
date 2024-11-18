export const useThemeStore = defineStore("theme", () => {
  const confetti = getCurrentInstance()?.appContext.config.globalProperties
    .$confetti as any;

  function start() {
    const canvas = document.getElementById("preview");
    adjustCanvasResolution(canvas as HTMLCanvasElement);

    confetti.start({
      defaultType: "circle",
      canvasId: "preview",
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
    });

    setTimeout(() => {
      stop();
    }, 10000);
  }

  function stop() {
    confetti.stop();
  }

  function loveTheme() {
    start();
    confetti.update({
      canvasId: "preview",
      defaultSize: 7,
      defaultDropRate: 7,
      particlesPerFrame: 0.5,
      windSpeedMax: 0,
      particles: [
        {
          type: "heart",
        },
        {
          type: "circle",
        },
      ],
      defaultColors: ["red", "pink", "#ba0000"],
    });
  }

  function snowTheme() {
    start();
    confetti.update({
      canvasId: "preview",
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
    stop,
    loveTheme,
    snowTheme,
  };
});
