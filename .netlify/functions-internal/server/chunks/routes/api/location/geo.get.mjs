import { d as defineEventHandler } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';

const geo_get = defineEventHandler(async () => {
  const data = await $fetch("https://api.country.is/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return (data == null ? void 0 : data.country) || "US";
});

export { geo_get as default };
//# sourceMappingURL=geo.get.mjs.map
