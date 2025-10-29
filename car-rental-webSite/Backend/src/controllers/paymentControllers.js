
import crypto from "crypto";
import Booking from "../models/bookingModel.js";
import razorpay from "../config/razorpay.js";
import Car from "../models/carModel.js";
import Payment from "../models/paymentModel.js";

// @desc    Create Razorpay order
// @route   POST /api/v1/payment/create-booking
// @access  Private



export const createRazorpayBooking = async (req, res) => {
  try {
    const userId = req.user?._id;
    const {
      amount,
      carId,
      pickupLocation,
      pickupDate,
      returnDate,
      address,
      totalDays,
    } = req.body || {};
console.log('booking data',req.body)
    // Basic validations
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing amount" });
    }

    if (!address || !pickupLocation) {
      return res.status(400).json({
        success: false,
        message: "Pickup location and address are required",
      });
    }

    if (!pickupDate || !returnDate) {
      return res
        .status(400)
        .json({ success: false, message: "Pickup and return dates required" });
    }

    // Razorpay order creation
    const options = {
      amount: Math.round(amount * 100), // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayBooking = await razorpay.orders.create(options);
    console.log("Razorpay Booking:", razorpayBooking);

    // Save booking in MongoDB
    const newBooking = await Booking.create({
      userId,
      carId,
      address,
      pickupDate,
      returnDate,
      pickupLocation,
      totalAmount: amount,
      totalDays,
      status: "pending",
      razorpayOrderId: razorpayBooking.id,
      bookingAt: new Date(),
      statusHistory: [
        {
          status: "pending",
          changedAt: new Date(),
        },
      ],
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      order: razorpayBooking,
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay booking:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating Razorpay booking",
      error: error.message,
    });
  }
};



// @desc    Verify Razorpay payment and update DB
// @route   POST /api/v1/payment/verify
// @access  Public

// Razorpay Payment Verification and Order Confirmation


export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

    const secret = process.env.RAZORPAY_SECRET;

    // Step 1: Verify Razorpay Signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Invalid payment signature.",
      });
    }

    // Step 2: Fetch booking from DB
    const bookingFromDB = await Booking.findOne({ razorpayOrderId: razorpay_order_id });
    if (!bookingFromDB) {
      return res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
    }

    // Step 3: Update booking status
    bookingFromDB.status = "confirmed";
    bookingFromDB.paidAt = new Date();
    await bookingFromDB.save();

    // Step 4: Fetch car details
    const car = await Car.findById(bookingFromDB.carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

   

    // Step 5: Create payment record (with dealer + car image)
     await Payment.create({
      bookingId: bookingFromDB._id,
      userId: bookingFromDB.userId,
      amount: bookingFromDB.totalAmount,
      status:"completed",
      transactionId: razorpay_payment_id,
      paymentGateway: "Razorpay",
      paidAt: new Date(),
      dealer: car.dealer, // dealer ID from car
      image: car.image || "", // car image saved in payment record
    
     
    });
     // Step 6: Set car availability = false
    car.available = false;
    await car.save();

    // Step 7 : Redirect to success page
    res.redirect(`${process.env.FRONTEND_URL}/payment/success?reference=${razorpay_payment_id}`);
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Server error during payment verification",
      error: error.message,
    });
  }
};


