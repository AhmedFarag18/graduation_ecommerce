import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Toast } from "../../components/Toast";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { API_URL } from "../../App";


export const extraLoginAction = createAsyncThunk("authSlice/login", async (data) => {

    const res = await fetch(`${API_URL}/Account/login`, {
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
            toast.success('You have logged out successfully')
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(extraLoginAction.fulfilled, (state, action) => {
                const user = action.payload;
                // store user details and basic auth data in local storage to keep user logged in between page refreshes
                if (user.statusCode === 401) {
                    toast.error('Email or password is wrong!')
                } else {
                    localStorage.setItem('user', JSON.stringify(user));
                    state.user = user;
                    toast.success('You have logged in successfully')
                    // get return url from location state or default to home page
                    redirect("/");
                }
            })

    }
})

export const authActions = { ...authSlice.actions };
export default authSlice.reducer