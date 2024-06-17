import RestroCardComponent from "./RestroCardComponent";
import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [SearchText, setSearchText] = useState("");
  
  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const json = await response.json();
      console.log(json);
      setListofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setfilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    fetchData();
  }
  , []);

  return ListofRestaurants.length === 0 ? <Shimmer/> : (
        <div className="body">
            <div className="filter">
              <div className="search">
                <input type="input" 
                className="search-box" 
                value={SearchText} 
                onChange={(e)=>{
                  setSearchText(e.target.value);
                }}/>
                <button className="search-button" onClick={()=>{
                  console.log(SearchText);
                  setfilteredRestaurants(ListofRestaurants.filter((res)=> res.info.name.toLowerCase().includes(SearchText)));
                }}>Search</button>
              </div>

              <button className="filter-btn" onClick={() => {
                setfilteredRestaurants(ListofRestaurants.filter((res) => res.info.avgRating>4.3));
              }}>Top Rated Restaurants</button>
            </div>
            <div className="restro-container">
              {
                filteredRestaurants.map(restaurant => <RestroCardComponent key={restaurant.info.id} resObj={restaurant}/>)
              }
            </div>
        </div>
    );
};

export default Body;