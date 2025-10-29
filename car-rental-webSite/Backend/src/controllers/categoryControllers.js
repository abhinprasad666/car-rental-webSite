import cloudinary from "../config/Cloudnary.js";
import Category from "../models/categoryModel.js";





// @desc     Create a new category
// @route    POST /api/category
// @access   Admin

export const createCategory = async (req, res) => {
  try {
    
    const { name, description } = req.body;
    const file = req.file?.path;
    //  Validate 
    if(!name || !description ){
      return res.status(400).json({
        success:false,
        error:"Require All Flieds"

      })
    }

    // check if already exists
    const existingCategory = await Category.findOne({ name: name.trim().toLowerCase() });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }
    
    // Upload image to Cloudinary if file provided
        let imageUrl = "";
        if (file) {
            try {
                const uploadedResult = await cloudinary.uploader.upload(file, {
                    folder: "easy-drive/category",
                    resource_type: "image",
                });
                
                imageUrl = uploadedResult.secure_url;
            } catch (error) {
                res.status(500).json({
                  success:false,
                  error:"Image upload failed. Please try again."
                })
               
            }
        }

      const category = await Category.create({
      name: name.trim().toLowerCase(),
      description,
      image: imageUrl || ""
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// @desc     Get all categories
// @route    GET /api/category
// @access   Public

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};



// @desc     Get category by ID
// @route    GET /api/category/:id
// @access   Public

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};




// @desc     Update category
// @route    PUT /api/category/:id
// @access   Admin

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status,image } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, status,image },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};




// @desc     Delete category
// @route    DELETE /api/category/:id
// @access   Admin

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
