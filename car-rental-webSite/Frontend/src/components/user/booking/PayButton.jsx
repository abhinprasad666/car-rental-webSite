import React from "react";
import axiosInstance from "../../../api/axiosInstance";

const PayButton = ({ bookingData }) => {
  const handlePayment = async () => {
    try {
      // ✅ Ensure amount is numeric
      const amount = Number(bookingData?.totalPayment);

      const payload = {
        amount,
        carId: bookingData.carId,
        pickupLocation: bookingData.pickupLocation,
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,
        address: bookingData.pickupAddress,
        totalDays: bookingData.totalDays,
      };

      console.log("📦 Payload being sent:", payload);

      //  Validation before calling backend
      if (!amount || isNaN(amount) || amount <= 0) {
        alert("Invalid payment amount. Please check booking details.");
        return;
      }

      const { data } = await axiosInstance.post(
        `/api/v1/payment/create-booking`,
        payload
      );

      if (!data?.order) {
        console.error("⚠️ No order returned from backend:", data);
        alert(data?.message || "Failed to create order");
        return;
      }

      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "EasyDrive Car Rentals",
        description: "Car Rental Payment",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/verify`,
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: { color: "#03e3fc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-[48%] bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
    >
      Pay ₹{bookingData.totalPayment}
    </button>
  );
};

export default PayButton;
