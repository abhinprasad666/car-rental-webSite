import axiosInstance from "../../../api/axiosInstance";
import { loginFail, loginRequest, loginSuccess } from "../../slices/authSlice/authSlice";


export const loginUser = (userData) => async (dispatch) => {
    try {

        dispatch(loginRequest());

        // Axios instance already has withCredentials and baseURL configured
        const { data } = await axiosInstance.post("api/v1/auth/login", userData);

        dispatch(loginSuccess(data));
        
    } catch (error) {
        console.log("Login failed error response:", error.response?.data);
        dispatch(loginFail(error.response?.data?.error || "Login failed"));
    }
};