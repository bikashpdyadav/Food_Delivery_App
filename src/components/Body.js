import RestroCardComponent from "./RestroCardComponent";
import resList from "../utils/mockData";
import {useEffect, useState} from "react";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState(resList);
  
  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }
  , []);
    return (
        <div className="body">
            <div className="filter">
              <button className="filter-btn" onClick={() => {
                setListofRestaurants(ListofRestaurants.filter((res) => res.info.avgRating>4.3));
              }}>Top Rated Restaurants</button>
            </div>
            <div className="restro-container">
              {
                ListofRestaurants.map(restaurant => <RestroCardComponent key={restaurant.info.id} resObj={restaurant}/>)
              }
            </div>
        </div>
    );
};

export default Body;