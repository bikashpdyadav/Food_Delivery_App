import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold mb-4 md:text-3xl">Cart</h1>
            <div className="w-full max-w-4xl mx-auto my-8 p-6 border border-solid border-gray-200 rounded-lg bg-white shadow-lg">
                <ItemList items={cartItems} src={"cart"} className="space-y-4" />
                {cartItems.length === 0 ? (
                    <h1 className="text-xl font-bold md:text-2xl text-gray-600">
                        Cart is Empty! Add some items to cart.
                    </h1>
                ) : (
                    <div className="flex justify-center mt-4">
                        <button
                            className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
