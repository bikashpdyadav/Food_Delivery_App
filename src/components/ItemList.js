import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemList = ({ items, src }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        console.log(item);
        dispatch(addItem(item));
        toast("Item Added to Cart!");
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast("Item Removed from Cart!");
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
                    <div className="w-full pl-4 sm:w-3/12 flex flex-col items-center sm:items-end mt-2 sm:mt-0 relative">
                        <img
                            className="w-32 h-24 object-cover"
                            src={CDN_URL + item.card.info.imageId}
                            alt={item.card.info.name}
                        />
                        {
                            src === "cart" ? 
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center text-2xl font-bold bg-white">
                                    {items.length}
                                </div> :
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                    <button
                                        className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                                        onClick={() => handleAddItem(item)}
                                    >
                                        +
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default ItemList;
