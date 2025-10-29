import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PayButton from "./PayButton";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
          No booking details found!
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    carName,
    carImage,
    pickupLocation,
    pickupDate,
    returnDate,
    pickupAddress,
    totalDays,
    pricePerDay,
    totalPayment,
  } = bookingData;

  const handleCancel = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center p-4 transition-colors duration-500">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-2xl w-full transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Confirm Your Booking 🚗
        </h2>

        {/* Car Info */}
        <div className="flex flex-col md:flex-row items-center gap-5 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm mb-6 transition-colors duration-500">
          <img
            src={carImage}
            alt={carName}
            className="w-44 h-28 object-cover rounded-xl"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {carName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Price/Day: ₹{pricePerDay}
            </p>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mb-4">
          <p>
            <span className="font-semibold dark:text-gray-100">Pickup Location:</span>{" "}
            {pickupLocation}
          </p>
          <p>
            <span className="font-semibold dark:text-gray-100">Pickup Date:</span>{" "}
            {pickupDate}
          </p>
          <p>
            <span className="font-semibold dark:text-gray-100">Return Date:</span>{" "}
            {returnDate}
          </p>
          <p>
            <span className="font-semibold dark:text-gray-100">Address:</span>{" "}
            {pickupAddress}
          </p>
          <p>
            <span className="font-semibold dark:text-gray-100">Total Days:</span>{" "}
            {totalDays}
          </p>
          <p>
            <span className="font-semibold dark:text-gray-100">Total Amount:</span>{" "}
            ₹{totalPayment}
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleCancel}
            className="w-[48%] bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-300"
          >
            Cancel
          </button>
          <PayButton bookingData={bookingData} />
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          You can cancel before payment without any charges.
        </p>
      </div>
    </div>
  );
};

export default ConfirmBooking;
