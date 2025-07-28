import { configureStore } from "@reduxjs/toolkit";
import carReducer from '../features/cars/carSlice';
import authReducer from '../features/auth/authSlice'
import userReducer from "../features/users/userSlice"
import adminCarReducer from "../features/cars/adminCarSlice";


export const store = configureStore({
    reducer:{
        car:carReducer,
        auth: authReducer,
        adminCar: adminCarReducer,
        users: userReducer
    }
})