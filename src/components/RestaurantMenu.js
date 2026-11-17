import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { resInfo, categories, error } = useRestaurantMenu(resId);
  const [openIndex, setOpenIndex] = useState(0);

  if (error) return <h2 className="menu">{error}</h2>;
  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage, avgRating } = resInfo;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines?.join(", ")} — {costForTwoMessage} — {avgRating} ★
      </p>
      {categories.map((cat, i) => (
        <RestaurantCategory
          key={cat.title + i}
          data={cat}
          isOpen={i === openIndex}
          toggle={() => setOpenIndex(i === openIndex ? null : i)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;