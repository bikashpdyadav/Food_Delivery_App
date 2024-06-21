import {CDN_URL} from "../utils/constants";

const RestroCardComponent = (props) => {
    const {resObj} = props;

    //destructuring
    const {
        name, 
        cuisines,
        avgRating, 
        cloudinaryImageId
    } = resObj?.info;
    const deliveryTime = resObj?.info?.sla?.deliveryTime;
    
    // Conditional rendering to handle cases where data might not be available yet
    if (!name) {
        return <div>Loading...</div>; // Or any loading indicator
    }
    
    return (
        <div className="m-4 p-4 w-64 bg-gray-200 rounded-lg hover:bg-gray-300">
            <img className="rounded-lg mb-4" alt="res-logo" src={CDN_URL+cloudinaryImageId}></img>
            <div>
                <h3 className="text-lg font-bold py-4">{name}</h3>
                <h4>{cuisines.join(", ")}</h4>
                <h4>{avgRating+' 🌟'}</h4>
                <h4>{deliveryTime} minutes</h4>
            </div>
        </div>
    );
};

export default RestroCardComponent;