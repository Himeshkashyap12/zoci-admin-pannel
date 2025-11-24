import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  crmDashboard:[], 
  allvisitors:[],
  customerList:[],
  birthdayAnniversaryReminder:[],
  isLoading: false,
  error: null,
};

export const getCrmAsync = createAsyncThunk(
  "crm/crmDashboardAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/crm/dashboardStats`,{
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
export const getAllVisitorsAsync = createAsyncThunk(
  "crm/allVisitors",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/customersAdmin/allList`,{
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
export const getAllCustomerList = createAsyncThunk(
  "crm/customerList",
 async ({token,data}) => {
        try {
      const res = await api.get(`user/customersAdmin/customers`,{
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
export const getBirthdayAnniversaryReminderAsync = createAsyncThunk(
  "crm/birthdayReminder",
 async ({token,data}) => {
        try {
      const res = await api.get(`/user/crm/reminders`,{
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


export const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getCrmAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getCrmAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.crmDashboard = action.payload;
        });
        builder.addCase(getCrmAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getAllVisitorsAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllVisitorsAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.allvisitors = action.payload;
        });
        builder.addCase(getAllVisitorsAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getAllCustomerList.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllCustomerList.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.customerList = action.payload;
        });
        builder.addCase(getAllCustomerList.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getBirthdayAnniversaryReminderAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getBirthdayAnniversaryReminderAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.birthdayAnniversaryReminder = action.payload;
        });
        builder.addCase(getBirthdayAnniversaryReminderAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
       
       
        
  },
});
export default crmSlice.reducer;
