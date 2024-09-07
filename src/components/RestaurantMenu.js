import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [showIndex, setShowIndex] = useState({ value: false, idx: null });
    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwo, avgRating } = resInfo?.cards[2]?.card?.card?.info;
    const { cards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
    const categories = cards.filter(
        (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    return (
        <div className="p-4">
            <div className="text-center mb-6">
                <h1 className="font-extrabold text-2xl">{name}</h1>
                <p className="font-bold text-lg">
                    {cuisines.join(', ')} - ₹{costForTwo / 100} for two
                </p>
            </div>
            {categories.map((category, index) => (
                <RestaurantCategory
                    key={index}
                    data={category?.card?.card}
                    setshowIndex={() =>
                        setShowIndex({
                            value: !(showIndex.idx === index && showIndex.value),
                            idx: index,
                        })
                    }
                    showItems={index === showIndex.idx && showIndex.value}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;
