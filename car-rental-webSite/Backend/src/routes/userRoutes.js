import express, { Router } from "express"
import { deleteUser, profile , updateUser } from "../controllers/userControllers.js"
import { protectRouter } from "../middlewares/protectRouter.js"



export const userRouter = Router()



// Update a user 
userRouter.put("/",protectRouter,updateUser)

// Delete a user 
userRouter.delete("/",protectRouter,deleteUser)

// Profile 
userRouter.get("/profile",protectRouter,profile)


   





export default userRouter