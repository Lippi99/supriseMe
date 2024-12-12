import { a as i$1, u, o as o$1, t, i, A, l, N as N$1, _ as __nuxt_component_3, b as useUI, d as s$1, g as o, h as __nuxt_component_0$1 } from './Icon-DrNIFf4I.mjs';
import { _ as __nuxt_component_0$2 } from './NuxtLinkLocale-BOasW2dX.mjs';
import { e as button, _ as __nuxt_component_2, a as useFetch } from './_base-Bra_Wjlx.mjs';
import { _ as _sfc_main$5 } from './NuxtImg-DhqLMSvk.mjs';
import { defineComponent, ref, provide, computed, onMounted, onUnmounted, watchEffect, useSSRContext, toRef, watch, mergeProps, withCtx, createVNode, unref, toDisplayString, inject, useId, resolveComponent, renderSlot, createTextVNode, withKeys, Transition, openBlock, createBlock, withDirectives, vShow } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from 'vue/server-renderer';
import { s } from './use-resolve-button-type-DBe3Emjk.mjs';
import { m as mergeConfig, a as appConfig, o as omit, f as useRouter, h as useI18n, d as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vue-router';
import './index-DZrM-LkX.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './nuxt-link-fsWtB8P8.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'tailwind-merge';
import 'pinia';
import 'unhead';
import '@unhead/shared';
import '@vueuse/core';

var $ = ((o2) => (o2[o2.Open = 0] = "Open", o2[o2.Closed = 1] = "Closed", o2))($ || {});
let T = Symbol("DisclosureContext");
function O(t2) {
  let r = inject(T, null);
  if (r === null) {
    let o2 = new Error(`<${t2} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o2, O), o2;
  }
  return r;
}
let k = Symbol("DisclosurePanelContext");
function U() {
  return inject(k, null);
}
let N = defineComponent({ name: "Disclosure", props: { as: { type: [Object, String], default: "template" }, defaultOpen: { type: [Boolean], default: false } }, setup(t$1, { slots: r, attrs: o$12 }) {
  let s2 = ref(t$1.defaultOpen ? 0 : 1), e = ref(null), i$2 = ref(null), n = { buttonId: ref(`headlessui-disclosure-button-${i$1()}`), panelId: ref(`headlessui-disclosure-panel-${i$1()}`), disclosureState: s2, panel: e, button: i$2, toggleDisclosure() {
    s2.value = u(s2.value, { [0]: 1, [1]: 0 });
  }, closeDisclosure() {
    s2.value !== 1 && (s2.value = 1);
  }, close(l2) {
    n.closeDisclosure();
    let a = (() => l2 ? l2 instanceof HTMLElement ? l2 : l2.value instanceof HTMLElement ? o$1(l2) : o$1(n.button) : o$1(n.button))();
    a == null || a.focus();
  } };
  return provide(T, n), t(computed(() => u(s2.value, { [0]: i.Open, [1]: i.Closed }))), () => {
    let { defaultOpen: l2, ...a } = t$1, c = { open: s2.value === 0, close: n.close };
    return A({ theirProps: a, ourProps: {}, slot: c, slots: r, attrs: o$12, name: "Disclosure" });
  };
} }), Q = defineComponent({ name: "DisclosureButton", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(t2, { attrs: r, slots: o$2, expose: s$12 }) {
  let e = O("DisclosureButton"), i2 = U(), n = computed(() => i2 === null ? false : i2.value === e.panelId.value);
  onMounted(() => {
    n.value || t2.id !== null && (e.buttonId.value = t2.id);
  }), onUnmounted(() => {
    n.value || (e.buttonId.value = null);
  });
  let l2 = ref(null);
  s$12({ el: l2, $el: l2 }), n.value || watchEffect(() => {
    e.button.value = l2.value;
  });
  let a = s(computed(() => ({ as: t2.as, type: r.type })), l2);
  function c() {
    var u2;
    t2.disabled || (n.value ? (e.toggleDisclosure(), (u2 = o$1(e.button)) == null || u2.focus()) : e.toggleDisclosure());
  }
  function D(u2) {
    var S;
    if (!t2.disabled) if (n.value) switch (u2.key) {
      case o.Space:
      case o.Enter:
        u2.preventDefault(), u2.stopPropagation(), e.toggleDisclosure(), (S = o$1(e.button)) == null || S.focus();
        break;
    }
    else switch (u2.key) {
      case o.Space:
      case o.Enter:
        u2.preventDefault(), u2.stopPropagation(), e.toggleDisclosure();
        break;
    }
  }
  function v(u2) {
    switch (u2.key) {
      case o.Space:
        u2.preventDefault();
        break;
    }
  }
  return () => {
    var C;
    let u2 = { open: e.disclosureState.value === 0 }, { id: S, ...K } = t2, M = n.value ? { ref: l2, type: a.value, onClick: c, onKeydown: D } : { id: (C = e.buttonId.value) != null ? C : S, ref: l2, type: a.value, "aria-expanded": e.disclosureState.value === 0, "aria-controls": e.disclosureState.value === 0 || o$1(e.panel) ? e.panelId.value : void 0, disabled: t2.disabled ? true : void 0, onClick: c, onKeydown: D, onKeyup: v };
    return A({ ourProps: M, theirProps: K, slot: u2, attrs: r, slots: o$2, name: "DisclosureButton" });
  };
} }), V = defineComponent({ name: "DisclosurePanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null } }, setup(t2, { attrs: r, slots: o2, expose: s2 }) {
  let e = O("DisclosurePanel");
  onMounted(() => {
    t2.id !== null && (e.panelId.value = t2.id);
  }), onUnmounted(() => {
    e.panelId.value = null;
  }), s2({ el: e.panel, $el: e.panel }), provide(k, e.panelId);
  let i2 = l(), n = computed(() => i2 !== null ? (i2.value & i.Open) === i.Open : e.disclosureState.value === 0);
  return () => {
    var v;
    let l2 = { open: e.disclosureState.value === 0, close: e.close }, { id: a, ...c } = t2, D = { id: (v = e.panelId.value) != null ? v : a, ref: e.panel };
    return A({ ourProps: D, theirProps: c, slot: l2, attrs: r, slots: o2, features: N$1.RenderStrategy | N$1.Static, visible: n.value, name: "DisclosurePanel" });
  };
} });
const accordion = {
  wrapper: "w-full flex flex-col",
  container: "w-full flex flex-col",
  item: {
    base: "",
    size: "text-sm",
    color: "text-gray-500 dark:text-gray-400",
    padding: "pt-1.5 pb-3",
    icon: "ms-auto transform transition-transform duration-200 flex-shrink-0"
  },
  transition: {
    enterActiveClass: "overflow-hidden transition-[height] duration-200 ease-out",
    leaveActiveClass: "overflow-hidden transition-[height] duration-200 ease-out"
  },
  default: {
    openIcon: "i-heroicons-chevron-down-20-solid",
    closeIcon: "",
    class: "mb-1.5 w-full",
    variant: "soft",
    truncate: true
  }
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CardSupport",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-56 w-full border-4 border-[#FF4E6D]" }, _attrs))}><div class="p-7 h-full w-full dark:bg-zinc-800"><h1 class="text-2xl font-black text-white">${ssrInterpolate(__props.title)}</h1></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CardSupport.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Plans",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    benefits: {
      type: Array,
      required: true
    },
    mostPicked: {
      type: Boolean,
      default: false
    }
  },
  emits: ["set-plan-url"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function handleSetPlanUrl() {
      if (props.mostPicked) {
        emit("set-plan-url", "/create?plan=Premium");
      } else {
        emit("set-plan-url", "/create?plan=Basic");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_3;
      const _component_UButton = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "dark:bg-zinc-800 w-full border-2 rounded-xl p-5",
          { "border-[#FF4E6D]": __props.mostPicked, "border-[#ccc]": !__props.mostPicked }
        ]
      }, _attrs))}><div class="flex justify-between"><h3 class="text-2xl mb-5">${ssrInterpolate(__props.title)}</h3>`);
      if (__props.mostPicked) {
        _push(`<span class="bg-[#FF4E6D] rounded-full py-1 px-3 flex items-center font-bold">${ssrInterpolate(_ctx.$t("indexPage.sectionThree.premium.tag"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="text-5xl font-extrabold mb-10 inline-block">${ssrInterpolate(__props.price)}</span><ul class="mb-10 flex flex-col gap-3"><!--[-->`);
      ssrRenderList(__props.benefits, (benefit, index) => {
        _push(`<li class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons:check-circle-16-solid",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span class="text-2xl">${ssrInterpolate(benefit)}</span></li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: handleSetPlanUrl,
        class: "py-5 dark:text-white font-bold text-2xl dark:bg-[#FF4E6D] dark:hover:bg-[#FF4E6D]",
        block: "",
        label: _ctx.$t("indexPage.sectionThree.premium.button")
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Plans.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.accordion, accordion);
const configButton = mergeConfig(appConfig.ui.strategy, appConfig.ui.button, button);
const _sfc_main$2 = defineComponent({
  components: {
    HDisclosure: N,
    HDisclosureButton: Q,
    HDisclosurePanel: V,
    UIcon: __nuxt_component_3,
    UButton: __nuxt_component_2
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    defaultOpen: {
      type: Boolean,
      default: false
    },
    openIcon: {
      type: String,
      default: () => config.default.openIcon
    },
    unmount: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: () => config.default.closeIcon
    },
    multiple: {
      type: Boolean,
      default: false
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["open"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("accordion", toRef(props, "ui"), config, toRef(props, "class"));
    const uiButton = computed(() => configButton);
    const buttonRefs = ref([]);
    const openedStates = computed(() => buttonRefs.value.map(({ open }) => open));
    watch(openedStates, (newValue, oldValue) => {
      for (const index in newValue) {
        const isOpenBefore = oldValue[index];
        const isOpenAfter = newValue[index];
        if (!isOpenBefore && isOpenAfter) {
          emit("open", index);
        }
      }
    }, { immediate: true });
    function closeOthers(currentIndex, e) {
      if (!props.items[currentIndex].closeOthers && props.multiple) {
        return;
      }
      buttonRefs.value.forEach((button2) => {
        if (button2.open) {
          button2.close(e.target);
        }
      });
    }
    function onEnter(_el, done) {
      const el = _el;
      el.style.height = "0";
      el.offsetHeight;
      el.style.height = el.scrollHeight + "px";
      el.addEventListener("transitionend", done, { once: true });
    }
    function onBeforeLeave(_el) {
      const el = _el;
      el.style.height = el.scrollHeight + "px";
      el.offsetHeight;
    }
    function onAfterEnter(_el) {
      const el = _el;
      el.style.height = "auto";
    }
    function onLeave(_el, done) {
      const el = _el;
      el.style.height = "0";
      el.addEventListener("transitionend", done, { once: true });
    }
    s$1(() => useId("$SZ7s8siktv"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      uiButton,
      attrs,
      buttonRefs,
      closeOthers,
      omit,
      onEnter,
      onBeforeLeave,
      onAfterEnter,
      onLeave
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HDisclosure = resolveComponent("HDisclosure");
  const _component_HDisclosureButton = resolveComponent("HDisclosureButton");
  const _component_UButton = __nuxt_component_2;
  const _component_UIcon = __nuxt_component_3;
  const _component_HDisclosurePanel = resolveComponent("HDisclosurePanel");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.items, (item, index) => {
    _push(ssrRenderComponent(_component_HDisclosure, {
      key: index,
      as: "div",
      class: _ctx.ui.container,
      "default-open": _ctx.defaultOpen || item.defaultOpen
    }, {
      default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(_component_HDisclosureButton, {
            ref_for: true,
            ref: () => _ctx.buttonRefs[index] = { open, close },
            as: "template",
            disabled: item.disabled,
            onClick: ($event) => _ctx.closeOthers(index, $event),
            onKeydown: [($event) => _ctx.closeOthers(index, $event), ($event) => _ctx.closeOthers(index, $event)]
          }, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "default", {
                  item,
                  index,
                  open,
                  close
                }, () => {
                  _push3(ssrRenderComponent(_component_UButton, mergeProps({ ref_for: true }, { ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]), ..._ctx.attrs, ..._ctx.omit(item, ["slot", "disabled", "content", "defaultOpen"]) }), {
                    trailing: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                          class: [
                            open && !_ctx.closeIcon ? "-rotate-180" : "",
                            _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                            _ctx.ui.item.icon
                          ]
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                            class: [
                              open && !_ctx.closeIcon ? "-rotate-180" : "",
                              _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                              _ctx.ui.item.icon
                            ]
                          }, null, 8, ["name", "class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                }, _push3, _parent3, _scopeId2);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", {
                    item,
                    index,
                    open,
                    close
                  }, () => [
                    createVNode(_component_UButton, mergeProps({ ref_for: true }, { ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]), ..._ctx.attrs, ..._ctx.omit(item, ["slot", "disabled", "content", "defaultOpen"]) }), {
                      trailing: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                          class: [
                            open && !_ctx.closeIcon ? "-rotate-180" : "",
                            _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                            _ctx.ui.item.icon
                          ]
                        }, null, 8, ["name", "class"])
                      ]),
                      _: 2
                    }, 1040)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(``);
          if (_ctx.unmount) {
            _push2(ssrRenderComponent(_component_HDisclosurePanel, {
              class: [_ctx.ui.item.base, _ctx.ui.item.size, _ctx.ui.item.color, _ctx.ui.item.padding],
              unmount: ""
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                    item,
                    index,
                    open,
                    close
                  }, () => {
                    _push3(`${ssrInterpolate(item.content)}`);
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      open,
                      close
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            _push2(`<div style="${ssrRenderStyle(open ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_HDisclosurePanel, {
              class: [_ctx.ui.item.base, _ctx.ui.item.size, _ctx.ui.item.color, _ctx.ui.item.padding],
              static: ""
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                    item,
                    index,
                    open,
                    close
                  }, () => {
                    _push3(`${ssrInterpolate(item.content)}`);
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      open,
                      close
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          }
        } else {
          return [
            createVNode(_component_HDisclosureButton, {
              ref_for: true,
              ref: () => _ctx.buttonRefs[index] = { open, close },
              as: "template",
              disabled: item.disabled,
              onClick: ($event) => _ctx.closeOthers(index, $event),
              onKeydown: [
                withKeys(($event) => _ctx.closeOthers(index, $event), ["enter"]),
                withKeys(($event) => _ctx.closeOthers(index, $event), ["space"])
              ]
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default", {
                  item,
                  index,
                  open,
                  close
                }, () => [
                  createVNode(_component_UButton, mergeProps({ ref_for: true }, { ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]), ..._ctx.attrs, ..._ctx.omit(item, ["slot", "disabled", "content", "defaultOpen"]) }), {
                    trailing: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                        class: [
                          open && !_ctx.closeIcon ? "-rotate-180" : "",
                          _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                          _ctx.ui.item.icon
                        ]
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1040)
                ])
              ]),
              _: 2
            }, 1032, ["disabled", "onClick", "onKeydown"]),
            createVNode(Transition, mergeProps({ ref_for: true }, _ctx.ui.transition, {
              onEnter: _ctx.onEnter,
              onAfterEnter: _ctx.onAfterEnter,
              onBeforeLeave: _ctx.onBeforeLeave,
              onLeave: _ctx.onLeave
            }), {
              default: withCtx(() => [
                _ctx.unmount ? (openBlock(), createBlock(_component_HDisclosurePanel, {
                  key: 0,
                  class: [_ctx.ui.item.base, _ctx.ui.item.size, _ctx.ui.item.color, _ctx.ui.item.padding],
                  unmount: ""
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      open,
                      close
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["class"])) : withDirectives((openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_component_HDisclosurePanel, {
                    class: [_ctx.ui.item.base, _ctx.ui.item.size, _ctx.ui.item.color, _ctx.ui.item.padding],
                    static: ""
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, item.slot || "item", {
                        item,
                        index,
                        open,
                        close
                      }, () => [
                        createTextVNode(toDisplayString(item.content), 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ], 512)), [
                  [vShow, open]
                ])
              ]),
              _: 2
            }, 1040, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave"])
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Accordion.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Faq",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: t2 } = useI18n();
    const items = [
      {
        label: t2("indexPage.sectionFour.title"),
        icon: "i-heroicons-information-circle",
        defaultOpen: false,
        content: t2("indexPage.sectionFour.questionOne.description")
        // Adjusted for translation
      },
      {
        label: t2("indexPage.sectionFour.questionTwo.title"),
        icon: "i-heroicons-arrow-down-tray",
        content: t2("indexPage.sectionFour.questionTwo.description")
        // Adjusted for translation
      },
      {
        label: t2("indexPage.sectionFour.questionThree.title"),
        icon: "i-heroicons-eye-dropper",
        content: t2("indexPage.sectionFour.questionThree.description")
        // Adjusted for translation
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UAccordion = __nuxt_component_0;
      const _component_UButton = __nuxt_component_2;
      const _component_UIcon = __nuxt_component_3;
      _push(ssrRenderComponent(_component_UAccordion, mergeProps({
        items,
        ui: { wrapper: "flex flex-col w-full" }
      }, _attrs), {
        default: withCtx(({ item, index, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              class: "border-b border-gray-200 dark:border-gray-700",
              ui: { rounded: "rounded-none", padding: { sm: "p-3" } }
            }, {
              trailing: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chevron-right-20-solid",
                    class: ["w-5 h-5 ms-auto transform transition-transform duration-200", [open && "rotate-90"]]
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-right-20-solid",
                      class: ["w-5 h-5 ms-auto transform transition-transform duration-200", [open && "rotate-90"]]
                    }, null, 8, ["class"])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="truncate text-2xl"${_scopeId2}>${ssrInterpolate(item.label)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "truncate text-2xl" }, toDisplayString(item.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "gray",
                variant: "ghost",
                class: "border-b border-gray-200 dark:border-gray-700",
                ui: { rounded: "rounded-none", padding: { sm: "p-3" } }
              }, {
                trailing: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chevron-right-20-solid",
                    class: ["w-5 h-5 ms-auto transform transition-transform duration-200", [open && "rotate-90"]]
                  }, null, 8, ["class"])
                ]),
                default: withCtx(() => [
                  createVNode("span", { class: "truncate text-2xl" }, toDisplayString(item.label), 1)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Faq.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRouter();
    const { t: t2 } = useI18n();
    const { data } = useFetch("/api/stripe/prices", "$pqtWcjQkdb");
    const { locale } = useI18n();
    const priceBasic = computed(() => {
      var _a, _b;
      return locale.value === "en" ? `$ ${(_a = data.value) == null ? void 0 : _a.prices[0].usd}` : `R$ ${(_b = data.value) == null ? void 0 : _b.prices[0].brl}`;
    });
    const pricePremium = computed(() => {
      var _a, _b;
      return locale.value === "en" ? `$ ${(_a = data.value) == null ? void 0 : _a.prices[1].usd}` : `R$ ${(_b = data.value) == null ? void 0 : _b.prices[1].brl}`;
    });
    useSeoMeta({
      title: t2("seo.index.title"),
      ogTitle: t2("seo.index.ogTitle"),
      description: t2("seo.index.description"),
      ogDescription: t2("seo.index.ogDescription")
    });
    function handleSetPlanUrl(url) {
      route.push(url);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtLinkLocale = __nuxt_component_0$2;
      const _component_UButton = __nuxt_component_2;
      const _component_NuxtImg = _sfc_main$5;
      const _component_CardSupport = _sfc_main$4;
      const _component_Plans = _sfc_main$3;
      const _component_Faq = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "custom" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-[47px] pl-24 pr-24 lg:pr-0 lg:max-w-7xl m-auto"${_scopeId}><div class="flex flex-col-reverse items-center justify-center lg:flex-row"${_scopeId}><div class="flex-1 my-10 flex flex-col items-center justify-center lg:justify-start lg:items-start"${_scopeId}><h1 class="text-3xl w-11/12 xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl"${_scopeId}>${ssrInterpolate(_ctx.$t("indexPage.sectionOne.title"))}</h1><p class="text-lg w-11/12 mt-10 xl:text-2xl lg:text-lg md:text-lg sm:text-lg lg:w-3/4"${_scopeId}>${ssrInterpolate(_ctx.$t("indexPage.sectionOne.description"))}</p><div class="max-w-72 w-full mt-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLinkLocale, { to: "/create" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    class: "text-2xl py-5 dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
                    block: "",
                    label: _ctx.$t("indexPage.sectionOne.button")
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      class: "text-2xl py-5 dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
                      block: "",
                      label: _ctx.$t("indexPage.sectionOne.button")
                    }, null, 8, ["label"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "flex-1 min-w-96 w-full object-cover",
              alt: "gift",
              src: "/images/photo.svg"
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="py-[47px] px-10 lg:max-w-7xl lg:pl-24 m-auto"${_scopeId}><h2 class="text-5xl"${_scopeId}>${ssrInterpolate(_ctx.$t("indexPage.sectionTwo.title"))}</h2><div class="mt-9 grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_CardSupport, {
              title: _ctx.$t("indexPage.sectionTwo.descriptionOne")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardSupport, {
              title: _ctx.$t("indexPage.sectionTwo.descriptionTwo")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardSupport, {
              title: _ctx.$t("indexPage.sectionTwo.descriptionThree")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardSupport, {
              title: _ctx.$t("indexPage.sectionTwo.descriptionFour")
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="py-[187px] px-10 lg:max-w-7xl lg:pl-24 m-auto"${_scopeId}><h2 class="text-center text-5xl font-bold mb-16"${_scopeId}>${ssrInterpolate(_ctx.$t("indexPage.sectionThree.title"))}</h2><div class="grid grid-cols-1 gap-10 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Plans, {
              title: _ctx.$t("indexPage.sectionThree.basic.title"),
              price: unref(priceBasic),
              benefits: [
                _ctx.$t("indexPage.sectionThree.basic.descriptionOne"),
                _ctx.$t("indexPage.sectionThree.basic.descriptionTwo"),
                _ctx.$t("indexPage.sectionThree.basic.descriptionThree")
              ],
              onSetPlanUrl: handleSetPlanUrl
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Plans, {
              mostPicked: "",
              title: _ctx.$t("indexPage.sectionThree.premium.title"),
              price: unref(pricePremium),
              benefits: [
                _ctx.$t("indexPage.sectionThree.premium.descriptionOne"),
                _ctx.$t("indexPage.sectionThree.premium.descriptionTwo"),
                _ctx.$t("indexPage.sectionThree.premium.descriptionThree")
              ],
              onSetPlanUrl: handleSetPlanUrl
            }, null, _parent2, _scopeId));
            _push2(`</div></section><section class="py-[27px] px-10 lg:max-w-7xl lg:pl-24 m-auto"${_scopeId}><h4 class="text-center text-5xl font-bold mb-10"${_scopeId}>${ssrInterpolate(_ctx.$t("indexPage.sectionFour.title"))}</h4>`);
            _push2(ssrRenderComponent(_component_Faq, null, null, _parent2, _scopeId));
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "py-[47px] pl-24 pr-24 lg:pr-0 lg:max-w-7xl m-auto" }, [
                createVNode("div", { class: "flex flex-col-reverse items-center justify-center lg:flex-row" }, [
                  createVNode("div", { class: "flex-1 my-10 flex flex-col items-center justify-center lg:justify-start lg:items-start" }, [
                    createVNode("h1", { class: "text-3xl w-11/12 xl:text-7xl lg:text-5xl md:text-4xl sm:text-3xl" }, toDisplayString(_ctx.$t("indexPage.sectionOne.title")), 1),
                    createVNode("p", { class: "text-lg w-11/12 mt-10 xl:text-2xl lg:text-lg md:text-lg sm:text-lg lg:w-3/4" }, toDisplayString(_ctx.$t("indexPage.sectionOne.description")), 1),
                    createVNode("div", { class: "max-w-72 w-full mt-8" }, [
                      createVNode(_component_NuxtLinkLocale, { to: "/create" }, {
                        default: withCtx(() => [
                          createVNode(_component_UButton, {
                            class: "text-2xl py-5 dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
                            block: "",
                            label: _ctx.$t("indexPage.sectionOne.button")
                          }, null, 8, ["label"])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode(_component_NuxtImg, {
                    class: "flex-1 min-w-96 w-full object-cover",
                    alt: "gift",
                    src: "/images/photo.svg"
                  })
                ])
              ]),
              createVNode("section", { class: "py-[47px] px-10 lg:max-w-7xl lg:pl-24 m-auto" }, [
                createVNode("h2", { class: "text-5xl" }, toDisplayString(_ctx.$t("indexPage.sectionTwo.title")), 1),
                createVNode("div", { class: "mt-9 grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2" }, [
                  createVNode(_component_CardSupport, {
                    title: _ctx.$t("indexPage.sectionTwo.descriptionOne")
                  }, null, 8, ["title"]),
                  createVNode(_component_CardSupport, {
                    title: _ctx.$t("indexPage.sectionTwo.descriptionTwo")
                  }, null, 8, ["title"]),
                  createVNode(_component_CardSupport, {
                    title: _ctx.$t("indexPage.sectionTwo.descriptionThree")
                  }, null, 8, ["title"]),
                  createVNode(_component_CardSupport, {
                    title: _ctx.$t("indexPage.sectionTwo.descriptionFour")
                  }, null, 8, ["title"])
                ])
              ]),
              createVNode("section", { class: "py-[187px] px-10 lg:max-w-7xl lg:pl-24 m-auto" }, [
                createVNode("h2", { class: "text-center text-5xl font-bold mb-16" }, toDisplayString(_ctx.$t("indexPage.sectionThree.title")), 1),
                createVNode("div", { class: "grid grid-cols-1 gap-10 md:grid-cols-2" }, [
                  createVNode(_component_Plans, {
                    title: _ctx.$t("indexPage.sectionThree.basic.title"),
                    price: unref(priceBasic),
                    benefits: [
                      _ctx.$t("indexPage.sectionThree.basic.descriptionOne"),
                      _ctx.$t("indexPage.sectionThree.basic.descriptionTwo"),
                      _ctx.$t("indexPage.sectionThree.basic.descriptionThree")
                    ],
                    onSetPlanUrl: handleSetPlanUrl
                  }, null, 8, ["title", "price", "benefits"]),
                  createVNode(_component_Plans, {
                    mostPicked: "",
                    title: _ctx.$t("indexPage.sectionThree.premium.title"),
                    price: unref(pricePremium),
                    benefits: [
                      _ctx.$t("indexPage.sectionThree.premium.descriptionOne"),
                      _ctx.$t("indexPage.sectionThree.premium.descriptionTwo"),
                      _ctx.$t("indexPage.sectionThree.premium.descriptionThree")
                    ],
                    onSetPlanUrl: handleSetPlanUrl
                  }, null, 8, ["title", "price", "benefits"])
                ])
              ]),
              createVNode("section", { class: "py-[27px] px-10 lg:max-w-7xl lg:pl-24 m-auto" }, [
                createVNode("h4", { class: "text-center text-5xl font-bold mb-10" }, toDisplayString(_ctx.$t("indexPage.sectionFour.title")), 1),
                createVNode(_component_Faq)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bq5eA4f8.mjs.map
