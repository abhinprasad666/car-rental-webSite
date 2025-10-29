import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Car,
  Clock,
  IndianRupee,
  Hash,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../../redux/actions/bookingActions/bookingActions";
import ReviewModal from "./ReviewModal";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { loading, bookings } = useSelector((state) => state.myBookings);
  const { reviews } = useSelector((state) => state.user); // all user reviews

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      dispatch(getUserBookings());
    }
  }, [dispatch]);

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "refunded":
        return "bg-purple-500";
      case "failed":
        return "bg-red-600";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleOpenReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  // Function to check if a car already reviewed by user
  const getUserReviewForCar = (carId) => {
    return reviews?.find((review) => review.carId?._id === carId);
  };

  return (
    <div className="mt-7 min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 flex justify-center overflow-y-auto">
      <div className="w-full max-w-3xl">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-cyan-50 dark:bg-gray-900 z-10 pb-3 pt-2">
          <h2 className="text-2xl font-bold text-center text-cyan-800 dark:text-cyan-400">
            My Booking History
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mt-1 rounded-full"></div>
        </div>

        {/* Loading Message */}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <p className="text-cyan-700 dark:text-cyan-300 text-sm font-medium animate-pulse">
              Loading your bookings...
            </p>
          </div>
        )}

        {/* Booking List */}
        {!loading && (
          <div className="flex flex-col gap-4 mt-4">
            {bookings?.map((booking) => {
              const userReview = getUserReviewForCar(booking?.carId?._id);

              return (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                        <Car size={18} /> {booking?.carId?.name || "Unknown Car"}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 ml-6">
                        <Hash size={12} /> <span>ID: {booking._id}</span>
                      </p>
                    </div>

                    <span
                      className={`text-white text-[10px] px-2 py-0.5 rounded-full ${statusColor(
                        booking?.status || "pending"
                      )}`}
                    >
                      {booking?.status || "Pending"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 leading-snug">
                    <p className="flex items-center gap-2">
                      <MapPin size={15} className="text-cyan-600" />
                      <span>
                        <strong>Pickup Location:</strong> {booking.address}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-cyan-600" />
                      <span>
                        <strong>Pickup Date:</strong>{" "}
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-cyan-600" />
                      <span>
                        <strong>Return Date:</strong>{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Clock size={15} className="text-cyan-600" />
                      <span>
                        <strong>Days:</strong> {booking.totalDays}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 font-semibold text-cyan-700 dark:text-cyan-400">
                      <IndianRupee size={15} />
                      <span>{booking.totalAmount}</span>
                    </p>
                  </div>

                  {/* Review Section */}
                  {booking.status?.toLowerCase() === "completed" && (
                    <div className="mt-3 flex justify-end items-center gap-3">
                      {userReview ? (
                        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full animate-fadeIn">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < userReview.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }
                            />
                          ))}
                          <span className="text-xs text-green-700 dark:text-green-400 font-medium">
                            Thanks for your review!
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenReview(booking)}
                          className="px-3 py-1 text-sm bg-cyan-600 hover:bg-cyan-700 text-white rounded-full shadow transition"
                        >
                          Add Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {bookings?.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                No bookings found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default BookingHistory;
