import { uploadFile } from "~/server/services/r2";

const getFileExtensionFromMimeType = (mimeType: string): string => {
  const mimeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg", 
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg",
    "image/gif": "gif"
  };
  return mimeToExt[mimeType] || "jpg";
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { image, userEmail } = body;

    if (!image || !userEmail) {
      throw createError({
        statusCode: 400,
        statusMessage: "Image and user email are required",
      });
    }

    // Validate base64 image format
    if (!image.startsWith("data:image")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid image format",
      });
    }

    // Generate unique filename with user email prefix for user-specific storage
    const timestamp = Date.now();
    const userPrefix = userEmail.replace(/[^a-zA-Z0-9]/g, "_"); // Sanitize email for filename
    const originalMimeType = image.split(";")[0] || "image/jpeg";
    const imageExtension = getFileExtensionFromMimeType(originalMimeType);
    const filename = `themes/${userPrefix}_${timestamp}.${imageExtension}`;

    // Upload to R2 (compression happens inside uploadFile)
    const imageUrl = await uploadFile(image, filename);

    return {
      imageUrl,
      success: true,
    };
  } catch (error) {
    console.error("Theme upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to upload theme image",
    });
  }
});