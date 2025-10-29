import express, { Router } from "express"
import { logIn, logOut, signUp } from "../controllers/authControllers.js"




export const authRouter = Router()

// Signup 
authRouter.post("/signup",signUp)
// Login
authRouter.post("/login",logIn)
// Logout
authRouter.post("/logout",logOut)






