import axiosInstance from "../../../api/axiosInstance";
import { getUserBookingsFail, getUserBookingsRequest, getUserBookingsSuccess } from "../../slices/bookingSlice/bookingSlice";



// Get all bookings for the logged-in user
export const getUserBookings = () => async (dispatch) => {
  try {
    dispatch(getUserBookingsRequest());

    const { data } = await axiosInstance.get("/api/v1/booking/my-bookings");

    dispatch(getUserBookingsSuccess(data.bookings));
  } catch (error) {
    dispatch(
      getUserBookingsFail(
        error.response?.data?.message || "Failed to fetch bookings"
      )
    );
  }
};
