import { d as defineEventHandler, r as readBody, i as createError } from '../../_/nitro.mjs';
import { g as getUser, c as createUser } from '../../_/user.mjs';
import 'node:http';
import 'node:https';
import 'requrl';
import '@iconify/utils';
import 'consola/core';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'ipx';
import '../../_/prisma.mjs';
import '@prisma/client';

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await getUser(body.email);
    if (!user) {
      await createUser(body);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: "User created" })
      };
    }
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
