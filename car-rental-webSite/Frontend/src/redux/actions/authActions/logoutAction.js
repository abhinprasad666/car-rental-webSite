
import axiosInstance from "../../../api/axiosInstance";
import { logoutFail, logoutRequest, logoutSuccess } from "../../slices/authSlice/authSlice";



export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());

        axiosInstance.post("api/v1/auth/logout");

        dispatch(logoutSuccess());
    } catch (error) {
        console.error("Load user failed:", error.response?.data?.error || error.message);
        dispatch(logoutFail(error.response?.data?.error || "User not fount !"));
    }}