import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_URL } from "../../utils/constants";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(RESTAURANT_LIST_URL);
      if (!res.ok) throw new Error("Request failed: " + res.status);
      const json = await res.json();
      const cards = json?.data?.data?.cards || json?.data?.cards || [];
      const restaurants = (
        cards
          .map((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
          .find(Boolean) || []
      ).filter((r) => r?.info?.id);
      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (e) {
      setError("Could not load restaurants. Please try again.");
    }
  };

  if (!onlineStatus) return <h1>Looks like you're offline. Check your connection.</h1>;
  if (error) return <h2>{error}</h2>;
  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() =>
              setFilteredRestaurants(
                listOfRestaurants.filter((r) =>
                  r.info.name.toLowerCase().includes(searchText.toLowerCase())
                )
              )
            }
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() =>
            setFilteredRestaurants(
              listOfRestaurants.filter((r) => r.info.avgRating > 4.3)
            )
          }
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="res-link"
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;