import User from "../models/userModel.js";
import Dealer from "../models/dealerModel.js";
import bcrypt from "bcryptjs"



// @desc     Create Dealer
// @route    POST /api/dealer/create
// @access   Public  

export const createDealer = async (req, res) => {
  try {
    const {
      companyName,
      licenseNo,
      address,
      bio,
      email,
      currentpassword,
    } = req.body;

    if (
      !companyName ||
      !licenseNo ||
      !address ||
      !bio) {
      return res.status(400).json({
        success: false,
        error: "Please Fill All The Fields.",
      });
    }

    const userId = req.user._id;
   

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentpassword,
      user?.password
    );
    
    if (user.email !== email || !isPasswordCorrect) {
      res.status(401).json({
        sucess: false,
        Error: "Invalid email or password. Please try again.",
      });
    }

    user.role = "dealer";
  const savedUser = await user.save();

  const userObj = savedUser.toObject();
  delete userObj.password;

  const newDealer = await Dealer.create({
    userId: user._id,
    companyName,
    licenseNo,
    bio,
    address,
    
  });

  res.status(201).json({
    message: "Dealer account created successfully",
    userData: userObj,
    newDealer
  });


  } catch (error) {
    console.error(`error in dealer creating controller:${error.message}`);
    res.status(500).json({
      sucess: false,
      error: "Internal Server Error",
    });
  }
};

// @desc     Get dealer profile
// @route    GET /api/dealer
// @access   Admin and Dealer

export const getDealerProfile = async (req, res) => {
  try {
    // Get dealer info from request (added by isAuthDealer middleware)
    const userId = req.user._id || {};

    // If dealer data not found in request (edge case)
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "Dealer info missing in request",
      });
    }

    // Fetch complete dealer details from DB (excluding password)
    const dealer = await Dealer.findOne({ userId: userId }).select("-password");
    console.log("dealerInfo", dealer);

    // If dealer not found in database
    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found!",
      });
    }

    // Return dealer profile
    res.status(200).json({
      success: true,
      dealerData: dealer,
    });
  } catch (error) {
    console.error("Error fetching dealer profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch dealer profile.",
    });
  }
};




// @desc     Update dealer
// @route    PUT /api/dealer
// @access   Admin and Dealer

export const updateDealer = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Dealer info missing in request",
      });
    }

    // Extract allowed fields from request body
    const { companyName, licenseNo, address, bio, status } = req.body;

    // Update dealer details
    const dealer = await Dealer.findOneAndUpdate(
      { userId },
      { companyName, licenseNo, address, bio, status },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dealer profile updated successfully",
      dealerData: dealer,
    });
  } catch (error) {
    console.error("Error updating dealer profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not update dealer profile.",
    });
  }
};




// @desc     Delete Dealer
// @route    DELETE /api/dealer
// @access   Admin and Dealer

export const deleteDealer = async (req, res) => {
  try {
    const userId = req.user._id; // coming from auth middleware

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Dealer info missing in request",
      });
    }

    const dealer = await Dealer.findOneAndDelete({ userId });

    if (!dealer) {
      return res.status(404).json({
        success: false,
        message: "Dealer not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dealer account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting dealer:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
