import { v4 as uuidv4 } from "uuid";
import prisma from "~/lib/prisma";
import { uploadFile } from "./aws";
import { IWebsite } from "~/models/IWebsite";

export const getWebsite = async (websiteId: string) => {
  const website = await prisma.website.findUnique({
    include: {
      messages: true,
    },
    where: {
      id: parseInt(websiteId),
    },
  });
  return website;
};

export const createWebsite = async (website: IWebsite) => {
  const messages = await Promise.all(
    website.messages.map(async (msg) => ({
      message: msg.message,
      image: await uploadFile(msg.image, `${website.name.trim()}-${uuidv4()}`),
    }))
  );

  const websiteCreated = await prisma.website.create({
    data: {
      userEmail: website.userEmail,
      name: website.name,
      theme: website.theme,
      plan: website.plan,
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
  await prisma.user.update({
    include: {
      Websites: true,
    },
    where: {
      email: customerEmail,
    },
    data: {
      active: true,
      Websites: {
        delete: {
          id: parseInt(websiteId as string),
        },
      },
    },
  });
};

export const updateWebsiteSuccess = async (
  customerEmail: string,
  websiteId: string
) => {
  await prisma.user.update({
    include: {
      Websites: true,
    },
    where: {
      email: customerEmail,
    },
    data: {
      active: true,
      Websites: {
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
