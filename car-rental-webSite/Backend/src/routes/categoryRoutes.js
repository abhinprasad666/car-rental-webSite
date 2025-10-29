import express, { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoryControllers.js";
import { protectRouter } from "../middlewares/protectRouter.js";
import { isAdmin } from "../middlewares/checkRole.js";
import { upload } from "../middlewares/multer.js";






export const categoryRouter = Router()

// Create Category
categoryRouter.post("/create",protectRouter,isAdmin,upload.single("image"),createCategory)
// Get All Categorys
categoryRouter.get("/",getAllCategories)
// Get Category By Id 
categoryRouter.get("/:id",getCategory)
// Update Category
categoryRouter.put("/:id",protectRouter,isAdmin,updateCategory)
// Delete Category
categoryRouter.delete("/:id",protectRouter,isAdmin,deleteCategory)