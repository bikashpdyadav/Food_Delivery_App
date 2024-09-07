import { CDN_URL } from "../utils/constants";

const RestroCardComponent = (props) => {
    const { resObj } = props;

    // Destructuring
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
        <div className="m-4 p-4 w-full sm:w-64 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-colors">
            <img
                className="w-full h-32 object-cover rounded-lg mb-4"
                alt="Restaurant Logo"
                src={CDN_URL + cloudinaryImageId}
            />
            <div>
                <h3 className="text-lg font-bold mb-2">{name}</h3>
                <p className="text-sm text-gray-700 mb-1">{cuisines.join(", ")}</p>
                <p className="text-sm text-gray-700 mb-1">{avgRating} 🌟</p>
                <p className="text-sm text-gray-700">{deliveryTime} minutes</p>
            </div>
        </div>
    );
};

export default RestroCardComponent;
