import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  isUploading: false,
  update: false,

  //  Review states
  reviewLoading: false,
  reviewSuccess: false,
  reviews: [], // for storing fetched reviews
};

const userSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    // ==========================================================
    // Update Profile Info
    // ==========================================================
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isUploading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isUploading = false;
      state.update = true;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUploading = false;
    },

    // ==========================================================
    // Submit Review
    // ==========================================================
    submitReviewRequest: (state) => {
      state.reviewLoading = true;
      state.reviewSuccess = false;
      state.error = null;
    },
    submitReviewSuccess: (state, action) => {
      state.reviewLoading = false;
      state.reviewSuccess = true;
      state.message = "Review submitted successfully!"
    },
    submitReviewFail: (state, action) => {
      state.reviewLoading = false;
      state.reviewSuccess = false;
      state.error = action.payload;
    },

    // ==========================================================
    //  Get All Reviews 
    // ==========================================================
    getAllReviewsRequest: (state) => {
      state.reviewLoading = true;
      state.error = null;
      state.reviews = [];
    },
    getAllReviewsSuccess: (state, action) => {
      state.reviewLoading = false;
      state.reviews = action.payload.reviews;
    },
    getAllReviewsFail: (state, action) => {
      state.reviewLoading = false;
      state.error = action.payload;
    },

    // ==========================================================
    // Clear Review State
    // ==========================================================
    clearReviewState: (state) => {
      state.reviewLoading = false;
      state.reviewSuccess = false;
      state.error = null;
      state.message = null;
    },

    // ==========================================================
    // Clear All
    // ==========================================================
    clearUserProfileState: (state) => {
      return {
        ...state,
        loading: false,
        error: null,
        message: null,
        update: null,
        reviewLoading: false,
        reviewSuccess: false,
        reviews: [],
      };
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,

  submitReviewRequest,
  submitReviewSuccess,
  submitReviewFail,

  getAllReviewsRequest,
  getAllReviewsSuccess,
  getAllReviewsFail,

  clearReviewState,
  clearUserProfileState,
} = userSlice.actions;

export default userSlice.reducer;
