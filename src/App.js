import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import Contact from "./components/Contact"; 
import About from "./components/About";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  // Ensure this is imported



const stripePromise = loadStripe("pk_test_51Q8jq8Ftd15Us6gbZkqd3fl8hIaEQw00HfvU7c0Usrqb5PqB5dM46dbedGFuWRLQf4JL6uVhoQAMXfpijtM5yOyg00DEJEKCCR");
const AppLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'; 
    //const [userName,setuserName] = useState("Write your name!!");
    // useEffect(() => {
    //     const data = {name:"Bikash",};
    //     setuserName(data.name);
    // });
    return (
        <Provider store={appStore}>
            <Elements stripe={stripePromise}>
                <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow"><Outlet /></main>
                {!isAuthPage && <Contact />}
                </div>
            </Elements>
            {/* <UserContext.Provider value = {{loggedInUser:userName,setuserName}}>    
            </UserContext.Provider> */}
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>,
            },
            {
                path: "/cart",
                element: <Cart/>,
            },
            {
                path: "/login",
                element: <Login/>,
            }
        ],
        errorElement: <Error/>,
    },
    
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);