import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";  // Add the user slice

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,  // Add the user reducer
    },
});

export default appStore;