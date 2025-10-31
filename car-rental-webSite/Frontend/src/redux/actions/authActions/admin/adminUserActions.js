// src/actions/admin/adminUserActions.js
import axios from "axios";
import { adminFail, adminRequest, deleteUserSuccess, getBookingsSuccess, getUsersSuccess } from "../../../slices/authSlice/admin/adminUserSlice";


const API = import.meta.env.VITE_API_BASE_URL;

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(adminRequest());
    const { data } = await axios.get(`${API}/api/v1/admin/all-users`, {
      withCredentials: true,
    });
    dispatch(getUsersSuccess(data.users));
  } catch (error) {
    dispatch(adminFail(error.response?.data?.message || "Failed to fetch users"));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(adminRequest());
    const { data } = await axios.delete(`${API}/api/v1/admin/user/${userId}`, {
      withCredentials: true,
    });
    dispatch(deleteUserSuccess(data.message, { meta: userId }));
  } catch (error) {
    dispatch(adminFail(error.response?.data?.message || "Failed to delete user"));
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    dispatch(adminRequest());
    const { data } = await axios.get(`${API}/api/v1/admin/bookings`, {
      withCredentials: true,
    });
    dispatch(getBookingsSuccess(data.bookings));
  } catch (error) {
    dispatch(adminFail(error.response?.data?.message || "Failed to fetch bookings"));
  }
};
