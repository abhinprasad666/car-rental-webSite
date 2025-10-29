import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { submitReview } from "../../../redux/actions/userActions/userAction";

const ReviewModal = ({ booking, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
const dispatch = useDispatch();
  const handleSubmitReview = () => {
    if (!rating || comment.trim().length < 3) {
      alert("Please add a rating and a valid comment (min 3 characters)");
      return;
    }

    //  Construct review data with all necessary info
    const reviewData = {
      carId: booking?.carId?._id,
      carName: booking?.carId?.name,
      bookingId: booking?._id,
      rating,
      comment,
    };

    console.log(" Review Submitted Data:", reviewData);

    dispatch(submitReview(reviewData));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold text-center text-cyan-700 dark:text-cyan-300 mb-4">
          Add Review for {booking?.carId?.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex justify-center mb-3">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <button
                key={ratingValue}
                type="button"
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star
                  size={28}
                  className={`transition ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill={
                    ratingValue <= (hover || rating)
                      ? "#FACC15"
                      : "transparent"
                  }
                />
              </button>
            );
          })}
        </div>

        {/* Comment Box */}
        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            className="px-4 py-1 text-sm bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
