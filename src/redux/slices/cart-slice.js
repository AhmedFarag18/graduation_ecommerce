import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "../../components/Toast";

const cartSlice = createSlice({
    initialState: JSON.parse(localStorage.getItem('cart')) || [],
    name: "cartSlice",
    reducers: {

        addToCart: (state, action) => {
            const findProduct = state.find(product => product.id === action.payload.id)
            if (findProduct) {
                findProduct.quantity += action.payload.quantity;
            } else {
                const productClone = { ...action.payload };
                state.push(productClone);
            }
            localStorage.setItem('cart', JSON.stringify(state));
            Toast.fire({
                icon: 'success',
                title: 'Product added to Cart'
            })
        },

        deleteFromCart: (state, action) => {
            // return (state.filter((product) => (product.id !== action.payload.id)))
            localStorage.setItem('cart', JSON.stringify(state.filter((product) => (product.id !== action.payload.id))))
            return state.filter((product) => (product.id !== action.payload.id));
        },

        clearCart: (state, action) => {
            return [];
        },
    },
})
export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer