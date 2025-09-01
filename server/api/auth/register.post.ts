import bcrypt from "bcryptjs";
import { createUser, getUser } from "~/server/services/user";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
  name: z.string().min(1, "Name is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate input
    const validatedData = registerSchema.parse(body);
    const { email, password, name } = validatedData;

    // Check if user already exists
    const existingUser = await getUser(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "Usuário já existe",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        image: newUser.image,
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

    console.error("Registration error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Registration failed",
    });
  }
});
