import { v4 as uuidv4 } from "uuid";
import prisma from "~/lib/prisma";
import { IWebsite } from "../model/website";
import { uploadFile } from "./aws";
import { getUser } from "./user";

export const createWebsite = async (website: IWebsite) => {
  const messages = await Promise.all(
    website.messages.map(async (msg) => ({
      message: msg.message,
      image: await uploadFile(msg.image, `${website.name.trim()}-${uuidv4()}`),
    }))
  );

  await prisma.website.create({
    data: {
      userEmail: website.userEmail,
      name: website.name,
      theme: website.theme,
      messages: {
        create: messages,
      },
    },
  });
};
