import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({data,setshowIndex,showItems})=> {
    //console.log(data);
    const handleClick = () => {
        setshowIndex();
    }
    return (
        <div>
            <div className="w-6/12 mx-auto my-8 bg-gray-100 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">{data.title}({data.itemCards.length})</span>
                    <span className="flex items-center">🔻</span>
                </div>
                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        </div>
    )
};

export default RestaurantCategory;