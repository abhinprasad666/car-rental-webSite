// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAdminLogin: false,
    loading: false,
    error: null,
    loginMessage: null,
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
            state.isAdminLogin = true;
            state.loginMessage = true;
            sessionStorage.setItem("admin", "true");
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAdminLogin = false;
        },

        // Clear messages or errors
        clearAuthStateMessage: (state) => {
            state.loading = false;
            state.error = null;
            state.loginMessage = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearAuthStateMessage,
} = authSlice.actions;

export default authSlice.reducer;
