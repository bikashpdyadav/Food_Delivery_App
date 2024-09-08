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
        <div className="group relative m-4 p-4 w-full sm:w-64 bg-gray-200 rounded-lg shadow-md transition-colors transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg duration-300">
            <img
                className="w-full h-32 object-cover rounded-lg mb-4 group-hover:bg-gray-300 transition-colors"
                alt="Restaurant Logo"
                src={CDN_URL + cloudinaryImageId}
            />
            <div className="h-24 overflow-hidden relative group-hover:h-auto">
                <h3 className="text-lg font-bold mb-2">{name}</h3>
                <p className="text-sm text-gray-700 mb-1 truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-h-full">
                    {cuisines.join(", ")}
                </p>

                <p className="text-sm text-gray-700 mb-1 hidden group-hover:block">{avgRating} 🌟</p>
                <p className="text-sm text-gray-700 hidden group-hover:block">{deliveryTime} minutes</p>
                <span className="absolute bottom-0 left-0 text-4xl text-gray-600 cursor-pointer group-hover:hidden">...</span>
            </div>
        </div>
    );
};

export default RestroCardComponent;
