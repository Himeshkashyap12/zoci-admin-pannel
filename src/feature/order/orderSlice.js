import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  orderDashboard:[],
  makeOnlineOrders:[],
  makeToOrder:[],
  // generateInvoiceInstants:[],
  productReturnedAndExchange:[],
  isLoading: false,
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
        
       
        
  },
});
export default orderSlice.reducer;
