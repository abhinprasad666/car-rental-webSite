import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// @desc  Update user
// @route PUT /api/user/
// @access User

export const updateUser = async (req, res) => {
  try {
    const { name, email, newPassword, currentPassword, phone, image } =
      req.body || {};
    const userId = req.user._id;
console.log("my current password",currentPassword,req.body)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: true,
        error: "User Not Found",
      });
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: "Password must be at least 6 characters long",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user?.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          error:
            "The current password you entered is incorrect. Please try again.",
        });
      }
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.image = image || user.image;

    const updatedUser = await user.save();
    updatedUser.password = null;

    res.status(200).json({
      success: true,
      message: "updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(`error in profile update:${error.message}`);
    res.status(500).json({
      sucess: false,
      error: "Internal Server Error",
    });
  }
};

// @desc  Delete user
// @route DELETE /api/user/:id
// @access User

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        sucess: false,
        error: "User Not Found OR User Is Deleted",
      });
    }
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Account permanently deleted.",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: "Internal Server Error",
    });
  }
};

// @desc  Profile
// @route GET /api/user/profile
// @access User

export const profile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
