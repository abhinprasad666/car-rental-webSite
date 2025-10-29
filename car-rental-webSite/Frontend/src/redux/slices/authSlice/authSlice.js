// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    loginMessage:null,
   
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Login
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loginMessage=true
            localStorage.setItem("isLoggedIn","true");
     
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
          
        },

        // Load user
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        loadUserFail: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },

        // Register
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        // Logout
         logoutRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state,) => {
            state.loading = false;
            state.user =null;
            state.isAuthenticated = false;
            state.loginMessage=null;
            localStorage.removeItem("isLoggedIn");
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            localStorage.removeItem("isLoggedIn")
        },

    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    registerRequest,
    registerSuccess,
    registerFail,
    logoutRequest,
    logoutSuccess,
    logoutFail
} = authSlice.actions;

export default authSlice.reducer;