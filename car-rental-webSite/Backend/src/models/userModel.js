import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLenght:6,
        maxLenght:120
    },
    phone:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["customer","dealer","admin"],
        default:"customer"
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

},
{timestamps:true}
)

const User = mongoose.model("User",userSchema)


export default User