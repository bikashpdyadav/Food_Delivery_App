import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
    const [resInfo, setresInfo] = useState(null);
    const {resId} = useParams();
    useEffect(() => {
        fetchMenu();
    },[]);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API+resId);
        const json = await data.json();
        console.log(json);
        setresInfo(json.data);
    };

    if(resInfo === null) return <Shimmer/>;

    const {name, cuisines, costForTwo, avgRating} = resInfo?.cards[2]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[6]?.card?.card;
    //console.log(itemCards);
    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(', ')} - {costForTwo/100+' for two'}</p>
            <h2>{avgRating+' stars'}</h2>
            <h2>Menu</h2>
            <ul>
                {
                    itemCards.map((item) => <li key={item.card.info.id}>{item.card.info.name} - {'Rs. '+item.card.info.price}</li>)
                }
            </ul>
        </div>
    );
};

export default RestaurantMenu;