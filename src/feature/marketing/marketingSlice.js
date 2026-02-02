import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
import { toast } from "react-toastify";
const initialState = {
  marketingDashboard:[], 
  promotion:[],
  birthday:[],
  anniversary:[],
  isLoading: false,
  error: null,
};

export const getMarketingDashboardAsync = createAsyncThunk(
  "marketing/marketingDashboardAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/promotions/getDashboardStats`,{
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
export const getAllPromotionAsync = createAsyncThunk(
  "marketing/promotionAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/promotions/getPromotions`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },params:{
            ...data
        }
      });
      return res?.data?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const getAllBirthdayPromotion = createAsyncThunk(
  "marketing/birthdayPromotionAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`promotions/getBirthdayUsers`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },params:{
            ...data
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);


export const getAllAnniversaryAsync = createAsyncThunk(
  "marketing/anniversaryAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`promotions/getAnniversaryUsers`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },params:{
            ...data
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const CreateNewPromotionAsync = createAsyncThunk(
  "marketing/newPromotion",
 async ({token,data}) => {
        try {
      const res = await api.post(`/promotions/createPromotion`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);
export const deleteNewPromotionAsync = createAsyncThunk(
  "marketing/deletePromotionAsync",
 async ({token,id}) => {
        try {
      const res = await api.delete(`promotions/deletePromotion/${id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const updateNewPromotionAsync = createAsyncThunk(
  "marketing/editNewPromotionAsync",
 async ({token,id,data}) => {
        try {
      const res = await api.patch(`/promotions/updatePromotion/${id}`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);





export const birthdayExportInExcelAsync = createAsyncThunk(
  "marketing/birthdayExport",
 async ({token,data}) => {
        try {
      const res = await api.get(`/promotions/exportBirthdaysExcel`,{
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
export const anniversaryExportInExcelAsync = createAsyncThunk(
  "marketing/anniversaryExport",
 async ({token,data}) => {
        try {
      const res = await api.get(`promotions/exportAnniversaryExcel`,{
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
export const promotionExportInExcelAsync = createAsyncThunk(
  "marketing/promotionExport",
 async ({token,data}) => {
        try {
      const res = await api.get(`/promotions/exportPromotionsExcel`,{
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
      toast.error("Something went wrong. Please try again.");
           
      throw error;
    }
  }
);
export const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getMarketingDashboardAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getMarketingDashboardAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.marketingDashboard = action.payload;
        });
        builder.addCase(getMarketingDashboardAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getAllPromotionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllPromotionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.promotion = action.payload;
        });
        builder.addCase(getAllPromotionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getAllBirthdayPromotion.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllBirthdayPromotion.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.birthday = action.payload;
        });
        builder.addCase(getAllBirthdayPromotion.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
          state.birthday=[];
        });
        builder.addCase(getAllAnniversaryAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllAnniversaryAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.anniversary = action.payload;
        });
        builder.addCase(getAllAnniversaryAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
          state.anniversary=[];
        });
         builder.addCase(CreateNewPromotionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(CreateNewPromotionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.anniversary = action.payload;
        });
        builder.addCase(CreateNewPromotionAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
        builder.addCase(deleteNewPromotionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteNewPromotionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(deleteNewPromotionAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
         builder.addCase(updateNewPromotionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateNewPromotionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateNewPromotionAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
         builder.addCase(birthdayExportInExcelAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(birthdayExportInExcelAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(birthdayExportInExcelAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
        builder.addCase(anniversaryExportInExcelAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(anniversaryExportInExcelAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(anniversaryExportInExcelAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
        builder.addCase(promotionExportInExcelAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(promotionExportInExcelAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(promotionExportInExcelAsync.rejected, (state, action) => {
          state.isLoading = false;          
          state.error = action;
        });
        
        
        
        
  },
});
export default marketingSlice.reducer;
