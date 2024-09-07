import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-wrap justify-between items-center bg-pink-100 shadow-lg mb-2 p-4">
            <img className="w-20 sm:w-28" src={LOGO_URL} alt="Logo" />

            {/* for large screens */}
            <ul className="hidden lg:flex text-xl md:text-2xl lg:text-3xl">
                <li className="px-2 sm:px-4 font-bold text-lg">
                    Online Status: {onlineStatus ? "🟢" : "🔴"}
                </li>
                <li className="px-2 sm:px-4 font-bold text-lg">
                    <Link to="/">Home</Link>
                </li>
                <li className="px-2 sm:px-4 font-bold text-lg">
                    <Link to="/about">About Us</Link>
                </li>
                <li className="px-2 sm:px-4 font-bold text-lg">
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li className="px-2 sm:px-4 font-bold text-lg">
                    <Link to="/cart">Cart({cartItems.length})</Link>
                </li>
                <li className="px-2 sm:px-4 font-bold text-lg">
                    <button>{loggedInUser}</button>
                </li>
            </ul>

            {/* for all screens except large */}
            <div className="relative lg:hidden">
                <button
                    className="font-bold px-3 py-2 rounded transition-colors"
                    onClick={toggleDropdown}
                >
                    Menu
                </button>
                {isDropdownOpen && (
                    <ul
                        ref={dropdownRef} // Attach ref to the dropdown
                        className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20"
                    >
                        <li
                            className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                navigate('/');
                                setIsDropdownOpen(false);
                            }}
                        >
                            Home
                        </li>
                        <li
                            className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                navigate('/about');
                                setIsDropdownOpen(false);
                            }}
                        >
                            About Us
                        </li>
                        <li
                            className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                navigate('/contact')
                                setIsDropdownOpen(false);
                            }}
                        >
                            Contact Us
                        </li>
                        <li
                            className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                navigate('/cart')
                                setIsDropdownOpen(false);
                            }}
                        >
                            Cart
                        </li>
                        <li
                            className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setIsDropdownOpen(false);
                            }}
                        >
                            {loggedInUser}
                        </li>
                    </ul>
                )}
            </div>
            {showScrollTop && (
                <button
                    className="fixed bottom-8 right-8 p-4 text-black bg-gray-400 rounded-full shadow-md hover:bg-gray-500 transition-colors"
                    onClick={scrollToTop}
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default Header;
