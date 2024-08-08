import { CDN_URL } from "../utils/constants";

const ItemList = ({items})=> {
    //console.log(items);
    return (
        <div>
            {items.map((item) => 
                <div key={item.card.info.id} className="m-2 p-2 border-b-2 border-gray-300">
                    <div className="py-2">
                        <span>{item.card.info.name}</span>
                        <span>
                            - ₹
                            {item.card.info.price?item.card.info.price/100:item.card.info.defaultPrice/100}
                        </span>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-9/12">
                            <p className="text-sm mr-2">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12">
                            <div className="absolute">
                                <button className="p-1 mt-16 bg-black text-white shadow-lg rounded-lg">
                                    Add +
                                </button>
                            </div>
                            <img className="w-9/12 h-24" src={CDN_URL+item.card.info.imageId}></img>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default ItemList;