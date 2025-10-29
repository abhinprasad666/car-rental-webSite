import mongoose from "mongoose";
import Review from "../models/reviewModel.js";
import Car from "../models/carModel.js";
import User from "../models/userModel.js";

// Add Review & Auto Update Car Rating
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body || {};
    const { carId } = req.params;
    const userId = req.user?._id; // from auth middleware

    // Validate Car ID
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Car ID" });
    }

    // Validate Rating
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5",
      });
    }

    // Validate Comment
    if (
      !comment ||
      typeof comment !== "string" ||
      comment.trim().length < 3 ||
      comment.trim().length > 500
    ) {
      return res.status(400).json({
        success: false,
        message: "Comment must be between 3 and 500 characters",
      });
    }

    // Find Car
    const car = await Car.findById(carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found" });
    }

    // Check if user already reviewed this car
    const existingReview = await Review.findOne({ userId, carId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: "You have already reviewed this car",
      });
    }

    // Ensure user exists
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //Create Review
    const newReview = await Review.create({
      userId,
      carId,
      rating,
      comment: comment.trim(),
    });

    //Push review ID into car.reviews[]
    car.reviews.push(newReview._id);

    //Recalculate average rating
    const allReviews = await Review.find({ carId });
    const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRatings / allReviews.length;

    car.numOfReviews = allReviews.length;
    car.rating = Number(avgRating.toFixed(1));

    // Save updated car
    await car.save();

    // Populate review details before sending response
    const populatedReview = await newReview.populate([
      { path: "userId", select: "name email" },
      { path: "carId", select: "name image rating numOfReviews" },
    ]);

    // Success response
    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: populatedReview,
      updatedCar: {
        rating: car.rating,
        numOfReviews: car.numOfReviews,
      },
    });
  } catch (error) {
    console.error("❌ Error adding review:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding review",
      error: error.message,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate([
        {
          path: "userId",
          select: "name email", 
        },
        {
          path: "carId",
          select: "name brand image rating numOfReviews",
        },
      ])
      .sort({ createdAt: -1 });

    if (!reviews.length) {
      return res.status(404).json({
        success: false,
        message: "No reviews found",
      });
    }

    res.status(200).json({
      success: true,
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("❌ Error fetching all reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};



// // 🔍 Get Single Review
// export const getSingleReview = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid Review ID" });
//     }

//     const review = await Review.findById(id).populate([
//       { path: "userId", select: "name email" },
//       { path: "carId", select: "name image rating numOfReviews" },
//     ]);

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       review,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching single review:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching single review",
//       error: error.message,
//     });
//   }
// };


// // ❌ Delete Review (only owner or admin)
// export const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?._id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid Review ID" });
//     }

//     const review = await Review.findById(id);
//     if (!review) {
//       return res.status(404).json({ success: false, message: "Review not found" });
//     }

//     if (review.userId.toString() !== userId.toString() && req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Not authorized to delete this review",
//       });
//     }

//     await review.deleteOne();

//     // 🧮 Recalculate car rating after delete
//     const car = await Car.findById(review.carId);
//     if (car) {
//       const remainingReviews = await Review.find({ carId: review.carId });
//       if (remainingReviews.length > 0) {
//         const totalRatings = remainingReviews.reduce((sum, r) => sum + r.rating, 0);
//         car.rating = Number((totalRatings / remainingReviews.length).toFixed(1));
//         car.numOfReviews = remainingReviews.length;
//       } else {
//         car.rating = 0;
//         car.numOfReviews = 0;
//       }
//       await car.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Review deleted successfully",
//     });
//   } catch (error) {
//     console.error("❌ Error deleting review:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting review",
//       error: error.message,
//     });
//   }
// };
