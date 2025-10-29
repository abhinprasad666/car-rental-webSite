import { Router } from "express"
import { authRouter } from "./authRoutes.js"
import { adminRouter } from "./adminRoutes.js"
import userRouter from "./userRoutes.js"
import { dealerRouter } from "./dealerRoutes.js"
import { carRouter } from "./carRoutes.js"
import { categoryRouter } from "./categoryRoutes.js"
import { reviewRouter } from "./reviewRoutes.js"
import paymentRouter from "./paymentRoutes.js"
import BookingRouter from "./bookingRoutes.js"




export const router = Router()

// Authentication Routes
router.use("/auth",authRouter)

// Admin Routes 
router.use("/admin",adminRouter)

// User Routes 
router.use("/user",userRouter)

// Dealer Routes 
router.use("/dealer",dealerRouter)

// Car Routes 
router.use("/car",carRouter)

// Category Routes
router.use("/category",categoryRouter) 

// Review Routes 
router.use("/review",reviewRouter)

// Booking Routes 
router.use("/booking",BookingRouter)
// Payment Routes 
router.use("/payment",paymentRouter)





