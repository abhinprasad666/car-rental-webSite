import axiosInstance from "../../../api/axiosInstance";
import { registerFail, registerRequest, registerSuccess } from "../../slices/authSlice/authSlice";


export const registerUser = (userData) => async (dispatch) => {
    try {
      
        dispatch(registerRequest());

        // Axios instance already has withCredentials and baseURL configured
        const { data } = await axiosInstance.post("api/v1/auth/signup", userData);

        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response?.data?.error || "Registration failed"));
    }
};