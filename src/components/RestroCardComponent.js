import {CDN_URL} from "../utils/constants";

const RestroCardComponent = (props) => {
    const {resObj} = props;

    //destructuring
    const {name, cuisines, avgRating, cloudinaryImageId} = resObj?.info;
    const deliveryTime = resObj?.info?.sla?.deliveryTime;
    
    // Conditional rendering to handle cases where data might not be available yet
    if (!name) {
        return <div>Loading...</div>; // Or any loading indicator
    }
    
    return (
        <div className="restro-card">
            <img className="res-logo" alt="res-logo" src={CDN_URL+cloudinaryImageId}></img>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating+' 🌟'}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    );
};

export default RestroCardComponent;