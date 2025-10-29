import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        carId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            // required: true,
        },

        pickupLocation: {
            type: {
                type: String,
            },
        },

        address: {
            type: String,
        },

        pickupDate: {
            type: Date,
            required: true,
        },

        returnDate: {
            type: Date,
            required: true,
        },

        totalAmount: {
            type: Number,
            required: true,
        },
        totalDays: {
            required: true,
            type: Number,
        },
        paidAt: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        bookingAt: {
            type: Date,
        },
        razorpayOrderId: {
            type: String,
            trim: true,
        },

        statusHistory: [
            {
                status: {
                    type: String,
                    enum: ["pending", "confirmed", "cancelled", "refunded","completed"],
                },
                changedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
