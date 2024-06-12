import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png?nwm=1&nws=1&industry=fast-food&txt_keyword=All"></img>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

const RestroCardComponent = () => {
    return (
        <div className="restro-card">
            <img className="res-logo" alt="res-logo" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/11/7f76a072-c1bc-4d74-ac56-33e0eea20c1e_5938.JPG"></img>
            <h3>Burger King</h3>
            <h4>Burger, American</h4>
            <h4>4.3 stars</h4>
            <h4>25-30 minutes</h4>
        </div>
    )
}

const Body = () => {
    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="restro-container">
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
                <RestroCardComponent/>
            </div>
        </div>
    )
}

const AppLayout = () => {
    return (
        <div className="app">
            <Header/>
            <Body/>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>);