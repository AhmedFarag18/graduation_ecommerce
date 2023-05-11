import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import productsSlice from "./slices/products-slice";
import authSlice from "./slices/auth-slice";
// import searchSlice from "./slices/search-slice";
import basketSlice from "./slices/Basket/basket-slice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        // searchProducts: searchSlice,
        cart: cartSlice,
        basket: basketSlice,
        auth: authSlice,
    }
});