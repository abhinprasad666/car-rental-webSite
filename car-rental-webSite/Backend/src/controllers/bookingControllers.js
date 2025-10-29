import Booking from "../models/bookingModel.js";



export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    //  Fetch all bookings by this user and populate car details
    const bookings = await Booking.find({ userId })
      .populate("carId", "name images pricePerDay fuelType transmission")
      .sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user bookings.",
      error: error.message,
    });
  }
};
