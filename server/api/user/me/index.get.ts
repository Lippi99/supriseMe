import { getUser } from "~/server/services/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await getUser(body.email);

    if (user) {
      return {
        statusCode: 201,
        body: JSON.stringify({ user }),
      };
    }
    return createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error" + e,
    });
  }
});
