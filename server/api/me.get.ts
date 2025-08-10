export default eventHandler(async () => {
  // TODO: Implement server-side session management
  // For now, this endpoint is not needed with client-side auth
  return {
    status: 501,
    message: "Not implemented - client-side auth only",
  };
});
