
import axiosInstance from "../../../../api/axiosInstance";
import { loginFail, loginRequest, loginSuccess } from "../../../slices/authSlice/admin/adminLoginSlice";


export const adminLogin = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const { data } = await axiosInstance.post("api/v1/auth/admin/login", userData);
           sessionStorage.setItem("admin", "true");
        dispatch(loginSuccess(data));
    } catch (error) {
        console.log("Login failed error response:", error.response?.data);
        dispatch(loginFail(error.response?.data?.error || " admin Login failed"));
    }
};
