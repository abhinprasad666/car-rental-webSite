import {connect} from "mongoose"
import dotenv from "dotenv";
dotenv.config();





export const DB_Connect = async()=>{
    try {
        const DB_URL = process.env.DB_URL
        
        await connect(DB_URL)
        console.log("DataBase Sucessfully Connected")
    } catch (error) {
        console.log("Error in database connection",error.message)
    }
}