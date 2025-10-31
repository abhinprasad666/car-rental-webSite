// src/redux/actions/authActions/admin/carActions.js
import axios from "axios";
import {
  addCarFail,
  addCarRequest,
  addCarSuccess,
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
} from "../../../slices/authSlice/admin/carSlice/carSlice";

// ------------------ ADD CAR ------------------
export const addCar = (carData) => async (dispatch) => {
  try {
    dispatch(addCarRequest());
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/car/create`,
      carData,
      config
    );
    dispatch(addCarSuccess(data));
  } catch (error) {
    dispatch(addCarFail(error.response?.data?.message || "Failed to add car. Try again."));
  }
};

// ------------------ GET ALL CATEGORIES ------------------
export const getCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/category`, {
      withCredentials: true,
    });
    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoriesFail(error.response?.data?.error || "Failed to load categories."));
  }
};

// ------------------ GET ALL CARS ------------------
export const getAllCars = () => async (dispatch) => {
  try {
    dispatch(getAllCarsRequest());
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/car`, {
      withCredentials: true,
    });
    dispatch(getAllCarsSuccess(data));
  } catch (error) {
    dispatch(getAllCarsFail(error.response?.data?.error || "Failed to fetch cars."));
  }
};

// ------------------ UPDATE CAR ------------------
export const updateCar = (carId, updatedData) => async (dispatch) => {
  try {
    dispatch(updateCarRequest());
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/car/${carId}`,
      updatedData,
      config
    );
    dispatch(updateCarSuccess(data));
  } catch (error) {
    dispatch(updateCarFail(error.response?.data?.error || "Failed to update car. Try again."));
  }
};

// ------------------ DELETE CAR ------------------
export const deleteCar = (carId) => async (dispatch) => {
  try {
    dispatch(deleteCarRequest());
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/car/${carId}`, {
      withCredentials: true,
    });
    dispatch(deleteCarSuccess(carId)); // pass ID to remove instantly
  } catch (error) {
    dispatch(deleteCarFail(error.response?.data?.error || "Failed to delete car. Try again."));
  }
};
