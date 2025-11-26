import {  configureStore } from "@reduxjs/toolkit";

import adminReducer from "../feature/admin/adminSlice";
import authReducer from "../feature/auth/authSlice";
import productReducer from "../feature/product/productSlice"
import inventaryReducer from "../feature/inventaryManagement/inventarySlice";
import blogReducer from "../feature/blog/blogSlice"
import mediaReducer from "../feature/media/mediaSlice"
import marketingReducer from "../feature/marketing/marketingSlice";
import crmReducer from "../feature/crm/crmSlice"
import orderReducer from "../feature/order/orderSlice"
import salesReducer from "../feature/sales/salesSlice"
import uiReducer from "../feature/uiManagement/UiManagementSlice"
const store=configureStore({
    reducer:{
        admin:adminReducer,
        auth:authReducer,
        product:productReducer,
        inventary:inventaryReducer,
        blog:blogReducer,
        media:mediaReducer,
        marketing:marketingReducer,
        crm:crmReducer,
        order:orderReducer,
        sales:salesReducer,
        ui:uiReducer
    }
})

export default store;