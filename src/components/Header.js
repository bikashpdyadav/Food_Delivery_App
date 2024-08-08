import {LOGO_URL} from "../utils/constants";
import {useState,useContext} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
    //let btnName = "Login";
    const [btnNameReact,setbtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const {loggedInUser} = useContext(UserContext);
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg mb-2">
            <div className="logo-container">
                <img className="w-40" src={LOGO_URL}></img>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4 font-bold text-lg">
                        Online Status: {onlineStatus ? "🟢":"🔴"}
                    </li>
                    <li className="px-4 font-bold text-lg">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4 font-bold text-lg">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-4 font-bold text-lg">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4 font-bold text-lg">
                        Cart
                    </li>
                    <button className="px-4 font-bold text-lg" onClick={()=>{
                        btnNameReact === "Login" ? setbtnNameReact("Logout"): setbtnNameReact(loggedInUser);
                    }}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;