import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Toast } from "../../components/Toast";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";


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
                title: 'You have logged out successfully'
            })
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(extraLoginAction.fulfilled, (state, action) => {
                const user = action.payload;
                // store user details and basic auth data in local storage to keep user logged in between page refreshes
                if (user.statusCode === 401) {
                    Swal.fire({
                        title: "You don't have Account, Do you want to sign up?",
                        showDenyButton: true,
                        confirmButtonText: 'Sign up',
                        denyButtonText: `return to login`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'http://localhost:3000/signup';
                        }
                    })

                } else {
                    localStorage.setItem('user', JSON.stringify(user));
                    state.user = user;
                    Toast.fire({
                        icon: 'success',
                        title: 'You have logged in successfully'
                    })
                    // get return url from location state or default to home page
                    redirect("/");
                }

            })

    }
})

export const authActions = { ...authSlice.actions };
export default authSlice.reducer