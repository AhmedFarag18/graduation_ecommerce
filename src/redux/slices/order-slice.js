import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../App";
import { toast } from "react-hot-toast";

let token;

export const extraCreateOrderAction = createAsyncThunk("orderSlice/createNewOrder", async (data) => {
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


export const getAllOrders = createAsyncThunk("orderSlice/getAllOrders", async () => {
    token = JSON.parse(localStorage.getItem("user")).token;
    const res = await fetch(`${API_URL}/Orders`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    const finaldata = await res.json()
    return finaldata
})


const orderSlice = createSlice({
    initialState: {
        "basketId": localStorage.getItem("cart_id"),
        "deliveryMethodId": 1,
        "shipTOAddress": {
            "firstName": "",
            "lastName": "",
            "country": "",
            "city": "",
            "street": ""
        }
    },
    name: "orderSlice",
    reducers: {
        changeDeliveryMethodId: (state, action) => {
            state.deliveryMethodId = action.payload;
        },
        changeshipTOAddress: (state, action) => {
            state.shipTOAddress = action.payload;
            console.log(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(extraCreateOrderAction.fulfilled, (state, action) => {
            const order = action.payload;

            if (order.statusCode === 401) {
                toast.error('order error')
            } else {
                toast.success('order success')
            }
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            const final = { data: action.payload, state: state }
            console.log(final);
        })

    }
})

export const { changeDeliveryMethodId, changeshipTOAddress } = orderSlice.actions;

export default orderSlice.reducer