import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    cars: null,
    car:null,
    loading: false,
    error: null,
    availableCars:null
    
}


const carsSlice = createSlice({
    name:"cars",
    initialState,
    reducers: {
        carsRequest: (state) =>{
            state.loading =true;
            state.error = null
        },
        carsSuccess: (state,action)=>{
            state.loading=false;
            state.cars = action.payload.cars
        },
        carsFail: (state,action)=>{
            state.loading=false;
            state.error=action.payload.error;
//get single car
        }, singleCarRequest: (state) =>{
            state.loading =true;
            state.error = null
        },
        singleCarSuccess: (state,action)=>{
            state.loading=false;
            state.car = action.payload.car
        },
       singleCarFail: (state,action)=>{
            state.loading=false;
            state.error=action.payload.error;

        },

           availableCarsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
     availableCarsSuccess: (state, action) => {
      state.loading = false;
       state.availableCars=action.payload.data
   
    },
     availableCarsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;

    },
    }
})



export const {
    carsRequest,carsSuccess,carsFail,singleCarRequest,singleCarSuccess,singleCarFail,
     availableCarsRequest,
   availableCarsSuccess,
   availableCarsFail,
}=carsSlice.actions

export default carsSlice.reducer