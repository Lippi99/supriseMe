import { d as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';

const ping_get = defineEventHandler(async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ping" })
  };
});

export { ping_get as default };
//# sourceMappingURL=ping.get.mjs.map
