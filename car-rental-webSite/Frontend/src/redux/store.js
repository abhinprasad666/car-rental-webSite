import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice/authSlice"
import cars from "./slices/carSlice/carSlice"
import user from "./slices/userSlice/userSlice.js"
import myBookings from "./slices/bookingSlice/bookingSlice"
import authAdmin from "./slices/authSlice/admin/adminLoginSlice"
// admin
import stats from "./slices/authSlice/admin/statusSlice/statusSlice.js"
import car from "./slices/authSlice/admin/carSlice/carSlice.js"
import adminUsers from "./slices/authSlice/admin/adminUserSlice"
// Combine all reducers
const appReducer = combineReducers({
    auth,
    cars,
    user,
    myBookings,
    //admin
    authAdmin,
    stats,
    car,
    adminUsers

});



const rootReducer = (state, action) => {
  if (action.type === "RESET_ALL_STATE") {
    state = undefined; // clears everything
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});