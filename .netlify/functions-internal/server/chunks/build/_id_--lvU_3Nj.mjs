import { h as __nuxt_component_0, _ as __nuxt_component_3 } from './Icon-DrNIFf4I.mjs';
import { _ as __nuxt_component_0$1, b as __nuxt_component_1 } from './Card-B89ElPpR.mjs';
import { defineComponent, ref, computed, withCtx, unref, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import QrcodeVue from 'qrcode.vue';
import { u as useThemeStore } from './useTheme-3OI58Mb0.mjs';
import { j as useServerSeoMeta, e as useRoute, k as useRuntimeConfig } from './server.mjs';
import 'vue-router';
import './index-DZrM-LkX.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'tailwind-merge';
import 'pinia';
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
import 'unhead';
import '@unhead/shared';
import '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useThemeStore();
    useServerSeoMeta({
      title: "Seu site foi criado com sucesso!",
      description: "Acesse seu site pelo QRCode ou pelo link"
    });
    const config = useRuntimeConfig();
    const isOpen = ref(true);
    const route = useRoute();
    const link = computed(() => {
      const id = route.params.id;
      return `${config.public.baseUrl}/website/${id}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_UModal = __nuxt_component_0$1;
      const _component_UCard = __nuxt_component_1;
      const _component_UIcon = __nuxt_component_3;
      _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UModal, {
              class: "-z-10",
              "prevent-close": "",
              ui: { width: "w-full sm:max-w-3xl", height: "h-[630px]" },
              modelValue: unref(isOpen),
              "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCard, { ui: {
                    ring: "",
                    divide: "divide-y divide-gray-100 dark:divide-gray-800"
                  } }, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          class: "text-center w-full text-green-600",
                          size: "60",
                          name: "i-heroicons:check-circle-solid"
                        }, null, _parent4, _scopeId3));
                        _push4(`<h1 class="text-center text-3xl text-green-400 font-bold"${_scopeId3}> Seu site foi criado com sucesso! </h1><span class="w-full mt-5 text-center inline-block text-xl"${_scopeId3}>Acesse seu site pelo QRCode</span>`);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            class: "text-center w-full text-green-600",
                            size: "60",
                            name: "i-heroicons:check-circle-solid"
                          }),
                          createVNode("h1", { class: "text-center text-3xl text-green-400 font-bold" }, " Seu site foi criado com sucesso! "),
                          createVNode("span", { class: "w-full mt-5 text-center inline-block text-xl" }, "Acesse seu site pelo QRCode")
                        ];
                      }
                    }),
                    footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="text-xl text-center w-full inline-block"${_scopeId3}>Acesse <a${ssrRenderAttr("href", unref(link))} class="text-green-300 font-bold cursor-pointer underline" target="_blank"${_scopeId3}>seu site aqui!</a></span>`);
                      } else {
                        return [
                          createVNode("span", { class: "text-xl text-center w-full inline-block" }, [
                            createTextVNode("Acesse "),
                            createVNode("a", {
                              href: unref(link),
                              class: "text-green-300 font-bold cursor-pointer underline",
                              target: "_blank"
                            }, "seu site aqui!", 8, ["href"])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center justify-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(QrcodeVue, {
                          value: unref(link),
                          size: 300,
                          level: "H",
                          "render-as": "svg"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="text-xl mt-5"${_scopeId3}>OU</span></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                            createVNode(QrcodeVue, {
                              value: unref(link),
                              size: 300,
                              level: "H",
                              "render-as": "svg"
                            }, null, 8, ["value"]),
                            createVNode("span", { class: "text-xl mt-5" }, "OU")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCard, { ui: {
                      ring: "",
                      divide: "divide-y divide-gray-100 dark:divide-gray-800"
                    } }, {
                      header: withCtx(() => [
                        createVNode(_component_UIcon, {
                          class: "text-center w-full text-green-600",
                          size: "60",
                          name: "i-heroicons:check-circle-solid"
                        }),
                        createVNode("h1", { class: "text-center text-3xl text-green-400 font-bold" }, " Seu site foi criado com sucesso! "),
                        createVNode("span", { class: "w-full mt-5 text-center inline-block text-xl" }, "Acesse seu site pelo QRCode")
                      ]),
                      footer: withCtx(() => [
                        createVNode("span", { class: "text-xl text-center w-full inline-block" }, [
                          createTextVNode("Acesse "),
                          createVNode("a", {
                            href: unref(link),
                            class: "text-green-300 font-bold cursor-pointer underline",
                            target: "_blank"
                          }, "seu site aqui!", 8, ["href"])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                          createVNode(QrcodeVue, {
                            value: unref(link),
                            size: 300,
                            level: "H",
                            "render-as": "svg"
                          }, null, 8, ["value"]),
                          createVNode("span", { class: "text-xl mt-5" }, "OU")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UModal, {
                class: "-z-10",
                "prevent-close": "",
                ui: { width: "w-full sm:max-w-3xl", height: "h-[630px]" },
                modelValue: unref(isOpen),
                "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null
              }, {
                default: withCtx(() => [
                  createVNode(_component_UCard, { ui: {
                    ring: "",
                    divide: "divide-y divide-gray-100 dark:divide-gray-800"
                  } }, {
                    header: withCtx(() => [
                      createVNode(_component_UIcon, {
                        class: "text-center w-full text-green-600",
                        size: "60",
                        name: "i-heroicons:check-circle-solid"
                      }),
                      createVNode("h1", { class: "text-center text-3xl text-green-400 font-bold" }, " Seu site foi criado com sucesso! "),
                      createVNode("span", { class: "w-full mt-5 text-center inline-block text-xl" }, "Acesse seu site pelo QRCode")
                    ]),
                    footer: withCtx(() => [
                      createVNode("span", { class: "text-xl text-center w-full inline-block" }, [
                        createTextVNode("Acesse "),
                        createVNode("a", {
                          href: unref(link),
                          class: "text-green-300 font-bold cursor-pointer underline",
                          target: "_blank"
                        }, "seu site aqui!", 8, ["href"])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                        createVNode(QrcodeVue, {
                          value: unref(link),
                          size: 300,
                          level: "H",
                          "render-as": "svg"
                        }, null, 8, ["value"]),
                        createVNode("span", { class: "text-xl mt-5" }, "OU")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/success/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_--lvU_3Nj.mjs.map
