export async function getUserLocationFromIP() {
  const data = await $fetch<{country_code: string}>("https://geolocation-db.com/json/");
  return data?.country_code || "US";
}
