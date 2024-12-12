import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { d as useSeoMeta } from './server.mjs';
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
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "term-services",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Termos de Servi\xE7o",
      description: "Termos de Servi\xE7o do site surpriseMe"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "padding": "30px" } }, _attrs))}><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">1. Termos</span></h2><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Ao acessar ao site <a href="https://surpriseMe.com.br">surpriseMe</a>, concorda em cumprir estes termos de servi\xE7o, todas as leis e regulamentos aplic\xE1veis \u200B\u200Be concorda que \xE9 respons\xE1vel pelo cumprimento de todas as leis locais aplic\xE1veis. Se voc\xEA n\xE3o concordar com algum desses termos, est\xE1 proibido de usar ou acessar este site. Os materiais contidos neste site s\xE3o protegidos pelas leis de direitos autorais e marcas comerciais aplic\xE1veis.</span></p><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">2. Uso de Licen\xE7a</span></h2><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">\xC9 concedida permiss\xE3o para baixar temporariamente uma c\xF3pia dos materiais (informa\xE7\xF5es ou software) no site surpriseMe , apenas para visualiza\xE7\xE3o transit\xF3ria pessoal e n\xE3o comercial. Esta \xE9 a concess\xE3o de uma licen\xE7a, n\xE3o uma transfer\xEAncia de t\xEDtulo e, sob esta licen\xE7a, voc\xEA n\xE3o pode:\xA0</span></p><ol><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">modificar ou copiar os materiais;\xA0</span></li><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">usar os materiais para qualquer finalidade comercial ou para exibi\xE7\xE3o p\xFAblica (comercial ou n\xE3o comercial);\xA0</span></li><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">tentar descompilar ou fazer engenharia reversa de qualquer software contido no site surpriseMe;\xA0</span></li><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">remover quaisquer direitos autorais ou outras nota\xE7\xF5es de propriedade dos materiais; ou\xA0</span></li><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">transferir os materiais para outra pessoa ou &#39;espelhe&#39; os materiais em qualquer outro servidor.</span></li></ol><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Esta licen\xE7a ser\xE1 automaticamente rescindida se voc\xEA violar alguma dessas restri\xE7\xF5es e poder\xE1 ser rescindida por surpriseMe a qualquer momento. Ao encerrar a visualiza\xE7\xE3o desses materiais ou ap\xF3s o t\xE9rmino desta licen\xE7a, voc\xEA deve apagar todos os materiais baixados em sua posse, seja em formato eletr\xF3nico ou impresso.</span></p><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">3. Isen\xE7\xE3o de responsabilidade</span></h2><ol><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Os materiais no site da surpriseMe s\xE3o fornecidos &#39;como est\xE3o&#39;. surpriseMe n\xE3o oferece garantias, expressas ou impl\xEDcitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limita\xE7\xE3o, garantias impl\xEDcitas ou condi\xE7\xF5es de comercializa\xE7\xE3o, adequa\xE7\xE3o a um fim espec\xEDfico ou n\xE3o viola\xE7\xE3o de propriedade intelectual ou outra viola\xE7\xE3o de direitos.</span></li><li><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Al\xE9m disso, o surpriseMe n\xE3o garante ou faz qualquer representa\xE7\xE3o relativa \xE0 precis\xE3o, aos resultados prov\xE1veis \u200B\u200Bou \xE0 confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li></ol><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">4. Limita\xE7\xF5es</span></h2><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Em nenhum caso o surpriseMe ou seus fornecedores ser\xE3o respons\xE1veis \u200B\u200Bpor quaisquer danos (incluindo, sem limita\xE7\xE3o, danos por perda de dados ou lucro ou devido a interrup\xE7\xE3o dos neg\xF3cios) decorrentes do uso ou da incapacidade de usar os materiais em surpriseMe, mesmo que surpriseMe ou um representante autorizado da surpriseMe tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdi\xE7\xF5es n\xE3o permitem limita\xE7\xF5es em garantias impl\xEDcitas, ou limita\xE7\xF5es de responsabilidade por danos conseq\xFCentes ou incidentais, essas limita\xE7\xF5es podem n\xE3o se aplicar a voc\xEA.</span></p><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">5. Precis\xE3o dos materiais</span></h2><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Os materiais exibidos no site da surpriseMe podem incluir erros t\xE9cnicos, tipogr\xE1ficos ou fotogr\xE1ficos. surpriseMe n\xE3o garante que qualquer material em seu site seja preciso, completo ou atual. surpriseMe pode fazer altera\xE7\xF5es nos materiais contidos em seu site a qualquer momento, sem aviso pr\xE9vio. No entanto, surpriseMe n\xE3o se compromete a atualizar os materiais.</span></p><h2><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">6. Links</span></h2><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">O surpriseMe n\xE3o analisou todos os sites vinculados ao seu site e n\xE3o \xE9 respons\xE1vel pelo conte\xFAdo de nenhum site vinculado. A inclus\xE3o de qualquer link n\xE3o implica endosso por surpriseMe do site. O uso de qualquer site vinculado \xE9 por conta e risco do usu\xE1rio.</span></p><p><br></p><h3><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Modifica\xE7\xF5es</span></h3><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">O surpriseMe pode revisar estes termos de servi\xE7o do site a qualquer momento, sem aviso pr\xE9vio. Ao usar este site, voc\xEA concorda em ficar vinculado \xE0 vers\xE3o atual desses termos de servi\xE7o.</span></p><h3><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Lei aplic\xE1vel</span></h3><p><span style="${ssrRenderStyle({ "color": "rgb(255, 255, 255)" })}">Estes termos e condi\xE7\xF5es s\xE3o regidos e interpretados de acordo com as leis do surpriseMe e voc\xEA se submete irrevogavelmente \xE0 jurisdi\xE7\xE3o exclusiva dos tribunais naquele estado ou localidade.</span></p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/term-services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=term-services-C8VaRbHV.mjs.map
