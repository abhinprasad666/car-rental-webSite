import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice/authSlice"
import cars from "./slices/carSlice/carSlice"
import user from "./slices/userSlice/userSlice.js"
import myBookings from "./slices/bookingSlice/bookingSlice"
import authAdmin from "./slices/authSlice/admin/adminLoginSlice"
// Combine all reducers
const appReducer = combineReducers({
    auth,
    cars,
    user,
    myBookings,
    //admin
    authAdmin

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