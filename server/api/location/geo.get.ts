export default defineEventHandler(async () => {
  const data = await $fetch<{country: string}>("https://api.country.is/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    
    }
  });
  return data?.country || "US";
});
