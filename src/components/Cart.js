import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="w-6/12 mx-auto my-8 p-4 border border-solid border-gray-200 rounded-3xl">
                <ItemList items={cartItems}/>
                {cartItems.length===0 ? 
                <h1 className="text-2xl font-bold">
                    Cart is Empty! Add some items to cart.
                </h1>:
                <button className="m-4 p-2 border border-solid border-gray-500 rounded-2xl bg-gray-100" 
                onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>}
            </div>
        </div>
)};

export default Cart;