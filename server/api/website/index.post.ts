import { createUser, getUser } from "~/server/services/user";
import { createWebsite } from "~/server/services/website";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const user = await getUser(body.userEmail);

    if (!user) {
      await createUser(body.googleUserData);
    }

    if (!user?.active) {
      return createError({
        statusCode: 400,
        statusMessage: "User is not subscribed",
      });
    }

    await createWebsite(body);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Website created" }),
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error" + e,
    });
  }
});
