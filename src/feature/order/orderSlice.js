import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const initialState = {
  orderDashboard:[],
  makeOnlineOrders:[],
  makeToOrder:[],
  productReturnedAndExchange:[],
  previosAddressData:[],
  exhibitionPlace:[],
  eventType:[],
  shipRocketAddress:[],
  isLoading: false,
  addAddressIsLoading:false,
  error: null,
};

export const getOrderManagementDashboardAsync = createAsyncThunk(
  "order/orderAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/user/getDashboardAnalytics`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res?.data?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const getManageOnlineOrderAsync = createAsyncThunk(
  "order/orderManageAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/onlineOrders`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const getMakeToOrderAsync = createAsyncThunk(
  "order/maketoOrderAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/make-to-orders`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);

export const getOrderProductReturnedAdnExchange = createAsyncThunk(
  "order/orderReturnedAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/returnedOrders`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrder",
 async ({token,data}) => {
        try {
      const res = await api.put(`/user/returnedOrders`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const orderExportInExcelAsync = createAsyncThunk(
  "order/orderExport",
 async ({token,data}) => {
        try {
      const res = await api.get(`/make-to-orders/export/csv`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        },
        responseType: "blob",
        
      });
       return { blob: res.data, headers: res.headers };      
    } catch (error) {
      throw error;
    }
  }
);
export const getPreviousAddressAsync = createAsyncThunk(
  "order/previousAddressAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/exhibition/invoice-prefill`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          type:"address",
          ...data
        }
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getPreviousBillingPlaceAsync = createAsyncThunk(
  "order/prviousBillingPlace",
 async ({token,data}) => {
        try {
      const res = await api.get(`/exhibition/invoice-prefill`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          type:"exhibitionPlace",
          ...data
        }
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getEventTypeAsync = createAsyncThunk(
  "order/eventTypeAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/exhibition/invoice-prefill`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          type:"eventType",
          ...data
        }
      });
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);


export const addNewOrderAsync = createAsyncThunk(
  "order/addnewOrder",
 async ({token,data}) => {
        try {
      const res = await api.post(`/make-to-orders`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);


// Ship Rocket Api 


export const generateTokenAsync = createAsyncThunk(
  "order/generateToken",
 async ({data}) => {
        try {
      const res = await api.post(`/shiprocket/proxy`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);
export const createOrderAsync = createAsyncThunk(
  "order/cerateOrder",
 async ({shipRocketToken,data}) => {
        try {
      const res = await api.post(`/shiprocket/proxy`,data,{
        headers: {
          "Content-Type": "application/json",
          "x-shiprocket-token": `${shipRocketToken}`
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const addAddressAsync = createAsyncThunk(
  "order/addAddress",
 async ({shipRocketToken,data}) => {
        try {
      const res = await api.post(`/shiprocket/proxy`,data,{
        headers: {
          "Content-Type": "application/json",
          "x-shiprocket-token": `${shipRocketToken}`,
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);
export const getAddressAsync = createAsyncThunk(
  "order/getAddress",
 async ({shipRocketToken,data}) => {
        try {
      const res = await api.post(`/shiprocket/proxy`,data,{
        headers: {
          "Content-Type": "application/json",
          "x-shiprocket-token": `${shipRocketToken}`,
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const updateOrderStatusAsync = createAsyncThunk(
  "order/updateOrderStatus",
 async ({token,data,id}) => {
  
        try {
      const res = await api.put(`/make-to-orders/${id}`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      return res?.data; // No need for `await res.data`
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      
      throw error;
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
        builder.addCase(getOrderManagementDashboardAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getOrderManagementDashboardAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.orderDashboard = action.payload;
        });
        builder.addCase(getOrderManagementDashboardAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getManageOnlineOrderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getManageOnlineOrderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.makeOnlineOrders = action.payload;
        });
        builder.addCase(getManageOnlineOrderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getMakeToOrderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getMakeToOrderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.makeToOrder = action.payload;
        });
        builder.addCase(getMakeToOrderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getOrderProductReturnedAdnExchange.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getOrderProductReturnedAdnExchange.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.productReturnedAndExchange = action.payload;
        });
        builder.addCase(getOrderProductReturnedAdnExchange.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(updateOrderStatus.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(orderExportInExcelAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(orderExportInExcelAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(orderExportInExcelAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getPreviousAddressAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getPreviousAddressAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.previosAddressData=action.payload;
        });
        builder.addCase(getPreviousAddressAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getPreviousBillingPlaceAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getPreviousBillingPlaceAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.exhibitionPlace=action.payload;
        });
        builder.addCase(getPreviousBillingPlaceAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getEventTypeAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getEventTypeAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.eventType=action.payload;
        });
        builder.addCase(getEventTypeAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(addNewOrderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(addNewOrderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(addNewOrderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });

         builder.addCase(generateTokenAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(generateTokenAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          Cookies.set("shipRocketToken",action?.payload?.token)
        });
        builder.addCase(generateTokenAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getAddressAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAddressAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.shipRocketAddress=action.payload?.data?.shipping_address
        });
        builder.addCase(getAddressAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
          builder.addCase(createOrderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createOrderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(createOrderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(addAddressAsync.pending, (state) => {
          state.addAddressIsLoading = true;
        });
        builder.addCase(addAddressAsync.fulfilled, (state, action) => {                
          state.addAddressIsLoading = false;
        });
        builder.addCase(addAddressAsync.rejected, (state, action) => {
          state.addAddressIsLoading = false;
          state.error = action;
        });
         builder.addCase(updateOrderStatusAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateOrderStatusAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateOrderStatusAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        
  },
});
export default orderSlice.reducer;
