import prisma from "~/lib/prisma";

export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

export const getUser = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};
