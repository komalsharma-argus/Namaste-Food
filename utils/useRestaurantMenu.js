import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(MENU_URL + resId);
        const json = await res.json();
        const cards = json?.data?.data?.cards || json?.data?.cards || [];

        const info = cards.map((c) => c?.card?.card?.info).find((i) => i?.name);
        const grouped =
          cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR
            ?.cards || [];
        const cats = grouped
          .map((c) => c?.card?.card)
          .filter((c) => c?.["@type"]?.includes("ItemCategory"));

        setResInfo(info || null);
        setCategories(cats);
        if (!info) setError("Menu not available for this restaurant.");
      } catch (e) {
        setError("Could not load the menu. Please try again.");
      }
    };
    fetchMenu();
  }, [resId]);

  return { resInfo, categories, error };
};

export default useRestaurantMenu;