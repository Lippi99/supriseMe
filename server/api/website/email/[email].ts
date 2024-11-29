import { getWebsites } from "~/server/services/website";

export default defineEventHandler(async (event) => {
  try {
    const email = event.context.params?.email as string;
    const websites = await getWebsites(email);
    return {
      statusCode: 200,
      websites,
    };
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
