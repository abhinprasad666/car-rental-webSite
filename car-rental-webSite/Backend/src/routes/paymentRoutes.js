import { Router } from "express";
import { protectRouter } from "../middlewares/protectRouter.js";
import { createRazorpayBooking, verifyPayment } from "../controllers/paymentControllers.js";




const paymentRouter=Router()



// Create a new Razorpay order
paymentRouter.post("/create-booking",protectRouter, createRazorpayBooking);

// Verify Razorpay signature (called from frontend redirect after payment)
paymentRouter.post("/verify",protectRouter, verifyPayment);

export default paymentRouter