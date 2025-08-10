import { createUser, getUser } from "~/server/services/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { credential, user } = body;

    if (!user || !user.email || !user.name) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid user data",
      });
    }

    // Check if user already exists
    const existingUser = await getUser(user.email);
    
    if (!existingUser) {
      // Create new user with Google data
      await createUser({
        email: user.email,
        name: user.name,
        image: user.picture || null,
      });
    }

    return {
      success: true,
      user: {
        email: user.email,
        name: user.name,
        image: user.picture,
      },
    };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Authentication failed",
    });
  }
});