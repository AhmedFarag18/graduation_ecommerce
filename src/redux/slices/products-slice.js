import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../App'

export const getAllProducts = createAsyncThunk("productsSlice/getAllProducts", async () => {
    const res = await fetch(`${API_URL}/Products`)
    const data = await res.json()
    return data.data;
})

const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: [],
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            return action.payload;
        })
    }

})

export const { } = productsSlice.actions;
export default productsSlice.reducer;