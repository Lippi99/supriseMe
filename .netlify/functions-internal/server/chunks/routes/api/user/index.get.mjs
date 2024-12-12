import { d as defineEventHandler, r as readBody, i as createError } from '../../../_/nitro.mjs';
import { g as getUser } from '../../../_/user.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import '../../../_/prisma.mjs';
import '@prisma/client';

const index_get = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await getUser(body.email);
    if (user) {
      return {
        statusCode: 201,
        body: JSON.stringify({ user })
      };
    }
    return createError({
      statusCode: 400,
      statusMessage: "User not found"
    });
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error" + e
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
