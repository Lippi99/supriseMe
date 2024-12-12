import { a as useRuntimeConfig } from '../../../_/nitro.mjs';
import GoogleProvider from 'next-auth/providers/google';
import { N as NuxtAuthHandler } from '../../../_/nuxtAuthHandler.mjs';
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

const config = useRuntimeConfig();
const _____ = NuxtAuthHandler({
  secret: config.auth.secret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: config.auth.providers.google.client,
      clientSecret: config.auth.providers.google.secret
    })
  ],
  callbacks: {}
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
