import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../App";
import cuid from "cuid";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
    initialState: {
        id: "",
        basketItems: JSON.parse(localStorage.getItem('cart')) || [],
        "deliveryMethodId": 0,
        "paymentIntentId": "",
        "clientSecret": "",
        "shippingPrice": 0
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

        createBasket: (state, action) => {
            createNewBasket(state);
        },
        getCart: (state, action) => {
            if (localStorage.getItem('cart_id')) {
                axios.get(`${API_URL}/Basket?id=${localStorage.getItem('cart_id')}`)
                    .then(data => {
                        const lastData = data.data.basketItems;
                        localStorage.setItem('cart', JSON.stringify(lastData));
                    })
            } else {
                console.log("Don't have any basket");
            }
        },
        deleteFromCart: (state, action) => {
            state.basketItems = state.basketItems.filter((product) => (product.id !== action.payload.id));
            localStorage.setItem('cart', JSON.stringify(state.basketItems.filter((product) => (product.id !== action.payload.id))))
        },
        updateItemQty: (state, action) => {
            const { id, ...updates } = action.payload;
            const itemIndex = state.basketItems.findIndex((item) => item.id === id);
            state.basketItems[itemIndex] = { ...state.basketItems[itemIndex], ...updates };
            localStorage.setItem('cart', JSON.stringify(state.basketItems));
        },

        clearCart: (state, action) => {
            state.basketItems = [];
            localStorage.removeItem("cart");
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

function createNewBasket(state) {
    const id = cuid();
    localStorage.setItem("cart_id", id);
    const data = {
        id: id,
        basketItems: state.basketItems,
        "deliveryMethodId": Math.floor(Math.random()),
        "paymentIntentId": "",
        "clientSecret": "",
        "shippingPrice": 10,
    }
    console.log(data);
    axios.post(`${API_URL}/Basket`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then(() => {
        console.log("completed")
    })
}

function updateBasket(state) {

    const data = {
        id: localStorage.getItem('cart_id'),
        basketItems: state.basketItems,
        "deliveryMethodId": 1,
        "paymentIntentId": "test12",
        "clientSecret": "test1",
        "shippingPrice": 10,
    }
    console.log(data);
    axios.post(`${API_URL}/Basket`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then(() => {
        console.log("completed updated")
    })
}