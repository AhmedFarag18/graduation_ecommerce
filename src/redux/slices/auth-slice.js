import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Toast } from "../../components/Toast";
import { redirect } from "react-router-dom";


export const extraLoginAction = createAsyncThunk("authSlice/login", async (data) => {

    const res = await fetch("https://localhost:5001/api/Account/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const finaldata = await res.json()
    return finaldata;
})

const authSlice = createSlice({
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    name: "authSlice",
    reducers: {
        logout(state, action) {
            state.user = null;
            localStorage.removeItem('user');
            // navigate('/login');
            Toast.fire({
                icon: 'success',
                title: 'You Logged Out'
            })
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(extraLoginAction.fulfilled, (state, action) => {
                const user = action.payload;
                // console.log(action, state);
                // store user details and basic auth data in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
                Toast.fire({
                    icon: 'success',
                    title: 'You Logged In succesfully'
                })
                // get return url from location state or default to home page
                redirect("/");
            })

    }
})

export const authActions = { ...authSlice.actions };
export default authSlice.reducer