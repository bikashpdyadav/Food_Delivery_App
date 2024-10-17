import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, setCartItems } from "../utils/cartSlice";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showClearCartModal, setShowClearCartModal] = useState(false); // State for Clear Cart modal
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Load Cart from localStorage on component mount
    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.uid}`);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                dispatch(setCartItems(parsedCart)); // Restore cart in Redux store
            }
        }
    }, [user, dispatch]);

    // Calculate Total Price
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) =>
            acc + (item.card.info.defaultPrice ? item.card.info.defaultPrice : item.card.info.price) * item.quantity,
            0
        ) / 100; // price is in cents
    };

    // Handle Payment with Stripe
    const handlePayment = async () => {
        if (!user) {
            setShowSignInModal(true);
            return;
        }
        if (!stripe || !elements) return;

        setProcessing(true);

        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: calculateTotal() * 100, currency: 'usd' })
        });

        const { clientSecret } = await response.json();

        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement }
        });

        if (error) {
            toast.error(`Payment failed: ${error.message}`);
        } else if (paymentIntent.status === 'succeeded') {
            toast.success("Payment successful!");
            dispatch(clearCart());
            if (user) localStorage.removeItem(`cart_${user.uid}`);
        }

        setProcessing(false);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        if (user) localStorage.removeItem(`cart_${user.uid}`);
        setShowClearCartModal(false); // Close the confirmation modal
    };

    return (
        <div className={`relative text-center m-4 p-4`}>
            <h1 className="text-2xl font-bold mb-4 md:text-3xl">Cart</h1>
            <div className="w-full max-w-4xl mx-auto my-8 p-6 border border-solid border-gray-200 rounded-lg bg-white shadow-lg">
                <ItemList items={cartItems} src={"cart"} className="space-y-4" />
                {cartItems.length === 0 ? (
                    <div>
                        <h1 className="text-xl font-bold md:text-2xl text-gray-600 mb-4">
                            Cart is Empty! Add some items to cart.
                        </h1>
                        <button
                            className="bg-green-400 py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
                            onClick={() => navigate('/')}
                        >
                            Browse Items
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-wrap justify-center sm:justify-between items-center m-6">
                            <button
                                className="bg-yellow-400 py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition-colors"
                                onClick={() => navigate('/')}
                            >
                                Add More Items
                            </button>
                            <h2 className="text-xl font-bold p-4">
                                Total: ₹{calculateTotal().toFixed(2)}
                            </h2>
                        </div>
                        <CardElement />
                        <div className="flex justify-center mt-4 space-x-4">
                            <button
                                className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                                onClick={() => setShowClearCartModal(true)} // Open confirmation modal
                            >
                                Clear Cart
                            </button>
                            <button
                                className="p-3 border border-solid border-blue-500 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={handlePayment}
                                disabled={processing || !stripe || cartItems.length === 0}
                            >
                                {processing ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Popup for Sign In First */}
            {showSignInModal && (
                <SignInFirst onCancel={() => setShowSignInModal(false)} />
            )}

            {/* Confirmation Modal for Clear Cart */}
            {showClearCartModal && (
                <ConfirmationModal
                    onConfirm={handleClearCart}
                    onCancel={() => setShowClearCartModal(false)}
                />
            )}
        </div>
    );
};

// Confirmation Modal Component
const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl shadow-black max-w-sm w-full z-50">
                <h1 className="text-lg font-bold mb-4">Are you sure you want to clear the cart?</h1>
                <div className="flex justify-between">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white text-lg rounded hover:bg-red-700"
                    >
                        Yes, Clear Cart
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-black text-lg rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const SignInFirst = ({ onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl shadow-black max-w-sm w-full z-50">
                <h1 className="text-2xl font-bold mb-4">Please sign in first</h1>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="px-4 py-2 bg-blue-600 text-white text-lg rounded mb-2 w-full hover:bg-blue-700"
                >
                    Sign In
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-black text-lg rounded w-full hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Cart;
