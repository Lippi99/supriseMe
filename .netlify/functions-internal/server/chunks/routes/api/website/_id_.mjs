import { d as defineEventHandler, i as createError } from '../../../_/nitro.mjs';
import { g as getWebsite } from '../../../_/website.mjs';
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
import '../../../_/prisma.mjs';
import '@prisma/client';
import '@aws-sdk/client-s3';

const _id_ = defineEventHandler(async (event) => {
  var _a;
  try {
    const id = (_a = event.context.params) == null ? void 0 : _a.id;
    const website = await getWebsite(id);
    if (!website) {
      return createError({
        statusCode: 400,
        statusMessage: "Website not found"
      });
    }
    return {
      statusCode: 200,
      website
    };
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
