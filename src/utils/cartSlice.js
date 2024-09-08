import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state,action) => {
            state.items.push(action.payload);
            console.log(state.items.length);
        },
        removeItem: (state,action) => {
            state.items = state.items.filter(item => 
                item.card.info.id !== action.payload.card.info.id || 
                item.card.info.price !== action.payload.card.info.price
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;