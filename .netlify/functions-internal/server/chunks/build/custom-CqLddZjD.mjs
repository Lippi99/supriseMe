import { _ as __nuxt_component_0$2 } from "./NuxtLinkLocale-BOasW2dX.mjs";
import { _ as _sfc_main$5 } from "./NuxtImg-DhqLMSvk.mjs";
import { a as useFetch, _ as __nuxt_component_2$1 } from "./_base-Bra_Wjlx.mjs";
import {
  b as useUI,
  k as arrow,
  _ as __nuxt_component_3,
} from "./Icon-DrNIFf4I.mjs";
import {
  _ as __nuxt_component_0$1,
  b as __nuxt_component_1,
} from "./Card-B89ElPpR.mjs";
import {
  defineComponent,
  toRef,
  computed,
  useSSRContext,
  ref,
  useSlots,
  withAsyncContext,
  reactive,
  withCtx,
  createVNode,
  toDisplayString,
  createTextVNode,
  unref,
  openBlock,
  createBlock,
  Fragment,
  renderList,
  createCommentVNode,
  mergeProps,
} from "vue";
import { twMerge, twJoin } from "tailwind-merge";
import {
  m as mergeConfig,
  a as appConfig,
  c as useAuth,
  h as useI18n,
  k as useRuntimeConfig,
} from "./server.mjs";
import {
  ssrRenderComponent,
  ssrInterpolate,
  ssrRenderList,
  ssrRenderAttr,
  ssrRenderSlot,
  ssrRenderAttrs,
  ssrRenderClass,
} from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.mjs";
import { c as defu } from "../_/nitro.mjs";
import {
  u as usePopper,
  b as useClientStripe,
  a as useToast,
  c as __nuxt_component_5,
} from "./useClientStripe-J-UZ3wJ2.mjs";
import { _ as _sfc_main$6 } from "./Footer-CbkdQFyU.mjs";
import "./nuxt-link-fsWtB8P8.mjs";
import "./index-DZrM-LkX.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "node:http";
import "node:https";
import "requrl";
import "@iconify/utils";
import "consola/core";
import "node:fs";
import "node:path";
import "node:url";
import "ipx";
import "pinia";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "@vueuse/core";
import "@stripe/stripe-js";

