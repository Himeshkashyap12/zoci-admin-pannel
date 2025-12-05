import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  slaesDashboard:[],
  onlineSales:[],
  makeToOrder:[],
  offlineOrder:[],
  totalSales:[],
  totalExpenditure:[],
  netProfit:[],
  totalOrders:[],
  returningCustomers:[],
  returningCustomerDetails:[],
  salesTime:[],
  isLoading: false,
  isDashboardLoading:false,
  error: null,
};

export const getSalesDashboardAsync = createAsyncThunk(
  "sales/salesDashboardAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/user/getSalesDashboard/all`,{
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
export const getOnlineSalesList = createAsyncThunk(
  "sales/onlineAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/getOnlineSales/all`,{
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
  "sales/maketoOrderAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/listMakeToOrder/all`,{
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

export const getOfflineListAsync = createAsyncThunk(
  "sales/offlineAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/offlineorder/offline-orders`,{
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
export const getTotalExpenditureAsync = createAsyncThunk(
  "sales/totalExpenditure",
 async ({token,data}) => {
        try {
      const res = await api.get(`/expense/get-expenses`,{
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

export const getNetProfitAsync = createAsyncThunk(
  "sales/profitAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/getSalesDashboard/get-netprofit`,{
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

export const getTotalOrderAsync = createAsyncThunk(
  "sales/totalOrderAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/offlineorder/total-orders/report`,{
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

 export const getReturningCustomerAsync = createAsyncThunk(
  "sales/returningAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/getReturningCustomersList/all`,{
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

export const getTotalSalesAsync = createAsyncThunk(
  "sales/totalSalesAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/getSalesReport/all`,{
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


export const getReturningCustomerDetailsAsync = createAsyncThunk(
  "sales/returningCustomerAsync",
 async ({token,id,data}) => {
        try {
      const res = await api.get(`/user/getCustomerHistory/${id}`,{
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


export const getSalesTimeAsync = createAsyncThunk(
  "sales/salesEarning",
 async ({token}) => {
        try {
      const res = await api.get(`user/revenue-table/all`,{
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
export const createExpenseAsync = createAsyncThunk(
  "sales/expenseAsync",
 async ({token,data}) => {
        try {
      const res = await api.post(`/expense/add-expense`,data,{
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








export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
        builder.addCase(getSalesDashboardAsync.pending, (state) => {
          state.isDashboardLoading = true;
        });
        builder.addCase(getSalesDashboardAsync.fulfilled, (state, action) => {                
          state.isDashboardLoading = false;
          state.slaesDashboard = action.payload;
        });
        builder.addCase(getSalesDashboardAsync.rejected, (state, action) => {
          state.isDashboardLoading = false;
          state.error = action;
        });   
         builder.addCase(getOnlineSalesList.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getOnlineSalesList.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.onlineSales = action.payload;
        });
        builder.addCase(getOnlineSalesList.rejected, (state, action) => {
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
         builder.addCase(getOfflineListAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getOfflineListAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.offlineOrder = action.payload;
        });
        builder.addCase(getOfflineListAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getTotalExpenditureAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getTotalExpenditureAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.totalExpenditure = action.payload;
        });
        builder.addCase(getTotalExpenditureAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getNetProfitAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getNetProfitAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.netProfit = action.payload;
        });
        builder.addCase(getNetProfitAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getTotalOrderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getTotalOrderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.totalOrders = action.payload;
        });
        builder.addCase(getTotalOrderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getReturningCustomerAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getReturningCustomerAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.returningCustomers = action.payload;
        });
        builder.addCase(getReturningCustomerAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getTotalSalesAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getTotalSalesAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.totalSales = action.payload;
        });
        builder.addCase(getTotalSalesAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getReturningCustomerDetailsAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getReturningCustomerDetailsAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.returningCustomerDetails = action.payload;
        });
        builder.addCase(getReturningCustomerDetailsAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
         builder.addCase(getSalesTimeAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getSalesTimeAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.salesTime = action.payload;
        });
        builder.addCase(getSalesTimeAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
        builder.addCase(createExpenseAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createExpenseAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(createExpenseAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        }); 
        
  },
});
export default salesSlice.reducer;
