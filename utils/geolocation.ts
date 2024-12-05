export async function getUserLocationFromIP() {
  const response = await fetch("http://ip-api.com/json/");
  const data = await response.json();
  return data?.countryCode || "US";
}
