import mongoose from "mongoose";
import cloudinary from "../config/Cloudnary.js";
import Car from "../models/carModel.js";
import Dealer from "../models/dealerModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";



// @desc     Create car
// @route    POST /api/car/create
// @access   Admin and Dealer

export const createCar = async (req, res) => {
  try {
    //  Directly access user ID
    const userId = req.user._id;

    console.log("Logged in user:", userId);

    //  Dealer verification (check your field name in dealer model)
    const dealer = await User.findOne({_id:userId})

    if (!dealer) {
      return res.status(404).json({
        success: false,
        error: "Unauthorized. Dealer not found for this user.",
      });
    }

    // if (!dealer.verified) {
    //   return res.status(403).json({
    //     success: false,
    //     error: "Dealer is not verified. Cannot create cars.",
    //   });
    // }

    //  Check file upload
    const file = req.file?.path;
    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Image file is required.",
      });
    }

    //  Extract body fields
    const {
      name,
      brand,
      category,
      fuelType,
      transmission,
      available,
      price,
      location,
      seats,
      description,
    } = req.body;

    //  Validate category ID
    if (!category || !mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        error: "Invalid category ID.",
      });
    }
console.log("all fields",req.body)
    // Validate required fields
    if (!name || !brand || !fuelType || !transmission || !price || !location || !seats) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields.",
      });
    }

    //  Upload to cloudinary
    let imageUrl = "";
    try {
      const uploadedResult = await cloudinary.uploader.upload(file, {
        folder: "easy-drive/cars",
        resource_type: "image",
      });
      imageUrl = uploadedResult.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({
        success: false,
        error: "Image upload failed. Please try again.",
      });
    }

    // Check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        error: "Category not found.",
      });
    }

    //  Create car
    const newCar = await Car.create({
      name,
      brand,
      category,
      fuelType,
      transmission,
      available: available ?? true,
      price,
      location,
      seats,
      description: description?.trim() || "",
      image: imageUrl,
      dealer: userId
    });

    res.status(201).json({
      success: true,
      message: "Car created successfully.",
      car: newCar,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error.",
    });
  }
};





// @desc     Get all cars
// @route    GET /api/car
// @access   Admin and Dealer

export const getAllCars = async (req, res) => {
  try {
    //  Populate category name
    const cars = await Car.find().populate("category", "name");

    const formattedCars = cars.map((car) => ({
      ...car._doc,
      category: car.category?.name || "Unknown",
    }));

    res.status(200).json({
      success: true,
      message: "All cars fetched successfully.",
      count: formattedCars.length,
      cars: formattedCars,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error.",
    });
  }
};


// @desc     Get cars by id
// @route    GET /api/car/:id
// @access   Admin and Dealer


export const getSingleCar = async (req, res) => {
  try {
    const carId = req.params.id;

    // Validate carId format
    if (!carId || !mongoose.isValidObjectId(carId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid car ID format",
      });
    }

    //  Find car and populate category name, description, and status
    const car = await Car.findById(carId)
      .populate("category", "name description status");

    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    // ✅ Success response
    res.status(200).json({
      success: true,
      message: "Car fetched successfully",
      car,
    });
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};



// @desc     Update car
// @route    PUT /api/car/:id
// @access   Admin and Dealer

export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const file = req.file?.path; // ✅ Read uploaded file
    console.log("updagte data",req.body)
    const {
      name,
      brand,
      category,
      fuelType,
      transmission,
      available,
      price,
      location,
      seats,
      description,
    } = req.body;

    // ✅ Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found.",
      });
    }

    // ✅ Check if category exists (if provided)
    if (category && !mongoose.isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        error: "Invalid category ID.",
      });
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          error: "Category not found.",
        });
      }
    }

    // ✅ Upload new image if provided
    let imageUrl = car.image; // keep old image by default
    if (file) {
      try {
        const uploadedResult = await cloudinary.uploader.upload(file, {
          folder: "easy-drive/cars",
          resource_type: "image",
        });
        imageUrl = uploadedResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Image upload failed. Please try again.",
        });
      }
    }

    // ✅ Update all fields safely
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.category = category || car.category;
    car.fuelType = fuelType || car.fuelType;
    car.transmission = transmission || car.transmission;
    car.available = available !== undefined ? available : car.available;
    car.price = price || car.price;
    car.location = location || car.location;
    car.seats = seats || car.seats;
    car.description = description || car.description;
    car.image = imageUrl; // ✅ updated or old image

    // ✅ Save updated car
    const updatedCar = await car.save();

    res.status(200).json({
      success: true,
      message: "Car updated successfully.",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error.",
    });
  }
};




// @desc     Delete car
// @route    Delete /api/car/:id
// @access   Admin and Dealer

export const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    await Car.findByIdAndDelete(carId);

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};







// List all available cars
export const listAvailableCars = async (req, res) => {
  try {
    console.log("Fetching available cars...");
    const cars = await Car.find({ available: true }).populate("category");

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars || [],
    });
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get all featured cars
export const getFeaturedCars = async (req, res) => {
  try {
    const cars = await Car.find({ isFeatured: true }).populate("category");
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars || [],
    });
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
