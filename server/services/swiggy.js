const SWIGGY_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5";

const getRestaurants = async (lat, lng) => {
  const url = new URL(SWIGGY_URL);

  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  url.searchParams.set("is-seo-homepage-enabled", "true");
  url.searchParams.set("page_type", "DESKTOP_WEB_LISTING");

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/139.0.0.0 Safari/537.36",

      Accept: "application/json",

      "Accept-Language": "en-US,en;q=0.9",

      Referer: "https://www.swiggy.com/",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Swiggy API returned ${response.status}`
    );
  }

  return await response.json();
};

module.exports = {
  getRestaurants,
};