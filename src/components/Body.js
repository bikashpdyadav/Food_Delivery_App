import RestroCardComponent from "./RestroCardComponent";
import resList from "../utils/mockData";
import {useEffect, useState} from "react";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState(resList);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proxyUrl = 'https://cors.bridged.cc/';
        const targetUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
        const response = await fetch(proxyUrl + targetUrl);
        const json = await response.json();
        console.log(json);
        setListofRestaurants(json.data.cards); // Adjust based on the actual structure of your JSON response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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