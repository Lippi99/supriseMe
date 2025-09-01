import bcrypt from "bcryptjs";
import { getUser } from "~/server/services/user";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate input
    const validatedData = loginSchema.parse(body);
    const { email, password } = validatedData;

    // Get user
    const user = await getUser(email);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

    // Check if user has a password (for OAuth users)
    if (!user.password) {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciais inválidas",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
    };
  } catch (error: any) {
    if (error.issues) {
      // Zod validation error
      throw createError({
        statusCode: 400,
        statusMessage: error.issues[0].message,
      });
    }

    if (error.statusCode) {
      throw error;
    }

    console.error("Login error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Login failed",
    });
  }
});
