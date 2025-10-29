import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";




// @desc     User signup  
// @route    POST /api/auth/signup  
// @access   Public  

export const signUp = async (req,res) =>{
    try {
        //  Step 1
        
        const {name,email,password,phone}= req.body || {}
        
        //  Step 2   Input validation: Check if all required fields are provided before creating a user

        if(!name||!email||!password||!phone){
            return res.status(400).json({
                success:false,
                error:"All fields (name, email, password, phone) are required."
            })
        }
        
        //  Step 3   Regular expression to validate standard email formats
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        // Step 4  Validate email format using regex

        if(!emailRegex.test(email)){
           return res.status(400).json({
            error:"Invalid E-Mail Address"
           })
        }

        // Step 5 Check if the email is already registered in the DB
       const existEmail = await User.findOne({email})
       
       // Step 6
       if (existEmail) {
    return res.status(409).json({
        success: false,
        error: "Email already exists. Please use a different email."
    });
   }
   
//    Step 7 Checking password Lenght 
    if (password.length < 6) {
    return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long."
    });
}

// Step 8 Hashing Password 
 const salt= await bcrypt.genSalt(10) 
 const hashedPassword = await bcrypt.hash(password,salt)  // Hash the plain password



//  Step 9 Creating New User 
const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phone
});
// Step 10 Generate Token 
if(newUser){
    generateToken(newUser._id,newUser.role,res)
}

return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser
});

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        })
    }
}




// @desc     User login  
// @route    POST /api/auth/login  
// @access   Public 

export const logIn = async (req,res) =>{
    try {
        
        const {email,password} = req.body || {}

        let existingUser
        let checkPassword

        if(email){
             existingUser = await User.findOne({email})
        }
        
        if(existingUser){
            checkPassword = await bcrypt.compare(password,existingUser?.password || "")  
        }
        if(!existingUser || !checkPassword ){
            res.status(401).json({
                sucess:false,
                error:"Invalid email or password"
            })
        }

        generateToken(existingUser._id,existingUser.role,res)

        res.status(200).json({
           sucess:true,
           message:"Login successful",
           user:existingUser
        })
    } catch (error) {
        res.status(500).json({
            sucess: false,
            error: "Internal Server Error",
        })
    }
}



// @desc     User logout  
// @route    POST /api/auth/logout  
// @access   Private (Authenticated Users) 

export const logOut = async (req,res) =>{
    try {
         res.cookie("token","",{
            maxAge:0
         })



        res.status(200).json({
            sucess:true,
            message:"Logout successful"
        })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error:"Internal Server Error"
        })
    }
}



