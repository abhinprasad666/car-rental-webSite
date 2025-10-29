import jwt from 'jsonwebtoken'




export const generateToken = (userId,role,res)=>{
    // creating token 
    const token = jwt.sign({
        userId,role
    },process.env.JWT_SECRET_KEY,{expiresIn:"60d"})

     // Save this token in a cookie so it’s stored in the browser

    res.cookie("token",token,{
        maxAge: 60 * 24 * 60 * 1000,
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"

    })
}

