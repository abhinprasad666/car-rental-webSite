import express, { Router } from "express";
import { addReview, getAllReviews } from "../controllers/reviewControllers.js";
import { protectRouter } from "../middlewares/protectRouter.js";





export const reviewRouter = Router()

// Create Review
reviewRouter.post("/create/:carId",protectRouter,addReview)
// Get All Reviews
reviewRouter.get("/",protectRouter,getAllReviews)
// // Get Review By Id 
// reviewRouter.get("/:id",getReviewByID)
// // Update Review
// reviewRouter.put("/:id",updateReview)
// // Delete Review
// reviewRouter.delete("/:id",deleteReview)