import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold mb-4 md:text-3xl">Cart</h1>
            <div className="w-full max-w-4xl mx-auto my-8 p-4 border border-solid border-gray-200 rounded-3xl bg-white shadow-md">
                <ItemList items={cartItems} />
                {cartItems.length === 0 ? (
                    <h1 className="text-xl font-bold md:text-2xl">
                        Cart is Empty! Add some items to cart.
                    </h1>
                ) : (
                    <button
                        className="m-4 p-2 border border-solid border-gray-500 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
