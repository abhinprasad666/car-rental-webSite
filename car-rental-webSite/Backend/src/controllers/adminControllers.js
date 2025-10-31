import User from "../models/userModel.js";
import Dealer from "../models/dealerModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";
import Car from "../models/carModel.js";



//  Change Role (user -> dealer OR dealer -> user)

export const changeRole = async (req, res) => {
  console.log("i am stats")
    try {
       
        const  userId = req.params.userId
        const role = req.params.role 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const allowedRoles = ["customer", "seller", "admin"];

if (!allowedRoles.includes(role)) {
    return res.status(400).json({
        success: false,
        error: `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`
    });
}

        user.role = role; // "user", "dealer"
        await user.save();

        res.status(200).json({
            success: true,
            message: "Role Changed Successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

//  Get all Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); 
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

//  Get User OR Dealer By ID
export const getUserOrDealer = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User/Dealer not found" });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

//  Get all Dealers
export const getAllDealers = async (req, res) => {
    try {
        const dealers = await User.find({ role: "dealer" }).select("-password"); 
        res.status(200).json({
            success: true,
            count: dealers.length,
            dealers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};



// Delete user or dealer

export const deleteUserOrSeller = async (req, res) => {
  try {
    const userId = req.params.id;

    //  Check if logged-in user is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    //  Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  If dealer, also remove dealer profile
    if (user.role === "dealer") {
      await Dealer.deleteOne({ userId: user._id });
    }

    //  Delete user
    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: `User '${user.name}' with role '${user.role}' has been deleted.`,
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



// 🧠 Admin Dashboard Stats
export const getAdminDashboardStats = async (req, res) => {
    console.log("i am status")
  try {
    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Cars
    const totalCars = await Car.countDocuments();

    // Total Bookings
    const totalBookings = await Booking.countDocuments();

    // Total Earnings (sum of all successful payments)
    const totalEarningsResult = await Payment.aggregate([
      {
        $match: {
          status: { $in: ["confirmed", ] },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalEarnings =
      totalEarningsResult.length > 0 ? totalEarningsResult[0].totalAmount : 0;

    // Recent Bookings (last 5)
    const recentBookings = await Booking.find()
      .populate("userId", "name email")
      .populate("carId", "name brand")
      .sort({ createdAt: -1 })
      .limit(5);

    // Final Response
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCars,
        totalBookings,
        totalEarnings,
      },
      recentBookings,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};
