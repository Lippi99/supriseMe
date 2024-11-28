import { getWebsite } from "~/server/services/website";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id as string;
    const website = await getWebsite(id);

    if (!website) {
      return createError({
        statusCode: 400,
        statusMessage: "Website not found",
      });
    }

    console.log(website);

    return {
      statusCode: 200,
      website,
    };
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
