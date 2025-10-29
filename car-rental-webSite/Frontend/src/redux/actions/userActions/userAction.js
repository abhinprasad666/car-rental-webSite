import axiosInstance from "../../../api/axiosInstance";
import {
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  submitReviewRequest,
  submitReviewSuccess,
  submitReviewFail,
  getAllReviewsRequest,
  getAllReviewsSuccess,
  getAllReviewsFail,
} from "../../slices/userSlice/userSlice";


// ======================================================
//  Update User Profile
// ======================================================
export const updateProfile = (updateData) => async (dispatch) => {
  console.log("profile upload data", updateData);

  try {
    dispatch(updateProfileRequest());

    const { data } = await axiosInstance.put("api/v1/user", updateData);

    dispatch(updateProfileSuccess(data));
  } catch (error) {
    console.error(
      "Profile update failed:",
      error.response?.data?.error || error.message
    );
    dispatch(
      updateProfileFail(error.response?.data?.error || "Profile upload failed!")
    );
  }
};



// ======================================================
//  Submit Review
// ======================================================
export const submitReview = (reviewData) => async (dispatch) => {
  console.log("review data =>", reviewData);
  const carId=reviewData?.carId
  try {
    dispatch(submitReviewRequest());

    const { data } = await axiosInstance.post(`api/v1/review/create/${carId}`, reviewData);

    dispatch(submitReviewSuccess(data));
  } catch (error) {
    console.error(
      "Submit review failed:",
      error.response?.data?.error || error.message
    );
    dispatch(
      submitReviewFail(
        error.response?.data?.error || "Failed to submit review!"
      )
    );
  }
};



// ======================================================
//  Get All Reviews for a Car
// ======================================================
export const getAllReviews = (carId) => async (dispatch) => {
  console.log("Fetching reviews for Car ID:", carId);
  try {
    dispatch(getAllReviewsRequest());

    const { data } = await axiosInstance.get(`api/v1/review/`);

    dispatch(getAllReviewsSuccess(data));
  } catch (error) {
    console.error(
      "Get all reviews failed:",
      error.response?.data?.error || error.message
    );
    dispatch(
      getAllReviewsFail(
        error.response?.data?.error || "Failed to fetch reviews!"
      )
    );
  }
};
