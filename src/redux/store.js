import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import productsSlice from "./slices/products-slice";
import authSlice from "./slices/auth-slice";
import orderSlice from "./slices/order-slice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        auth: authSlice,
        order: orderSlice
    }
});