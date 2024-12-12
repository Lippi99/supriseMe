import { _ as __nuxt_component_3 } from './Icon-DrNIFf4I.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { h as useI18n } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const navigation = {
      socialMedia: [
        {
          icon: "i-skill-icons:instagram",
          href: "#"
        },
        {
          icon: "i-logos:facebook",
          href: "#"
        },
        {
          icon: "i-logos:tiktok-icon",
          href: "#"
        }
      ],
      support: [{ icon: "i-logos:whatsapp-icon", href: "#" }],
      legal: [
        { name: t("footer.legal.termsOfService"), href: "/term-services" },
        { name: t("footer.legal.privacyPolicy"), href: "/privacy-policy" }
      ]
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_3;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-32 pt-10 border-t-2 border-[#FF4E6D]" }, _attrs))}><div class="mx-auto max-w-7xl px-6 mb-16 lg:px-4"><div class="xl:grid xl:grid-cols-3 xl:gap-8"><div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"><div class="md:grid md:grid-cols-2 md:gap-8"><div><h3 class="text-sm/6 font-semibold text-white">${ssrInterpolate(_ctx.$t("footer.socialMedia"))}</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.socialMedia, (item) => {
        _push(`<li class="flex gap-4 items-center"><a target="_blank"${ssrRenderAttr("href", item.href)} class="text-sm/6 text-gray-400 hover:text-white">`);
        _push(ssrRenderComponent(_component_UIcon, {
          size: "30",
          name: item.icon
        }, null, _parent));
        _push(`</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="mt-10 md:mt-0"><h3 class="text-sm/6 font-semibold text-white">${ssrInterpolate(_ctx.$t("footer.support"))}</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.support, (item) => {
        _push(`<li><a target="_blank"${ssrRenderAttr("href", item.href)} class="text-sm/6 text-gray-400 hover:text-white">`);
        _push(ssrRenderComponent(_component_UIcon, {
          size: "30",
          name: item.icon
        }, null, _parent));
        _push(`</a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="md:grid md:grid-cols-2 md:gap-8"><div class="mt-10 md:mt-0"><h3 class="text-sm/6 font-semibold text-white">${ssrInterpolate(_ctx.$t("footer.legal.title"))}</h3><ul role="list" class="mt-6 space-y-4"><!--[-->`);
      ssrRenderList(navigation.legal, (item) => {
        _push(`<li><a target="_blank"${ssrRenderAttr("href", item.href)} class="text-sm/6 text-gray-400 hover:text-white">${ssrInterpolate(item.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Footer-CbkdQFyU.mjs.map
