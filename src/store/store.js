import {  configureStore } from "@reduxjs/toolkit";

import adminReducer from "../feature/admin/adminSlice";
import authReducer from "../feature/auth/authSlice";
import productReducer from "../feature/product/productSlice"
const store=configureStore({
    reducer:{
       
        admin:adminReducer,
        auth:authReducer,
        product:productReducer
    }
})

export default store;