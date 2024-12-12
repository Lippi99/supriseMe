import { _ as __nuxt_component_0, b as __nuxt_component_1 } from './Card-B89ElPpR.mjs';
import { _ as __nuxt_component_2 } from './_base-Bra_Wjlx.mjs';
import { useSSRContext, defineComponent, ref, computed, watch, withCtx, createVNode, createTextVNode, reactive } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { c as defu } from '../_/nitro.mjs';
import { resolveScriptKey } from 'unhead';
import { b as useNuxtApp, n as injectHead, p as useScript$1, k as useRuntimeConfig, q as parseURL, u as useHead } from './server.mjs';

const onNuxtReady = (callback) => {
  {
    return;
  }
};
function useNuxtScriptRuntimeConfig() {
  return useRuntimeConfig().public["nuxt-scripts"];
}
const ValidPreloadTriggers = ["onNuxtReady", "client"];
const PreconnectServerModes = ["preconnect", "dns-prefetch"];
function warmup(_, rel, head) {
  const { src } = _;
  const $url = parseURL(src);
  const isPreconnect = rel && PreconnectServerModes.includes(rel);
  const href = isPreconnect ? `${$url.protocol}${$url.host}` : src;
  const isCrossOrigin = !!$url.host;
  if (!rel || isPreconnect && !isCrossOrigin) {
    return;
  }
  const link = {
    href,
    rel,
    ...pick(_, [
      // shared keys between script and link
      "crossorigin",
      "referrerpolicy",
      "fetchpriority",
      "integrity"
      // ignore id
    ])
  };
  const defaults = { fetchpriority: "low" };
  if (rel === "preload") {
    defaults.as = "script";
  }
  if (isCrossOrigin) {
    defaults.crossorigin = "anonymous";
    defaults.referrerpolicy = "no-referrer";
  }
  return useHead({ link: [defu(link, defaults)] }, { head, tagPriority: "high" });
}
function useScript(input, options) {
  var _a, _b;
  input = typeof input === "string" ? { src: input } : input;
  options = defu(options, (_a = useNuxtScriptRuntimeConfig()) == null ? void 0 : _a.defaultScriptOptions);
  const id = String(resolveScriptKey(input));
  const nuxtApp = useNuxtApp();
  const head = options.head || injectHead();
  nuxtApp.$scripts = nuxtApp.$scripts || reactive({});
  !!((_b = nuxtApp.$scripts) == null ? void 0 : _b[id]);
  if (!options.warmupStrategy && ValidPreloadTriggers.includes(String(options.trigger))) {
    options.warmupStrategy = "preload";
  }
  if (options.trigger === "onNuxtReady") {
    options.trigger = onNuxtReady;
  }
  const instance = useScript$1(input, options);
  instance.warmup = (rel) => {
    if (!instance._warmupEl) {
      instance._warmupEl = warmup(input, rel, head);
    }
  };
  if (options.warmupStrategy) {
    instance.warmup(options.warmupStrategy);
  }
  const _remove = instance.remove;
  instance.remove = () => {
    var _a2;
    (_a2 = instance._warmupEl) == null ? void 0 : _a2.dispose();
    nuxtApp.$scripts[id] = void 0;
    return _remove();
  };
  nuxtApp.$scripts[id] = instance;
  return instance;
}
function scriptRuntimeConfig(key) {
  return (useRuntimeConfig().public.scripts || {})[key];
}
function useRegistryScript(registryKey, optionsFn, _userOptions) {
  const scriptConfig = scriptRuntimeConfig(registryKey);
  const userOptions = Object.assign(_userOptions || {}, typeof scriptConfig === "object" ? scriptConfig : {});
  const options = optionsFn(userOptions);
  const scriptInput = defu(userOptions.scriptInput, options.scriptInput, { key: registryKey });
  const scriptOptions = Object.assign((userOptions == null ? void 0 : userOptions.scriptOptions) || {}, options.scriptOptions || {});
  const init = scriptOptions.beforeInit;
  scriptOptions.beforeInit = () => {
    init == null ? void 0 : init();
  };
  return useScript(scriptInput, scriptOptions);
}
function pick(obj, keys) {
  const res = {};
  for (const k of keys) {
    if (k in obj) {
      res[k] = obj[k];
    }
  }
  return res;
}
function useScriptYouTubePlayer(_options) {
  let readyPromise = Promise.resolve();
  const instance = useRegistryScript("youtubePlayer", () => ({
    scriptInput: {
      src: "https://www.youtube.com/iframe_api",
      crossorigin: false
      // crossorigin can't be set or it breaks
    },
    scriptOptions: {
      use() {
        return {
          YT: (void 0).YT || readyPromise.then(() => {
            return (void 0).YT;
          })
        };
      }
    },
    clientInit: void 0
  }), _options);
  return instance;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "YoutubeMusic",
  __ssrInlineRender: true,
  props: {
    isDetail: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const { onLoaded } = useScriptYouTubePlayer({});
    const props = __props;
    const video = ref(null);
    const player = ref(null);
    const isPlayerReady = ref(false);
    const isOpen = ref(true);
    const videoId = computed(() => {
      const match = props.url.match(/(?:v=|\/v\/|youtu\.be\/|\/embed\/)([^&?/]+)/);
      return match ? match[1] : null;
    });
    onLoaded(async ({ YT }) => {
      const YouTube = await YT;
      await new Promise((resolve) => {
        if (typeof YT.Player === "undefined") YouTube.ready(resolve);
        else resolve();
      });
      if (!props.isDetail) {
        player.value = new YT.Player(video.value, {
          videoId: videoId.value
        });
      } else {
        player.value = new YT.Player(video.value, {
          videoId: videoId.value,
          playerVars: {
            autoplay: 1,
            mute: 1
          }
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
    function play() {
      var _a, _b;
      if (video) {
        (_a = player.value) == null ? void 0 : _a.playVideo();
        (_b = player.value) == null ? void 0 : _b.unMute();
        isOpen.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = __nuxt_component_0;
      const _component_UCard = __nuxt_component_1;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="hidden"></div>`);
      if (props.isDetail) {
        _push(ssrRenderComponent(_component_UModal, {
          modelValue: isOpen.value,
          "onUpdate:modelValue": ($event) => isOpen.value = $event,
          "prevent-close": ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UCard, { ui: {
                ring: "",
                divide: "divide-y divide-gray-100 dark:divide-gray-800"
              } }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h1 class="text-center text-3xl"${_scopeId2}>Activate song</h1>`);
                  } else {
                    return [
                      createVNode("h1", { class: "text-center text-3xl" }, "Activate song")
                    ];
                  }
                }),
                footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex gap-5 flex-col"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      onClick: play,
                      block: "",
                      color: "green"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Yes `);
                        } else {
                          return [
                            createTextVNode(" Yes ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      onClick: ($event) => isOpen.value = false,
                      block: "",
                      color: "red"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` No `);
                        } else {
                          return [
                            createTextVNode(" No ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-5 flex-col" }, [
                        createVNode(_component_UButton, {
                          onClick: play,
                          block: "",
                          color: "green"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Yes ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          onClick: ($event) => isOpen.value = false,
                          block: "",
                          color: "red"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" No ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p${_scopeId2}> For consentiment purpose, we would like to ask your permission to play the song provided by the website creator. Would you like to play the song? </p>`);
                  } else {
                    return [
                      createVNode("p", null, " For consentiment purpose, we would like to ask your permission to play the song provided by the website creator. Would you like to play the song? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UCard, { ui: {
                  ring: "",
                  divide: "divide-y divide-gray-100 dark:divide-gray-800"
                } }, {
                  header: withCtx(() => [
                    createVNode("h1", { class: "text-center text-3xl" }, "Activate song")
                  ]),
                  footer: withCtx(() => [
                    createVNode("div", { class: "flex gap-5 flex-col" }, [
                      createVNode(_component_UButton, {
                        onClick: play,
                        block: "",
                        color: "green"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Yes ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UButton, {
                        onClick: ($event) => isOpen.value = false,
                        block: "",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" No ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode("p", null, " For consentiment purpose, we would like to ask your permission to play the song provided by the website creator. Would you like to play the song? ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/YoutubeMusic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=YoutubeMusic-Cw6rc-DI.mjs.map
