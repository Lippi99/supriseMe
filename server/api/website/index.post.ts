import { createUser, getUser } from "~/server/services/user";
import { createWebsite } from "~/server/services/website";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const user = await getUser(body.userEmail);

    if (!user) {
      console.log(user)
      await createUser(body.googleUserData);
    }

    // if (!user?.active) {
    //   return createError({
    //     statusCode: 400,
    //     statusMessage: "User is not subscribed",
    //   });
    // }

    const website = await createWebsite(body);
    if (!website) {
      return createError({
        statusCode: 400,
        statusMessage: "Website could not be created",
      });
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Website created",
        websiteId: website.id,
        websiteGuid: website.guid,
      }),
    };
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error" + e,
    });
  }
});
