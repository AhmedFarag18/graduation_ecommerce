// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { API_URL } from '../../App'


// export const getAllProductsSearch = createAsyncThunk("searchSlice/getAllProductsSearch",
//     async (queryString) => {
//         const res = await fetch(`${API_URL}/Products${queryString}`)
//         const data = await res.json()
//         return data;
//     })

// const searchSlice = createSlice({
//     name: 'searchSlice',
//     initialState: [],
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getAllProductsSearch.fulfilled, (state, action) => {
//             return action.payload;
//         })
//     }

// })

// export const { } = searchSlice.actions;
// export default searchSlice.reducer;