// import { getServerSession } from "#auth";

// export default eventHandler(async (event) => {
//   const session = await getServerSession(event);
//   if (session) {
//     return {
//       status: 200,
//       message: "Authorized",
//       ...session,
//     };
//   }
//   return {
//     status: 401,
//     message: "Unauthorized",
//   };
// });
