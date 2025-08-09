import { v4 as uuidv4 } from "uuid";
import prisma from "~/lib/prisma";
import { uploadFile, generateUserFolder } from "./r2";
import { IWebsite } from "~/models/IWebsite";

export const getWebsite = async (websiteGuid: string) => {
  const website = await prisma.website.findUnique({
    include: {
      messages: true,
    },
    where: {
      guid: websiteGuid,
      active: true,
    },
  });
  return website;
};

export const getWebsiteById = async (websiteId: string) => {
  const website = await prisma.website.findUnique({
    include: {
      messages: true,
    },
    where: {
      active: true,
      id: parseInt(websiteId),
    },
  });
  return website;
};

export const getWebsites = async (customerEmail: string) => {
  const websites = await prisma.website.findMany({
    where: {
      userEmail: customerEmail,
    },
  });
  return websites;
};

export const createWebsite = async (website: IWebsite) => {
  const userFolder = generateUserFolder(website.userEmail);
  const messages = await Promise.all(
    website.messages.map(async (msg) => ({
      message: msg.message,
      image: await uploadFile(msg.image, `${userFolder}/${website.name.trim()}-${uuidv4()}`),
    }))
  );

  const websiteCreated = await prisma.website.create({
    data: {
      userEmail: website.userEmail,
      name: website.name,
      theme: website.theme,
      plan: website.plan,
      songUrl: website.songUrl,
      customThemeImage: website.customThemeImage,
      messages: {
        create: messages,
      },
    },
  });
  return websiteCreated;
};

export const deleteWebsiteFailure = async (
  customerEmail: string,
  websiteId: string
) => {
  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
    include: { websites: true },
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
      id: parseInt(websiteId),
    },
  });
};

export const updateWebsiteSuccess = async (
  customerEmail: string,
  websiteId: string
) => {
  await prisma.user.update({
    include: {
      websites: true,
    },
    where: {
      email: customerEmail,
    },
    data: {
      active: true,
      websites: {
        update: {
          where: {
            id: parseInt(websiteId as string),
          },
          data: {
            active: true,
          },
        },
      },
    },
  });
};
