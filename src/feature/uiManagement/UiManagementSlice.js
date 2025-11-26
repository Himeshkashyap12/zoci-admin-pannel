import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  category:{}, 
  isLoading: false,
  error: null,
};

export const getCategoryAsync = createAsyncThunk(
  "category/categoryAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/category/getallCategory`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }

      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const createCollectionAsync = createAsyncThunk(
  "collection/collectionAsync",
 async ({token,formData}) => {
  
        try {
      const res = await api.post(`/ui/collections`,formData,{
        headers: {
          "Authorization": `Bearer ${token}`,
        }

      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);


export const getCollectionAsync = createAsyncThunk(
  "collection/getCollection",
 async ({token,formData}) => {
  
        try {
      const res = await api.get(`/ui/collections`,{
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        }
      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getCategoryAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getCategoryAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.category = action.payload;
        });
        builder.addCase(getCategoryAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(createCollectionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createCollectionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(createCollectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getCollectionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getCollectionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(getCollectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        
  },
});
export default categorySlice.reducer;
