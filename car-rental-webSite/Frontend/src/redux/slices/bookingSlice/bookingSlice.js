import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    //  Get user bookings
    getUserBookingsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserBookingsSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    },
    getUserBookingsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //  Clear errors (optional)
    clearBookingErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  getUserBookingsRequest,
  getUserBookingsSuccess,
  getUserBookingsFail,
  clearBookingErrors,
} = bookingSlice.actions;

export default bookingSlice.reducer;
