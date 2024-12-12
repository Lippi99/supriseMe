import { p as prisma } from './prisma.mjs';

const createUser = async (data) => {
  const user = await prisma.user.create({
    data
  });
  return user;
};
const getUser = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });
  return user;
};

export { createUser as c, getUser as g };
//# sourceMappingURL=user.mjs.map
