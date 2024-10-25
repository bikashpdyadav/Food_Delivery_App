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
import OrderSuccessPage from './components/OrderSuccessPage';


const AppLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <Provider store={appStore}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow"><Outlet /></main>
                {!isAuthPage && <Contact />}
            </div>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/success",
                element: <OrderSuccessPage />,
            }
        ],
        errorElement: <Error />,
    },

]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);