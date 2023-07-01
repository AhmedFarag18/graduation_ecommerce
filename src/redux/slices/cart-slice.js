import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createNewBasket, updateBasket } from "./basket-slice";
import axios from "axios";
import { API_URL } from "../../App";
import { useSelector } from "react-redux";

const cartSlice = createSlice({
    initialState: {
        basketItems: JSON.parse(localStorage.getItem('cart')) || [],
    },
    name: "cartSlice",
    reducers: {

        addToCart: (state, action) => {
            const findProduct = state.basketItems.find(product => product.id === action.payload.id)
            if (findProduct) {
                findProduct.quantity += action.payload.quantity;
            } else {
                const itemToAdd = mapProductItemToBasketItem(action.payload);
                state.basketItems.push(itemToAdd);
            }
            localStorage.setItem('cart', JSON.stringify(state.basketItems));
            updateBasket(state);
            toast.success('product added to cart');
        },
        getCart: (state, action) => {
            if (localStorage.getItem('cart_id')) {
                axios.get(`${API_URL}/Basket?id=${localStorage.getItem('cart_id')}`)
                    .then(data => {
                        const lastData = data.data.basketItems;
                        localStorage.setItem('cart', JSON.stringify(lastData));
                    })
            } else {
                createNewBasket(state)
                console.log("Don't have any basket");
            }
        },
        deleteFromCart: (state, action) => {
            state.basketItems = state.basketItems.filter((product) => (product.id !== action.payload.id));
            localStorage.setItem('cart', JSON.stringify(state.basketItems.filter((product) => (product.id !== action.payload.id))))
            updateBasket(state)
        },
        updateItemQty: (state, action) => {
            const { id, ...updates } = action.payload;
            const itemIndex = state.basketItems.findIndex((item) => item.id === id);
            state.basketItems[itemIndex] = { ...state.basketItems[itemIndex], ...updates };
            localStorage.setItem('cart', JSON.stringify(state.basketItems));
            updateBasket(state)
        },
        clearCart: (state, action) => {
            state.basketItems = [];
            localStorage.removeItem("cart");
            updateBasket(state)
        },

    },
})
export const { addToCart, createBasket, deleteFromCart, getCart, updateItemQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer


function mapProductItemToBasketItem(item) {
    return {
        id: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        pictureUrl: item.pictureUrl,
        brand: item.productBrand,
        type: item.productType
    };
}


export function subTotal() {
    const cartItmes = useSelector(state => state.cart.basketItems);
    const ItemsTotalPrice = cartItmes.reduce((acc, product) => {
        acc += product.price * product.quantity;
        return acc;
    }, 0);
    return ItemsTotalPrice;
}