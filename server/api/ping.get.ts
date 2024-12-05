export default defineEventHandler(async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "ping" }),
  };
});
