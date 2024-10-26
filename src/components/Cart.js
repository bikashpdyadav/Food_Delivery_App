import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, setCartItems } from "../utils/cartSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGO_URL } from '../utils/constants';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/payment/orders",{totalAmount});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        //console.log(result.data, "hi");
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: process.env.DASHBOARD_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Food_Delivery_App",
            description: "Test Transaction",
            image: { LOGO_URL },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(
                    "http://localhost:5000/payment/success",
                    data
                );
                
                if (result.status === 200) {
                    dispatch(clearCart());
                    localStorage.removeItem(`cart_${user.uid}`);
                    navigate('/success', { state: { amount: totalAmount/100, id: order_id } });
                }
            },
            prefill: {
                name: "Food_Delivery_App",
                email: "team@food_delivery_app.com",
                contact: "9999999999",
            },
            notes: {
                address: "BDA, AMBEDKAR INSTITUTE OF TECHNOLOGY, Outer Ring Rd, Near Gnana Bharati, 2<sup>nd</sup> Stage, Nagarbhavi, Bengaluru, Karnataka, 560056",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

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
        const total = cartItems.reduce(
            (acc, item) =>
                acc + (item.card.info.defaultPrice ? item.card.info.defaultPrice : item.card.info.price) * item.quantity,
            0
        );
        return total;
    };
    useEffect(() => {
        setTotalAmount(calculateTotal());
    }, []);

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
                                Total: ₹{(totalAmount/100).toFixed(2)}
                            </h2>
                        </div>
                        <div className="flex justify-center mt-4 space-x-4">
                            <button
                                className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                                onClick={() => setShowClearCartModal(true)} // Open confirmation modal
                            >
                                Clear Cart
                            </button>
                            <button
                                className="p-3 border border-solid border-blue-500 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onClick={() => {
                                    if (user) {
                                        displayRazorpay();
                                    } else {
                                        setShowSignInModal(true);
                                    }
                                }}
                                disabled={cartItems.length === 0}
                            >
                                Pay Now
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
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl shadow-black max-w-sm w-full z-50">
                <h1 className="text-2xl font-bold mb-4">Please sign in first</h1>
                <button
                    onClick={() => navigate('/login')}
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
