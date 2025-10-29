import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["onlinePayment"],
      required: true,
      default: "onlinePayment",
    },
    status: {
      type: String,
      enum: ["confirmed","completed", "pending", "failed", "refunded"],
      default: "confirmed",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["pending", "confirmed", "cancelled", "refunded","completed"],
        },
        transactionId: {
          type: String,
          required: true,
        },
        paidAt: {
          type: Date,
          default: Date.now,
        },
        paymentGateway: {
          type: String,
          enum: ["Razorpay", "Stripe", "PayPal", "Manual"],
          default: "Razorpay",
        },
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
