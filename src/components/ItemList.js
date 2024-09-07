import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    return (
        <div>
            {items.map((item) => (
                <div
                    key={item.card.info.id}
                    className="m-2 p-2 border-b-2 border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                    <div className="py-2 w-full sm:w-9/12">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{item.card.info.name}</span>
                            <span>
                                ₹
                                {item.card.info.price
                                    ? item.card.info.price / 100
                                    : item.card.info.defaultPrice / 100}
                            </span>
                        </div>
                        <p className="text-sm text-gray-700">{item.card.info.description}</p>
                    </div>
                    <div className="w-full pl-4 sm:w-3/12 flex flex-col items-center sm:items-end mt-2 sm:mt-0">
                        <img
                            className="w-32 h-24 object-cover"
                            src={CDN_URL + item.card.info.imageId}
                            alt={item.card.info.name}
                        />
                        <button
                            className="absolute bg-black text-white shadow-lg rounded-lg"
                            onClick={() => handleAddItem(item)}
                        >
                            Add +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
