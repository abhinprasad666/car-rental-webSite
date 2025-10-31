// src/redux/slices/authSlice/admin/carSlice/carSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  categories: [],
  cars: [],
  uploading: false,
  updating: false,
  deleting: false, // 🔹 for delete state
  deleteSuccess: false, // 🔹 show toast after delete
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    // ------------------ ADD CAR ------------------
    addCarRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.uploading = true;
    },
    addCarSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.uploading = false;
    },
    addCarFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.uploading = false;
    },

    // ------------------ GET CATEGORIES ------------------
    getCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
    },
    getCategoriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ GET ALL CARS ------------------
    getAllCarsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllCarsSuccess: (state, action) => {
      state.loading = false;
      state.cars = action.payload.cars;
    },
    getAllCarsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ------------------ UPDATE CAR ------------------
    updateCarRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.updating = false;
    },
    updateCarSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.updating = true;
    },
    updateCarFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.updating = false;
    },

    // ------------------ DELETE CAR ------------------
    deleteCarRequest: (state) => {
      state.deleting = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteCarSuccess: (state, action) => {
      state.deleting = false;
      state.deleteSuccess = true;
      state.error = null;
      // remove car from state instantly for smooth UI
      state.cars = state.cars.filter((car) => car._id !== action.payload);
    },
    deleteCarFail: (state, action) => {
      state.deleting = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },

    // ------------------ CLEAR STATE ------------------
    clearCarMessage: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.uploading = false;
      state.updating = false;
      state.deleting = false;
      state.deleteSuccess = false;
    },
  },
});

export const {
  addCarRequest,
  addCarSuccess,
  addCarFail,
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  getAllCarsRequest,
  getAllCarsSuccess,
  getAllCarsFail,
  updateCarRequest,
  updateCarSuccess,
  updateCarFail,
  deleteCarRequest,
  deleteCarSuccess,
  deleteCarFail,
  clearCarMessage,
} = carSlice.actions;

export default carSlice.reducer;
