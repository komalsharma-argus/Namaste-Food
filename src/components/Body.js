import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch("http://localhost:5000/api/restaurants?lat=23.02760&lng=72.58710");

        const json = await response.json();
        console.log(json);

        setListOfRestaurants(json?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

        } catch (error) {
            console.error(error);
        }
    };

    return listOfRestaurants.length === 0 ? ( 
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input 
                    type="text"
                    className="search-box"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                    />
                    <button onClick={() => {
                        const filteredRestaurant = listOfRestaurants.filter((res) => 
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(filteredRestaurant);
                    }}
                    >Search
                    </button>
                </div>
                <button 
                className="filter-btn"
                onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (restaurant) => restaurant.info.avgRating >= 4.2 );
                    setListOfRestaurants(filteredList);
                }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
            {filteredRestaurant.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
            ))}
            </div>
        </div>
  );
};

export default Body;