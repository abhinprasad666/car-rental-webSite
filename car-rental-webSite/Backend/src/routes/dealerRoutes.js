import express, { Router } from "express";
import { createDealer, deleteDealer, getDealerProfile, updateDealer } from "../controllers/dealerControllers.js";
import { protectRouter } from "../middlewares/protectRouter.js";
import { isDealerOrAdmin } from "../middlewares/checkRole.js";







export const dealerRouter = Router()

// Create Dealer
dealerRouter.post("/create",protectRouter,createDealer)

//  Get Dealer Profile
dealerRouter.get("/profile",protectRouter, isDealerOrAdmin, getDealerProfile);

// Update Dealer
dealerRouter.put("/",protectRouter,isDealerOrAdmin,updateDealer)

// Delete Dealer
dealerRouter.delete("/",protectRouter,isDealerOrAdmin,deleteDealer)