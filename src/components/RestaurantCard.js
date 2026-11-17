import { CDN_URL } from "../../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData.info;

  return(
    <div className="res-card">
      <img 
      className="res-logo"
      alt={name} 
      src = { CDN_URL + cloudinaryImageId }
      onError={(e) => (e.target.src = "https://placehold.co/660x440?text=No+Image")}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} ★</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;