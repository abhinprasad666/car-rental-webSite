import { Router } from "express";
import { protectRouter } from "../middlewares/protectRouter.js";
import { getUserBookings } from "../controllers/bookingControllers.js";



const BookingRouter = Router();

//  Get all bookings of the logged-in user
BookingRouter.get("/my-bookings",protectRouter ,getUserBookings);


export default BookingRouter