import { createUser, getUser } from "~/server/services/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const user = await getUser(body.email);

    if (!user) {
      const { createdAt, updatedAt, ...cleanUserData } = body;
      await createUser(cleanUserData);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: "User created" }),
      };
    }
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
