import express, { Router } from "express";
import {  changeRole, deleteUserOrSeller,getAdminDashboardStats,getAllDealers,getAllUsers, getUserOrDealer, } from "../controllers/adminControllers.js";
import { isAdminLogin } from "../middlewares/isAdminLogin.js";
import { logIn } from "../controllers/authControllers.js";
import { protectRouter } from "../middlewares/protectRouter.js";
import { isAdmin } from "../middlewares/checkRole.js";



export const adminRouter = Router()




// Admin Login 
adminRouter.post("/login",isAdminLogin,logIn)

// Get All Users 
adminRouter.get("/all-users",protectRouter,isAdmin,getAllUsers)

// Get All Dealers
adminRouter.get("/getalldealers",protectRouter,isAdmin,getAllDealers)

// Get User/Dealer ById
adminRouter.get("/:id",protectRouter,isAdmin,getUserOrDealer)

// Change role 
adminRouter.put("/update/:userId/:role",protectRouter,isAdmin,changeRole)


adminRouter.delete("/user/:id",protectRouter,isAdmin,deleteUserOrSeller)



adminRouter.post("/status",protectRouter,isAdmin, getAdminDashboardStats)