const kbd = {
  base: "inline-flex items-center justify-center text-gray-900 dark:text-white",
  padding: "px-1",
  size: {
    xs: "h-4 min-w-[16px] text-[10px]",
    sm: "h-5 min-w-[20px] text-[11px]",
    md: "h-6 min-w-[24px] text-[12px]",
  },
  rounded: "rounded",
  font: "font-medium font-sans",
  background: "bg-gray-100 dark:bg-gray-800",
  ring: "ring-1 ring-gray-300 dark:ring-gray-700 ring-inset",
  default: {
    size: "sm",
  },
};
const tooltip = {
  wrapper: "relative inline-flex",
  container: "z-20 group",
  width: "max-w-xs",
  background: "bg-white dark:bg-gray-900",
  color: "text-gray-900 dark:text-white",
  shadow: "shadow",
  rounded: "rounded",
  ring: "ring-1 ring-gray-200 dark:ring-gray-800",
  base: "[@media(pointer:coarse)]:hidden h-6 px-2 py-1 text-xs font-normal truncate relative",
  shortcuts: "hidden md:inline-flex flex-shrink-0 gap-0.5",
  middot: "mx-1 text-gray-700 dark:text-gray-200",
  // Syntax for `<Transition>` component https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  transition: {
    enterActiveClass: "transition ease-out duration-200",
    enterFromClass: "opacity-0 translate-y-1",
    enterToClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transition ease-in duration-150",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 translate-y-1",
  },
  popper: {
    strategy: "fixed",
  },
  default: {
    openDelay: 0,
    closeDelay: 0,
  },
  arrow: {
    ...arrow,
    base: "[@media(pointer:coarse)]:hidden invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2",
  },
};
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.kbd, kbd);
const _sfc_main$4 = defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: () => config$1.default.size,
      validator(value) {
        return Object.keys(config$1.size).includes(value);
      },
    },
    class: {
      type: [String, Object, Array],
      default: () => "",
    },
    ui: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { ui, attrs } = useUI("kbd", toRef(props, "ui"), config$1);
    const kbdClass = computed(() => {
      return twMerge(
        twJoin(
          ui.value.base,
          ui.value.size[props.size],
          ui.value.padding,
          ui.value.rounded,
          ui.value.font,
          ui.value.background,
          ui.value.ring
        ),
        props.class
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      kbdClass,
    };
  },
});
function _sfc_ssrRender$2(
  _ctx,
  _push,
  _parent,
  _attrs,
  $props,
  $setup,
  $data,
  $options
) {
  _push(
    `<kbd${ssrRenderAttrs(
      mergeProps({ class: _ctx.kbdClass }, _ctx.attrs, _attrs)
    )}>`
  );
  ssrRenderSlot(
    _ctx.$slots,
    "default",
    {},
    () => {
      _push(`${ssrInterpolate(_ctx.value)}`);
    },
    _push,
    _parent
  );
  _push(`</kbd>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "node_modules/@nuxt/ui/dist/runtime/components/elements/Kbd.vue"
  );
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
  ["ssrRender", _sfc_ssrRender$2],
]);
const config = mergeConfig(
  appConfig.ui.strategy,
  appConfig.ui.tooltip,
  tooltip
);
const _sfc_main$3 = defineComponent({
  components: {
    UKbd: __nuxt_component_0,
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: null,
    },
    prevent: {
      type: Boolean,
      default: false,
    },
    shortcuts: {
      type: Array,
      default: () => [],
    },
    openDelay: {
      type: Number,
      default: () => config.default.openDelay,
    },
    closeDelay: {
      type: Number,
      default: () => config.default.closeDelay,
    },
    popper: {
      type: Object,
      default: () => ({}),
    },
    class: {
      type: [String, Object, Array],
      default: () => "",
    },
    ui: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { ui, attrs } = useUI(
      "tooltip",
      toRef(props, "ui"),
      config,
      toRef(props, "class")
    );
    const popper = computed(() => defu({}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const open = ref(false);
    let openTimeout = null;
    let closeTimeout = null;
    const isVisible = computed(() => !!(useSlots().text || props.text));
    function onMouseEnter() {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (open.value) {
        return;
      }
      openTimeout =
        openTimeout ||
        setTimeout(() => {
          open.value = true;
          openTimeout = null;
        }, props.openDelay);
    }
    function onMouseLeave() {
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (!open.value) {
        return;
      }
      closeTimeout =
        closeTimeout ||
        setTimeout(() => {
          open.value = false;
          closeTimeout = null;
        }, props.closeDelay);
    }
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      open,
      onMouseEnter,
      onMouseLeave,
      isVisible,
    };
  },
});
function _sfc_ssrRender$1(
  _ctx,
  _push,
  _parent,
  _attrs,
  $props,
  $setup,
  $data,
  $options
) {
  var _a;
  const _component_UKbd = __nuxt_component_0;
  _push(
    `<div${ssrRenderAttrs(
      mergeProps(
        {
          ref: "trigger",
          class: _ctx.ui.wrapper,
        },
        _ctx.attrs,
        _attrs
      )
    )}>`
  );
  ssrRenderSlot(
    _ctx.$slots,
    "default",
    { open: _ctx.open },
    () => {
      _push(` Hover `);
    },
    _push,
    _parent
  );
  if (_ctx.open && !_ctx.prevent && _ctx.isVisible) {
    _push(
      `<div class="${ssrRenderClass([
        _ctx.ui.container,
        _ctx.ui.width,
      ])}"><template><div>`
    );
    if (_ctx.popper.arrow) {
      _push(
        `<div data-popper-arrow class="${ssrRenderClass(
          Object.values(_ctx.ui.arrow)
        )}"></div>`
      );
    } else {
      _push(`<!---->`);
    }
    _push(
      `<div class="${ssrRenderClass([
        _ctx.ui.base,
        _ctx.ui.background,
        _ctx.ui.color,
        _ctx.ui.rounded,
        _ctx.ui.shadow,
        _ctx.ui.ring,
      ])}">`
    );
    ssrRenderSlot(
      _ctx.$slots,
      "text",
      {},
      () => {
        _push(`${ssrInterpolate(_ctx.text)}`);
      },
      _push,
      _parent
    );
    if ((_a = _ctx.shortcuts) == null ? void 0 : _a.length) {
      _push(
        `<span class="${ssrRenderClass(
          _ctx.ui.shortcuts
        )}"><span class="${ssrRenderClass(_ctx.ui.middot)}">\xB7</span><!--[-->`
      );
      ssrRenderList(_ctx.shortcuts, (shortcut) => {
        _push(
          ssrRenderComponent(
            _component_UKbd,
            {
              key: shortcut,
              size: "xs",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(shortcut)}`);
                } else {
                  return [createTextVNode(toDisplayString(shortcut), 1)];
                }
              }),
              _: 2,
            },
            _parent
          )
        );
      });
      _push(`<!--]--></span>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div></template></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "node_modules/@nuxt/ui/dist/runtime/components/overlays/Tooltip.vue"
  );
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
  ["ssrRender", _sfc_ssrRender$1],
]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MyWebsites",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
  },
  emits: ["update:isOpen"],
  async setup(__props, { emit: __emit }) {
    var _a, _b;
    let __temp, __restore;
    const emit = __emit;
    const { data: countryCode } =
      (([__temp, __restore] = withAsyncContext(() =>
        useFetch(
          "/api/location/geo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
          "$raHY5FzZzE"
        )
      )),
      (__temp = await __temp),
      __restore(),
      __temp);
    const updateIsOpen = (value) => {
      emit("update:isOpen", value);
    };
    const config2 = useRuntimeConfig();
    const { stripe } = useClientStripe();
    const { data: googleData } = useAuth();
    const toast = useToast();
    const loadingStates = reactive({});
    const googleEmail =
      (_b = (_a = googleData.value) == null ? void 0 : _a.user) == null
        ? void 0
        : _b.email;
    const { data } =
      (([__temp, __restore] = withAsyncContext(() =>
        useFetch(
          `/api/website/email/${googleEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
          "$YsHxYokJkR"
        )
      )),
      (__temp = await __temp),
      __restore(),
      __temp);
    const hasData = computed(() => {
      var _a2;
      return !!((_a2 = data.value) == null ? void 0 : _a2.websites.length);
    });
    async function stripeBuyNotActive(websiteId, plan) {
      var _a2;
      loadingStates[websiteId] = true;
      try {
        const { data: data2 } = await useFetch(
          "/api/stripe/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plan,
              websiteId,
              countryCode: countryCode.value,
            }),
          },
          "$jl8WXPVLW1"
        );
        const sessionId = (_a2 = data2.value) == null ? void 0 : _a2.sessionId;
        if (!sessionId) {
          throw new Error("Failed to create Checkout session");
        }
        await stripe.value.redirectToCheckout({ sessionId });
      } catch {
        toast.add({
          title: "An error occurred while trying to buy",
          color: "red",
        });
      } finally {
        loadingStates[websiteId] = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = __nuxt_component_0$1;
      const _component_UCard = __nuxt_component_1;
      const _component_UTooltip = __nuxt_component_2;
      const _component_UIcon = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2$1;
      const _component_UNotifications = __nuxt_component_5;
      _push(`<!--[-->`);
      _push(
        ssrRenderComponent(
          _component_UModal,
          {
            modelValue: _ctx.isOpen,
            "onUpdate:modelValue": updateIsOpen,
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  ssrRenderComponent(
                    _component_UCard,
                    {
                      ui: {
                        ring: "",
                        divide: "divide-y divide-gray-100 dark:divide-gray-800",
                      },
                    },
                    {
                      header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(
                            `<h1 class="text-center text-3xl"${_scopeId2}>${ssrInterpolate(
                              _ctx.$t("myWebsites.title")
                            )} \u{1F525}</h1>`
                          );
                        } else {
                          return [
                            createVNode(
                              "h1",
                              { class: "text-center text-3xl" },
                              toDisplayString(_ctx.$t("myWebsites.title")) +
                                " \u{1F525}",
                              1
                            ),
                          ];
                        }
                      }),
                      footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(
                            `<div class="flex items-end justify-end"${_scopeId2}>`
                          );
                          _push3(
                            ssrRenderComponent(
                              _component_UButton,
                              {
                                onClick: ($event) => updateIsOpen(false),
                              },
                              {
                                default: withCtx(
                                  (_3, _push4, _parent4, _scopeId3) => {
                                    if (_push4) {
                                      _push4(
                                        `${ssrInterpolate(
                                          _ctx.$t("myWebsites.close")
                                        )}`
                                      );
                                    } else {
                                      return [
                                        createTextVNode(
                                          toDisplayString(
                                            _ctx.$t("myWebsites.close")
                                          ),
                                          1
                                        ),
                                      ];
                                    }
                                  }
                                ),
                                _: 1,
                              },
                              _parent3,
                              _scopeId2
                            )
                          );
                          _push3(`</div>`);
                        } else {
                          return [
                            createVNode(
                              "div",
                              { class: "flex items-end justify-end" },
                              [
                                createVNode(
                                  _component_UButton,
                                  {
                                    onClick: ($event) => updateIsOpen(false),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(
                                          _ctx.$t("myWebsites.close")
                                        ),
                                        1
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["onClick"]
                                ),
                              ]
                            ),
                          ];
                        }
                      }),
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        var _a2, _b2;
                        if (_push3) {
                          if (unref(hasData)) {
                            _push3(
                              `<div${_scopeId2}><ul class="flex flex-col gap-8"${_scopeId2}><!--[-->`
                            );
                            ssrRenderList(
                              (_a2 = unref(data)) == null
                                ? void 0
                                : _a2.websites,
                              (site) => {
                                _push3(
                                  `<li class="flex justify-between"${_scopeId2}>`
                                );
                                if (site.active) {
                                  _push3(
                                    `<a target="_blank" class="font-bold"${ssrRenderAttr(
                                      "href",
                                      unref(config2).public.baseUrl +
                                        "/website/" +
                                        site.id
                                    )}${_scopeId2}>${ssrInterpolate(
                                      unref(config2).public.baseUrl +
                                        "/website/" +
                                        site.id
                                    )}</a>`
                                  );
                                } else {
                                  _push3(
                                    `<span class="text-gray-500"${_scopeId2}>${ssrInterpolate(
                                      unref(config2).public.baseUrl +
                                        "website/" +
                                        site.id
                                    )}</span>`
                                  );
                                }
                                _push3(`<div class="relative"${_scopeId2}>`);
                                if (!site.active) {
                                  _push3(
                                    ssrRenderComponent(
                                      _component_UTooltip,
                                      {
                                        class:
                                          "cursor-pointer absolute -right-3 -top-5",
                                        text: "Voc\xEA precisa ativar o site para acessar",
                                        popper: { arrow: true },
                                      },
                                      {
                                        default: withCtx(
                                          (_3, _push4, _parent4, _scopeId3) => {
                                            if (_push4) {
                                              _push4(
                                                ssrRenderComponent(
                                                  _component_UIcon,
                                                  {
                                                    size: "25",
                                                    name: "i-heroicons:question-mark-circle-16-solid",
                                                  },
                                                  null,
                                                  _parent4,
                                                  _scopeId3
                                                )
                                              );
                                            } else {
                                              return [
                                                createVNode(_component_UIcon, {
                                                  size: "25",
                                                  name: "i-heroicons:question-mark-circle-16-solid",
                                                }),
                                              ];
                                            }
                                          }
                                        ),
                                        _: 2,
                                      },
                                      _parent3,
                                      _scopeId2
                                    )
                                  );
                                } else {
                                  _push3(`<!---->`);
                                }
                                if (!site.active) {
                                  _push3(
                                    ssrRenderComponent(
                                      _component_UButton,
                                      {
                                        loading: unref(loadingStates)[site.id],
                                        onClick: ($event) =>
                                          stripeBuyNotActive(
                                            site.id,
                                            site.plan
                                          ),
                                        color: "red",
                                      },
                                      {
                                        default: withCtx(
                                          (_3, _push4, _parent4, _scopeId3) => {
                                            if (_push4) {
                                              _push4(
                                                `${ssrInterpolate(
                                                  _ctx.$t(
                                                    "myWebsites.statusInactive"
                                                  )
                                                )}`
                                              );
                                            } else {
                                              return [
                                                createTextVNode(
                                                  toDisplayString(
                                                    _ctx.$t(
                                                      "myWebsites.statusInactive"
                                                    )
                                                  ),
                                                  1
                                                ),
                                              ];
                                            }
                                          }
                                        ),
                                        _: 2,
                                      },
                                      _parent3,
                                      _scopeId2
                                    )
                                  );
                                } else {
                                  _push3(
                                    ssrRenderComponent(
                                      _component_UButton,
                                      { color: "green" },
                                      {
                                        default: withCtx(
                                          (_3, _push4, _parent4, _scopeId3) => {
                                            if (_push4) {
                                              _push4(
                                                `${ssrInterpolate(
                                                  _ctx.$t(
                                                    "myWebsites.statusActive"
                                                  )
                                                )}`
                                              );
                                            } else {
                                              return [
                                                createTextVNode(
                                                  toDisplayString(
                                                    _ctx.$t(
                                                      "myWebsites.statusActive"
                                                    )
                                                  ),
                                                  1
                                                ),
                                              ];
                                            }
                                          }
                                        ),
                                        _: 2,
                                      },
                                      _parent3,
                                      _scopeId2
                                    )
                                  );
                                }
                                _push3(`</div></li>`);
                              }
                            );
                            _push3(`<!--]--></ul></div>`);
                          } else {
                            _push3(
                              `<div${_scopeId2}><span class="text-center"${_scopeId2}>${ssrInterpolate(
                                _ctx.$t("myWebsites.noWebSite")
                              )}</span></div>`
                            );
                          }
                        } else {
                          return [
                            unref(hasData)
                              ? (openBlock(),
                                createBlock("div", { key: 0 }, [
                                  createVNode(
                                    "ul",
                                    { class: "flex flex-col gap-8" },
                                    [
                                      (openBlock(true),
                                      createBlock(
                                        Fragment,
                                        null,
                                        renderList(
                                          (_b2 = unref(data)) == null
                                            ? void 0
                                            : _b2.websites,
                                          (site) => {
                                            return (
                                              openBlock(),
                                              createBlock(
                                                "li",
                                                {
                                                  class: "flex justify-between",
                                                  key: site.id,
                                                },
                                                [
                                                  site.active
                                                    ? (openBlock(),
                                                      createBlock(
                                                        "a",
                                                        {
                                                          key: 0,
                                                          target: "_blank",
                                                          class: "font-bold",
                                                          href:
                                                            unref(config2)
                                                              .public.baseUrl +
                                                            "/website/" +
                                                            site.id,
                                                        },
                                                        toDisplayString(
                                                          unref(config2).public
                                                            .baseUrl +
                                                            "/website/" +
                                                            site.id
                                                        ),
                                                        9,
                                                        ["href"]
                                                      ))
                                                    : (openBlock(),
                                                      createBlock(
                                                        "span",
                                                        {
                                                          key: 1,
                                                          class:
                                                            "text-gray-500",
                                                        },
                                                        toDisplayString(
                                                          unref(config2).public
                                                            .baseUrl +
                                                            "website/" +
                                                            site.id
                                                        ),
                                                        1
                                                      )),
                                                  createVNode(
                                                    "div",
                                                    { class: "relative" },
                                                    [
                                                      !site.active
                                                        ? (openBlock(),
                                                          createBlock(
                                                            _component_UTooltip,
                                                            {
                                                              key: 0,
                                                              class:
                                                                "cursor-pointer absolute -right-3 -top-5",
                                                              text: "Voc\xEA precisa ativar o site para acessar",
                                                              popper: {
                                                                arrow: true,
                                                              },
                                                            },
                                                            {
                                                              default: withCtx(
                                                                () => [
                                                                  createVNode(
                                                                    _component_UIcon,
                                                                    {
                                                                      size: "25",
                                                                      name: "i-heroicons:question-mark-circle-16-solid",
                                                                    }
                                                                  ),
                                                                ]
                                                              ),
                                                              _: 1,
                                                            }
                                                          ))
                                                        : createCommentVNode(
                                                            "",
                                                            true
                                                          ),
                                                      !site.active
                                                        ? (openBlock(),
                                                          createBlock(
                                                            _component_UButton,
                                                            {
                                                              key: 1,
                                                              loading:
                                                                unref(
                                                                  loadingStates
                                                                )[site.id],
                                                              onClick: (
                                                                $event
                                                              ) =>
                                                                stripeBuyNotActive(
                                                                  site.id,
                                                                  site.plan
                                                                ),
                                                              color: "red",
                                                            },
                                                            {
                                                              default: withCtx(
                                                                () => [
                                                                  createTextVNode(
                                                                    toDisplayString(
                                                                      _ctx.$t(
                                                                        "myWebsites.statusInactive"
                                                                      )
                                                                    ),
                                                                    1
                                                                  ),
                                                                ]
                                                              ),
                                                              _: 2,
                                                            },
                                                            1032,
                                                            [
                                                              "loading",
                                                              "onClick",
                                                            ]
                                                          ))
                                                        : (openBlock(),
                                                          createBlock(
                                                            _component_UButton,
                                                            {
                                                              key: 2,
                                                              color: "green",
                                                            },
                                                            {
                                                              default: withCtx(
                                                                () => [
                                                                  createTextVNode(
                                                                    toDisplayString(
                                                                      _ctx.$t(
                                                                        "myWebsites.statusActive"
                                                                      )
                                                                    ),
                                                                    1
                                                                  ),
                                                                ]
                                                              ),
                                                              _: 1,
                                                            }
                                                          )),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            );
                                          }
                                        ),
                                        128
                                      )),
                                    ]
                                  ),
                                ]))
                              : (openBlock(),
                                createBlock("div", { key: 1 }, [
                                  createVNode(
                                    "span",
                                    { class: "text-center" },
                                    toDisplayString(
                                      _ctx.$t("myWebsites.noWebSite")
                                    ),
                                    1
                                  ),
                                ])),
                          ];
                        }
                      }),
                      _: 1,
                    },
                    _parent2,
                    _scopeId
                  )
                );
              } else {
                return [
                  createVNode(
                    _component_UCard,
                    {
                      ui: {
                        ring: "",
                        divide: "divide-y divide-gray-100 dark:divide-gray-800",
                      },
                    },
                    {
                      header: withCtx(() => [
                        createVNode(
                          "h1",
                          { class: "text-center text-3xl" },
                          toDisplayString(_ctx.$t("myWebsites.title")) +
                            " \u{1F525}",
                          1
                        ),
                      ]),
                      footer: withCtx(() => [
                        createVNode(
                          "div",
                          { class: "flex items-end justify-end" },
                          [
                            createVNode(
                              _component_UButton,
                              {
                                onClick: ($event) => updateIsOpen(false),
                              },
                              {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(
                                      _ctx.$t("myWebsites.close")
                                    ),
                                    1
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["onClick"]
                            ),
                          ]
                        ),
                      ]),
                      default: withCtx(() => {
                        var _a2;
                        return [
                          unref(hasData)
                            ? (openBlock(),
                              createBlock("div", { key: 0 }, [
                                createVNode(
                                  "ul",
                                  { class: "flex flex-col gap-8" },
                                  [
                                    (openBlock(true),
                                    createBlock(
                                      Fragment,
                                      null,
                                      renderList(
                                        (_a2 = unref(data)) == null
                                          ? void 0
                                          : _a2.websites,
                                        (site) => {
                                          return (
                                            openBlock(),
                                            createBlock(
                                              "li",
                                              {
                                                class: "flex justify-between",
                                                key: site.id,
                                              },
                                              [
                                                site.active
                                                  ? (openBlock(),
                                                    createBlock(
                                                      "a",
                                                      {
                                                        key: 0,
                                                        target: "_blank",
                                                        class: "font-bold",
                                                        href:
                                                          unref(config2).public
                                                            .baseUrl +
                                                          "/website/" +
                                                          site.id,
                                                      },
                                                      toDisplayString(
                                                        unref(config2).public
                                                          .baseUrl +
                                                          "/website/" +
                                                          site.id
                                                      ),
                                                      9,
                                                      ["href"]
                                                    ))
                                                  : (openBlock(),
                                                    createBlock(
                                                      "span",
                                                      {
                                                        key: 1,
                                                        class: "text-gray-500",
                                                      },
                                                      toDisplayString(
                                                        unref(config2).public
                                                          .baseUrl +
                                                          "website/" +
                                                          site.id
                                                      ),
                                                      1
                                                    )),
                                                createVNode(
                                                  "div",
                                                  { class: "relative" },
                                                  [
                                                    !site.active
                                                      ? (openBlock(),
                                                        createBlock(
                                                          _component_UTooltip,
                                                          {
                                                            key: 0,
                                                            class:
                                                              "cursor-pointer absolute -right-3 -top-5",
                                                            text: "Voc\xEA precisa ativar o site para acessar",
                                                            popper: {
                                                              arrow: true,
                                                            },
                                                          },
                                                          {
                                                            default: withCtx(
                                                              () => [
                                                                createVNode(
                                                                  _component_UIcon,
                                                                  {
                                                                    size: "25",
                                                                    name: "i-heroicons:question-mark-circle-16-solid",
                                                                  }
                                                                ),
                                                              ]
                                                            ),
                                                            _: 1,
                                                          }
                                                        ))
                                                      : createCommentVNode(
                                                          "",
                                                          true
                                                        ),
                                                    !site.active
                                                      ? (openBlock(),
                                                        createBlock(
                                                          _component_UButton,
                                                          {
                                                            key: 1,
                                                            loading:
                                                              unref(
                                                                loadingStates
                                                              )[site.id],
                                                            onClick: ($event) =>
                                                              stripeBuyNotActive(
                                                                site.id,
                                                                site.plan
                                                              ),
                                                            color: "red",
                                                          },
                                                          {
                                                            default: withCtx(
                                                              () => [
                                                                createTextVNode(
                                                                  toDisplayString(
                                                                    _ctx.$t(
                                                                      "myWebsites.statusInactive"
                                                                    )
                                                                  ),
                                                                  1
                                                                ),
                                                              ]
                                                            ),
                                                            _: 2,
                                                          },
                                                          1032,
                                                          ["loading", "onClick"]
                                                        ))
                                                      : (openBlock(),
                                                        createBlock(
                                                          _component_UButton,
                                                          {
                                                            key: 2,
                                                            color: "green",
                                                          },
                                                          {
                                                            default: withCtx(
                                                              () => [
                                                                createTextVNode(
                                                                  toDisplayString(
                                                                    _ctx.$t(
                                                                      "myWebsites.statusActive"
                                                                    )
                                                                  ),
                                                                  1
                                                                ),
                                                              ]
                                                            ),
                                                            _: 1,
                                                          }
                                                        )),
                                                  ]
                                                ),
                                              ]
                                            )
                                          );
                                        }
                                      ),
                                      128
                                    )),
                                  ]
                                ),
                              ]))
                            : (openBlock(),
                              createBlock("div", { key: 1 }, [
                                createVNode(
                                  "span",
                                  { class: "text-center" },
                                  toDisplayString(
                                    _ctx.$t("myWebsites.noWebSite")
                                  ),
                                  1
                                ),
                              ])),
                        ];
                      }),
                      _: 1,
                    }
                  ),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(ssrRenderComponent(_component_UNotifications, null, null, _parent));
      _push(`<!--]-->`);
    };
  },
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "components/MyWebsites.vue"
  );
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    useI18n();
    const isOpen = ref(false);
    const { status } = useAuth();
    const isLogged = computed(() => status.value === "authenticated");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLinkLocale = __nuxt_component_0$2;
      const _component_NuxtImg = _sfc_main$5;
      const _component_UButton = __nuxt_component_2$1;
      const _component_UIcon = __nuxt_component_3;
      const _component_MyWebsites = _sfc_main$2;
      _push(
        `<!--[--><header class="h-28"><div class="flex h-full justify-between items-center px-16 gap-4">`
      );
      _push(
        ssrRenderComponent(
          _component_NuxtLinkLocale,
          { to: "/" },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(
                  ssrRenderComponent(
                    _component_NuxtImg,
                    {
                      alt: "logo",
                      class: "w-16 h-16 rounded-full",
                      src: "/icons/surpriseme_512_512.webp",
                    },
                    null,
                    _parent2,
                    _scopeId
                  )
                );
              } else {
                return [
                  createVNode(_component_NuxtImg, {
                    alt: "logo",
                    class: "w-16 h-16 rounded-full",
                    src: "/icons/surpriseme_512_512.webp",
                  }),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(`<div class="flex gap-5 items-center">`);
      if (unref(isLogged)) {
        _push(
          ssrRenderComponent(
            _component_UButton,
            {
              onClick: ($event) => (isOpen.value = true),
              size: "lg",
              variant: "solid",
              class: "dark:text-white",
              color: "red",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(_ctx.$t("header.myWebsites"))}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(_ctx.$t("header.myWebsites")),
                      1
                    ),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
      } else {
        _push(`<!---->`);
      }
      _push(`<button aria-label="lang" type="button" class="cursor-pointer">`);
      _push(
        ssrRenderComponent(
          _component_UIcon,
          {
            "aria-label": "br",
            class: "w-10 h-10",
            name: "i-flag:br-4x3",
          },
          null,
          _parent
        )
      );
      _push(
        `</button><button aria-label="lang" type="button" class="cursor-pointer">`
      );
      _push(
        ssrRenderComponent(
          _component_UIcon,
          {
            "aria-label": "us",
            class: "w-10 h-10",
            name: "i-flag:us-4x3",
          },
          null,
          _parent
        )
      );
      _push(`</button></div></div></header>`);
      _push(
        ssrRenderComponent(
          _component_MyWebsites,
          {
            isOpen: isOpen.value,
            "onUpdate:isOpen": ($event) => (isOpen.value = $event),
          },
          null,
          _parent
        )
      );
      _push(`<!--]-->`);
    };
  },
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "components/AppHeader.vue"
  );
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = _sfc_main$1;
  const _component_Footer = _sfc_main$6;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "layouts/custom.vue"
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const custom = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["ssrRender", _sfc_ssrRender],
]);

export { custom as default };
//# sourceMappingURL=custom-CqLddZjD.mjs.map
