// src/slices/admin/adminUserSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    bookings: [],
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    adminRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getBookingsSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      // remove deleted user
      state.users = state.users.filter((u) => u._id !== action.meta);
    },
    adminFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  adminRequest,
  getUsersSuccess,
  getBookingsSuccess,
  deleteUserSuccess,
  adminFail,
  clearMessage,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
