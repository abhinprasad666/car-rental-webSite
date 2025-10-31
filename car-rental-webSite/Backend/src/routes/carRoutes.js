import express, { Router } from "express";
import {  createCar, deleteCar, getAllCars, getFeaturedCars, getSingleCar, listAvailableCars, updateCar } from "../controllers/carControllers.js";
import { protectRouter } from "../middlewares/protectRouter.js";
import { isDealerOrAdmin } from "../middlewares/checkRole.js";
import { upload } from "../middlewares/multer.js";





export const carRouter = Router()

// Create Car
carRouter.post("/create",protectRouter,isDealerOrAdmin,upload.single("image"),createCar)
//list available cars
carRouter.get("/available", listAvailableCars);
// Get All Cars
carRouter.get("/",getAllCars)
// Get Car By Id 
carRouter.get("/:id",getSingleCar)
// Update Car
carRouter.put("/:id",protectRouter,isDealerOrAdmin,upload.single("image"),updateCar)
// Delete Car
carRouter.delete("/:id",protectRouter,isDealerOrAdmin,deleteCar)

//  Route to get all featured cars
carRouter.post("/featured", getFeaturedCars);