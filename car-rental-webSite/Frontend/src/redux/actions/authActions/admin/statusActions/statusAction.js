import axiosInstance from "../../../../../api/axiosInstance";
import { getDashboardStatsFail, getDashboardStatsRequest, getDashboardStatsSuccess } from "../../../../slices/authSlice/admin/statusSlice/statusSlice";

export const getAdminDashboardStats = () => async (dispatch) => {
  try {
    dispatch(getDashboardStatsRequest());

    const { data } = await axiosInstance.post("/api/v1/admin/status", {
      withCredentials: true,
    });

    dispatch(getDashboardStatsSuccess(data));
  } catch (error) {
    dispatch(
      getDashboardStatsFail(
        error.response?.data?.error || "Failed to fetch dashboard stats"
      )
    );
  }
};
