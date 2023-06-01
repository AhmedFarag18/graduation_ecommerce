import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../App'

export const getAllProducts = createAsyncThunk("productsSlice/getAllProducts", async (searchQuery) => {
    const res = await fetch(`${API_URL}/Products${searchQuery}`)
    const data = await res.json()
    return data;
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