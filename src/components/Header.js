import { LOGO_URL } from "../utils/constants";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import DisplayUserCard from "./DisplayUserCard";

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const cartItems = useSelector((store) => store.cart.items);
    const user = useSelector((store) => store.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const isAuthPage = location.pathname === '/login';

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

    const scrollToFooter = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    const handleButtonClick = () => {
        if (!user) navigate('/login');
    }

    return (
        <div className="flex flex-wrap justify-between items-center bg-pink-100 shadow-lg p-4">
            <img className="w-20 sm:w-28" src={LOGO_URL} alt="Logo" />

            {!isAuthPage &&
                <div>
                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex text-xl md:text-2xl lg:text-3xl">
                        <li className="px-2 sm:px-4 font-bold text-lg">
                            Online Status: {onlineStatus ? "🟢" : "🔴"}
                        </li>
                        <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
                            Home
                        </li>
                        <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/about")}>
                            About Us
                        </li>
                        <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={scrollToFooter}>
                            Contact Us
                        </li>
                        <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/cart")}>
                            Cart ({cartItems.length})
                        </li>
                        <li className="px-2 sm:px-4 font-bold text-lg">
                            <button onClick={() => handleButtonClick()}>
                                {user ? <DisplayUserCard /> : "Sign In"}
                            </button>
                        </li>
                    </ul>

                    {/* Mobile Menu */}
                    <div className="relative lg:hidden flex">
                        <button
                            className="font-bold px-3 py-2"
                            onClick={toggleDropdown}
                        >
                            Menu
                        </button>
                        <button
                            className="font-bold px-3 py-2 cursor-pointer"
                            onClick={() => {
                                navigate("/login");
                                setIsDropdownOpen(false);
                            }}
                        >
                            {user ? <DisplayUserCard /> : "Sign In"}
                        </button>
                        {isDropdownOpen && (
                            <ul
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20"
                            >
                                <li
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        navigate("/");
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    Home
                                </li>
                                <li
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        navigate("/about");
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    About Us
                                </li>
                                <li
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        scrollToFooter();
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    Contact Us
                                </li>
                                <li
                                    className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        navigate("/cart");
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    Cart
                                </li>
                            </ul>
                        )}
                    </div>

                    {showScrollTop && (
                        <button
                            className="fixed bottom-8 right-8 p-4 text-black bg-pink-200 rounded-[100%] shadow-md hover:bg-pink-300 transition-colors z-50"
                            onClick={scrollToTop}
                        >
                            ↑
                        </button>
                    )}
                </div>
            }
        </div>
    );
};

export default Header;
