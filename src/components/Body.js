import RestroCardComponent from "./RestroCardComponent";
import {useEffect, useState, useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [ListofRestaurants, setListofRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const {loggedInUser,setuserName} = useContext(UserContext);
  //console.log(ListofRestaurants);
  useEffect(() => {
    const fetchData = async () =>{
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const json = await response.json();
      
      setListofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setfilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return <h1>Looks like your are offline!! Check your internet connection</h1>
  
  return ListofRestaurants.length === 0 ? <Shimmer/> : (
        <div className="body">
            <div className="flex items-center justify-center my-4">
              <div className="flex items-center justify-center">
                <input type="input" 
                className="border border-solid border-black " 
                value={SearchText} 
                onChange={(e)=>{
                  setSearchText(e.target.value);
                }}/>
                <button className="m-2 px-4 py-0.5 bg-amber-300 rounded-lg hover:bg-amber-400" 
                onClick={()=>{
                  setfilteredRestaurants(ListofRestaurants.filter((res)=> res.info.name.toLowerCase().includes(SearchText)));
                }}>Search</button>
              </div>

              <button className="border border-solid border-black px-4 font-bold rounded-lg hover:bg-gray-200" onClick={() => {
                setfilteredRestaurants(ListofRestaurants.filter((res) => res.info.avgRating>4.3));
              }}>Top Rated Restaurants</button>

              <div className="m-4 p-4 flex items-center">
                <label>UserName</label>
                <input type="input" 
                className="border border-solid border-black m-2" 
                value={loggedInUser}
                onChange={(e) => {setuserName(e.target.value)}}/>
              </div>
            </div>

            <div className="flex flex-wrap mx-11">
              {
                filteredRestaurants.map(restaurant => 
                <Link 
                key={restaurant.info.id} 
                to={"/restaurant/"+restaurant.info.id}>
                  <RestroCardComponent resObj={restaurant}/>
                </Link>)
              }
            </div>
        </div>
  );
};

export default Body;