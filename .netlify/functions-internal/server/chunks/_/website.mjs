import { v4 } from 'uuid';
import { p as prisma } from './prisma.mjs';
import { a as useRuntimeConfig } from './nitro.mjs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const config = useRuntimeConfig();
const client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretKeyId
  }
});
const uploadFile = async (file, key) => {
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
      ContentType: "image/jpeg"
    };
    await client.send(new PutObjectCommand(params));
    return `https://lettergiftbucket.s3.sa-east-1.amazonaws.com/${key.trim()}`;
  } catch (error) {
    throw new Error("Failed to upload file to S3" + error);
  }
};

const getWebsite = async (websiteId) => {
  const website = await prisma.website.findUnique({
    include: {
      messages: true
    },
    where: {
      active: true,
      id: parseInt(websiteId)
    }
  });
  return website;
};
const getWebsites = async (customerEmail) => {
  const websites = await prisma.website.findMany({
    where: {
      userEmail: customerEmail
    }
  });
  return websites;
};
const createWebsite = async (website) => {
  const messages = await Promise.all(
    website.messages.map(async (msg) => ({
      message: msg.message,
      image: await uploadFile(msg.image, `${website.name.trim()}-${v4()}`)
    }))
  );
  const websiteCreated = await prisma.website.create({
    data: {
      userEmail: website.userEmail,
      name: website.name,
      theme: website.theme,
      plan: website.plan,
      songUrl: website.songUrl,
      messages: {
        create: messages
      }
    }
  });
  return websiteCreated;
};
const deleteWebsiteFailure = async (customerEmail, websiteId) => {
  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
    include: { websites: true }
  });
  if (!user) {
    throw new Error("User not found");
  }
  const website = user.websites.find((site) => site.id === parseInt(websiteId));
  if (!website) {
    throw new Error("Website not found for the given user");
  }
  await prisma.website.delete({
    where: {
      id: parseInt(websiteId)
    }
  });
};
const updateWebsiteSuccess = async (customerEmail, websiteId) => {
  await prisma.user.update({
    include: {
      websites: true
    },
    where: {
      email: customerEmail
    },
    data: {
      active: true,
      websites: {
        update: {
          where: {
            id: parseInt(websiteId)
          },
          data: {
            active: true
          }
        }
      }
    }
  });
};

export { getWebsites as a, createWebsite as c, deleteWebsiteFailure as d, getWebsite as g, updateWebsiteSuccess as u };
//# sourceMappingURL=website.mjs.map
