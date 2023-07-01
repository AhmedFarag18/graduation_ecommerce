import { createSlice } from "@reduxjs/toolkit";


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
        },
    },
    extraReducers: () => {
    }
})

export const { changeDeliveryMethodId, changeshipTOAddress } = orderSlice.actions;

export default orderSlice.reducer