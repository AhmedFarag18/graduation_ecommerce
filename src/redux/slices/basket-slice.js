import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../App";
import cuid from "cuid";
import { changeDeliveryMethodId } from "./order-slice";
import { toast } from "react-hot-toast";
import axios from "axios";


let token;
export let clientSecret

export const extraCreateOrderAction = createAsyncThunk("basketSlice/createNewOrder", async (data) => {
    token = JSON.parse(localStorage.getItem("user")).token;
    const res = await fetch(`${API_URL}/Orders`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const finaldata = await res.json()
    return finaldata;
})
export const extraCreatePaymentIntent = createAsyncThunk("basketSlice/createPaymentIntent", async () => {
    token = JSON.parse(localStorage.getItem("user")).token;
    let basketId = localStorage.getItem("cart_id")

    const res = await fetch(`${API_URL}/Payments/${basketId}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    const finaldata = await res.json();
    clientSecret = finaldata.clientSecret;
    return finaldata;
})


const basketSlice = createSlice({
    initialState: {
        id: "",
        basketItems: JSON.parse(localStorage.getItem('cart')) || [],
        "deliveryMethodId": 1,
        "paymentIntentId": "",
        "clientSecret": "",
        "shippingPrice": 0
    },
    name: "basketSlice",
    reducers: {
        createBasket: (state, action) => {
            createNewBasket(state);
        },
        basketDeliveryMethodId: (state, action) => {
            state.deliveryMethodId = changeDeliveryMethodId()
        },
        changeShippingPrice: (state, action) => {
            state.shippingPrice = action.payload;
            console.log(state.shippingPrice);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(extraCreateOrderAction.fulfilled, (state, action) => {
            const order = action.payload;
            if (order.statusCode === 401) {
                toast.error('order faild')
            } else {
                toast.success('order success')
                console.log(order);
            }
        })
    }
})

export const { createBasket, setShippingPrice, changeShippingPrice } = basketSlice.actions;
export default basketSlice.reducer


export function createNewBasket(state) {
    const id = cuid();
    localStorage.setItem("cart_id", id);
    const data = {
        id: id,
        basketItems: state.basketItems,
        "deliveryMethodId": state.deliveryMethodId,
        "paymentIntentId": state.paymentIntentId,
        "clientSecret": state.clientSecret,
        "shippingPrice": state.shippingPrice,
    }
    axios.post(`${API_URL}/Basket`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
}

export function updateBasket(state) {

    const data = {
        id: localStorage.getItem('cart_id'),
        basketItems: state.basketItems,
        "deliveryMethodId": state.deliveryMethodId,
        "paymentIntentId": state.paymentIntentId,
        "clientSecret": state.clientSecret,
        "shippingPrice": state.shippingPrice,
    }
    axios.post(`${API_URL}/Basket`, data,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}