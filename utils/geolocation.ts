export async function getUserLocationFromIP() {
  const data = await $fetch<{countryCode: string}>("http://ip-api.com/json/");
  return data?.countryCode || "US";
}
