import { d as defineEventHandler, i as createError } from '../../../../_/nitro.mjs';
import { a as getWebsites } from '../../../../_/website.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import 'uuid';
import '../../../../_/prisma.mjs';
import '@prisma/client';
import '@aws-sdk/client-s3';

const _email_ = defineEventHandler(async (event) => {
  var _a;
  try {
    const email = (_a = event.context.params) == null ? void 0 : _a.email;
    const websites = await getWebsites(email);
    return {
      statusCode: 200,
      websites
    };
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { _email_ as default };
//# sourceMappingURL=_email_.mjs.map
