export default defineEventHandler(async () => {
  const data = await $fetch<{country_code: string}>("https://geolocation-db.com/json/");
  return data?.country_code || "US";
});
