import User from "../models/userModel.js"


export const isAdminLogin = async (req,res,next) => {
        const {email} = req.body || {}
        const user = await User.findOne({email})
        console.log("find user",user)
        
        if(!user){
            return res.status(404).json({
                success:false,
                error:"Admin Not Found"
            })
        }
        if(user.role !=="admin"){
             return res.status(404).json({
                success:false,
                error:"Access denied: Admin privileges required"
            })
        }
        next( )
        

}

