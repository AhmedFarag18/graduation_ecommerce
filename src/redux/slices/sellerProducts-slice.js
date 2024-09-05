import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../App'

export const getAllSellerProducts = createAsyncThunk("sellerProductsSlice/getAllSellerProducts", async (searchQuery) => {
    const res = await fetch(`${API_URL}/Products/SellerProducts${searchQuery}`)
    const data = await res.json()
    return data;
})

const sellerProductsSlice = createSlice({
    name: 'sellerProductsSlice',
    initialState: [],
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSellerProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    }

})

export const { } = sellerProductsSlice.actions;
export default sellerProductsSlice.reducer;