import jwt from "jsonwebtoken"
import User from "../models/userModel.js"




export const protectRouter = async (req,res,next)=>{
    try {
        let token = req.cookies.token 
        
        // If no token 
        if(!token){
            return res.status(401).json({
                sucess:false,
                error:"Unauthorized : No token provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        
        if(!decoded){
            return res.status(401).json({
                sucess:false,
                error:"Unauthorized : Invalid Token"
            })
        }
        
        // Get user details using ID from token, without returning the password
        const user = await User.findOne({_id:decoded.userId}).select("-password")
        
        if(!user){
             return res.status(404).json({
                sucess:false,
                error:"User Not Found"
            })
        }
        req.user = user
        next()

    } catch (error) {
        console.error(`error in proctectRouter:${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }
}