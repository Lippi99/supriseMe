import { d as defineEventHandler, r as readBody, i as createError } from '../../_/nitro.mjs';
import { g as getUser, c as createUser } from '../../_/user.mjs';
import { c as createWebsite } from '../../_/website.mjs';
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
import 'uuid';
import '@aws-sdk/client-s3';

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await getUser(body.userEmail);
    if (!user) {
      console.log(user);
      await createUser(body.googleUserData);
    }
    const website = await createWebsite(body);
    if (!website) {
      return createError({
        statusCode: 400,
        statusMessage: "Website could not be created"
      });
    }
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Website created",
        websiteId: website.id
      })
    };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error" + e
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
