import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFile = async (file: string, key: string) => {
  try {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const params = {
      Bucket: "lettergiftbucket",
      Key: key,
      ContentEncoding: "base64",
      Body: buffer,
      ContentType: "image/jpeg",
    };

    await client.send(new PutObjectCommand(params));
    return `https://lettergiftbucket.s3.sa-east-1.amazonaws.com/${key.trim()}`;
  } catch (error) {
    throw new Error("Failed to upload file to S3" + error);
  }
};
