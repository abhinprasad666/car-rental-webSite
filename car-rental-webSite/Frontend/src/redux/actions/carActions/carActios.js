import axiosInstance from "../../../api/axiosInstance";
import { availableCarsFail, availableCarsRequest, availableCarsSuccess, carsFail, carsRequest, carsSuccess, singleCarFail, singleCarRequest, singleCarSuccess } from "../../slices/carSlice/carSlice";



export const getCars = async (dispatch)=>{
     dispatch(carsRequest())
     const {data}=await axiosInstance.get("api/v1/car")
     console.log("cars data",data)
     try {
        dispatch(carsSuccess(data))
     } catch (error) {
        console.log("error",error)
        dispatch(carsFail(
            error
        ))
     }
}
//get single car

export const getSingleCar =id=> async (dispatch)=>{
     dispatch(singleCarRequest())
     const {data}=await axiosInstance.get(`api/v1/car/${id}`)
     console.log("single car data",data)
     try {
        dispatch(singleCarSuccess(data))
     } catch (error) {
        console.log("error",error)
        dispatch(singleCarFail(
            error
        ))
     }
}

export const  availableCars = (updateData) => async (dispatch) => {
    
   
    try {
        dispatch(availableCarsRequest());

       const {data}=await axiosInstance.get("api/v1/car/available");

        dispatch(availableCarsSuccess(data));
    } catch (error) {
        console.error("Load user failed:", error.response?.data?.error || error.message);
        dispatch(availableCarsFail(error.response?.data?.error || ""));
    }
};
