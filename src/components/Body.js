import RestroCardComponent from "./RestroCardComponent";
import resList from "../utils/mockData";
import {useState} from "react";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState(resList);
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