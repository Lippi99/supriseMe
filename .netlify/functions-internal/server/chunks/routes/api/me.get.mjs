import { e as eventHandler } from '../../_/nitro.mjs';
import { g as getServerSession } from '../../_/nuxtAuthHandler.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'next-auth/core';

const me_get = eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (session) {
    return {
      status: 200,
      message: "Authorized",
      ...session
    };
  }
  return {
    status: 401,
    message: "Unauthorized"
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
