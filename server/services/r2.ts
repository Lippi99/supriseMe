import sharp from "sharp";

const config = useRuntimeConfig();

export const generateUserFolder = (userEmail: string): string => {
  const sanitizedEmail = userEmail.replace(/[^a-zA-Z0-9@.-]/g, "_");
  const fullDate = new Date().toISOString().replace(/[:.]/g, "-");
  return `${sanitizedEmail}-${fullDate}`;
};

const compressImage = async (
  buffer: Buffer,
  mimeType: string
): Promise<{ buffer: Buffer; mimeType: string }> => {
  // SVGs don't need compression and should be preserved as-is
  if (mimeType === "image/svg+xml") {
    return { buffer, mimeType };
  }

  try {
    let compressedBuffer: Buffer;
    let outputMimeType = mimeType;

    const sharpInstance = sharp(buffer).rotate();

    // Determine optimal format and compression
    if (mimeType === "image/png") {
      compressedBuffer = await sharpInstance
        .png({ quality: 85, compressionLevel: 8 })
        .toBuffer();
    } else if (mimeType === "image/webp") {
      compressedBuffer = await sharpInstance.webp({ quality: 85 }).toBuffer();
    } else {
      // Convert everything else to JPEG for better compression
      compressedBuffer = await sharpInstance
        .jpeg({ quality: 85, progressive: true })
        .toBuffer();
      outputMimeType = "image/jpeg";
    }

    // Only use compressed version if it's actually smaller
    if (compressedBuffer.length < buffer.length) {
      return { buffer: compressedBuffer, mimeType: outputMimeType };
    }

    return { buffer, mimeType };
  } catch (error) {
    console.warn("Image compression failed, using original:", error);
    return { buffer, mimeType };
  }
};

export const uploadFile = async (file: string, key: string) => {
  try {
    // Extract MIME type from base64 data URL
    const mimeTypeMatch = file.match(/^data:([^;]+);base64,/);
    const originalMimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";

    // Convert base64 to buffer
    const originalBuffer = Buffer.from(
      file.replace(/^data:image\/[^;]+;base64,/, ""),
      "base64"
    );

    // Compress the image
    const { buffer, mimeType } = await compressImage(
      originalBuffer,
      originalMimeType
    );

    // Cloudflare R2 REST API endpoint
    const url = `https://api.cloudflare.com/client/v4/accounts/${config.r2.accountId}/r2/buckets/${config.r2.bucketName}/objects/${key}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.r2.apiToken}`,
        "Content-Type": mimeType,
        "Content-Length": buffer.length.toString(),
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `R2 upload failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    // Return the public URL for the uploaded image
    return `https://${config.r2.publicDomain}/${key.trim()}`;
  } catch (error) {
    throw new Error("Failed to upload file to R2: " + error);
  }
};
