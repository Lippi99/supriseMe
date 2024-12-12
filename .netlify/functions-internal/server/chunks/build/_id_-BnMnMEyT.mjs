import { h as __nuxt_component_0 } from './Icon-DrNIFf4I.mjs';
import { _ as _sfc_main$3 } from './YoutubeMusic-Cw6rc-DI.mjs';
import { defineComponent, computed, withAsyncContext, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext, mergeProps } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$4 } from './NuxtImg-DhqLMSvk.mjs';
import { _ as _sfc_main$2 } from './Footer-CbkdQFyU.mjs';
import { u as useThemeStore } from './useTheme-3OI58Mb0.mjs';
import { e as useRoute, f as useRouter, d as useSeoMeta } from './server.mjs';
import { a as useFetch } from './_base-Bra_Wjlx.mjs';
import 'vue-router';
import './index-DZrM-LkX.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './Card-B89ElPpR.mjs';
import 'tailwind-merge';
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
import 'pinia';
import '@unhead/shared';
import '@vueuse/core';
import './nuxt-link-fsWtB8P8.mjs';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white px-3 pt-3 pb-10" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PolaroidPhoto.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const id = computed(() => route.params.id);
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/website/${id.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      },
      "$18BmCaFfPk"
    )), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: (_b = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.website) == null ? void 0 : _b.name,
      ogTitle: (_d = (_c = data == null ? void 0 : data.value) == null ? void 0 : _c.website) == null ? void 0 : _d.name,
      description: (_f = (_e = data == null ? void 0 : data.value) == null ? void 0 : _e.website) == null ? void 0 : _f.name,
      ogDescription: (_h = (_g = data == null ? void 0 : data.value) == null ? void 0 : _g.website) == null ? void 0 : _h.name
    });
    useThemeStore();
    const linkUrl = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = data == null ? void 0 : data.value) == null ? void 0 : _a2.website) == null ? void 0 : _b2.songUrl;
    });
    const linkUrlNotEmpty = computed(() => {
      return !!linkUrl.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_YoutubeMusic = _sfc_main$3;
      const _component_PolaroidPhoto = __nuxt_component_2;
      const _component_NuxtImg = _sfc_main$4;
      _push(`<!--[--><title>${ssrInterpolate((_b2 = (_a2 = unref(data)) == null ? void 0 : _a2.website) == null ? void 0 : _b2.name)}</title>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2;
          if (_push2) {
            _push2(`<main class="relative left-0 top-0 right-0 bottom-0 h-full pt-10"${_scopeId}><h1 class="text-6xl text-center mb-10"${_scopeId}>${ssrInterpolate((_b3 = (_a3 = unref(data)) == null ? void 0 : _a3.website) == null ? void 0 : _b3.name)}</h1>`);
            if (unref(linkUrlNotEmpty)) {
              _push2(ssrRenderComponent(_component_YoutubeMusic, {
                isDetail: "",
                url: unref(linkUrl) || ""
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="max-w-md m-auto w-full flex flex-col items-center"${_scopeId}><!--[-->`);
            ssrRenderList((_d2 = (_c2 = unref(data)) == null ? void 0 : _c2.website) == null ? void 0 : _d2.messages, (message, index) => {
              _push2(`<div class="w-full flex flex-col items-center mt-32 pb-10"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_PolaroidPhoto, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtImg, {
                      class: "w-full max-w-[500px] h-[400px] rounded-md object-cover",
                      alt: message == null ? void 0 : message.message,
                      src: message == null ? void 0 : message.image
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtImg, {
                        class: "w-full max-w-[500px] h-[400px] rounded-md object-cover",
                        alt: message == null ? void 0 : message.message,
                        src: message == null ? void 0 : message.image
                      }, null, 8, ["alt", "src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="my-10 w-full h-px bg-gray-500"${_scopeId}></div><div class="w-full break-words"${_scopeId}><h2${_scopeId}>${ssrInterpolate(message == null ? void 0 : message.message)}</h2></div></div>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`</main>`);
          } else {
            return [
              createVNode("main", { class: "relative left-0 top-0 right-0 bottom-0 h-full pt-10" }, [
                createVNode("h1", { class: "text-6xl text-center mb-10" }, toDisplayString((_f2 = (_e2 = unref(data)) == null ? void 0 : _e2.website) == null ? void 0 : _f2.name), 1),
                unref(linkUrlNotEmpty) ? (openBlock(), createBlock(_component_YoutubeMusic, {
                  key: 0,
                  isDetail: "",
                  url: unref(linkUrl) || ""
                }, null, 8, ["url"])) : createCommentVNode("", true),
                createVNode("div", { class: "max-w-md m-auto w-full flex flex-col items-center" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList((_h2 = (_g2 = unref(data)) == null ? void 0 : _g2.website) == null ? void 0 : _h2.messages, (message, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "w-full flex flex-col items-center mt-32 pb-10"
                    }, [
                      createVNode(_component_PolaroidPhoto, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtImg, {
                            class: "w-full max-w-[500px] h-[400px] rounded-md object-cover",
                            alt: message == null ? void 0 : message.message,
                            src: message == null ? void 0 : message.image
                          }, null, 8, ["alt", "src"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("div", { class: "my-10 w-full h-px bg-gray-500" }),
                      createVNode("div", { class: "w-full break-words" }, [
                        createVNode("h2", null, toDisplayString(message == null ? void 0 : message.message), 1)
                      ])
                    ]);
                  }), 128))
                ]),
                createVNode(_sfc_main$2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/website/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BnMnMEyT.mjs.map
