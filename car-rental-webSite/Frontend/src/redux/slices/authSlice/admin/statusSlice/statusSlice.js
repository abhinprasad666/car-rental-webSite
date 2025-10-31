import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  stats: null,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    getDashboardStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
    },
    getDashboardStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getDashboardStatsRequest,
  getDashboardStatsSuccess,
  getDashboardStatsFail,
  clearDashboardError,
} = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
