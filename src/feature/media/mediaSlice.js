import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  imageUrl:{}, 
  isMediaLoading: false,
  error: null,
};

export const getImageUrlAsync = createAsyncThunk(
  "image/imageUrlAsync",
 async ({token,formData}) => {
  console.log(formData,"dkhjgj");
  
        try {
      const res = await api.post(`upload/uploadProductImages`,formData,{
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



export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getImageUrlAsync.pending, (state) => {
          state.isMediaLoading = true;
        });
        builder.addCase(getImageUrlAsync.fulfilled, (state, action) => {                
          state.isMediaLoading = false;
          state.imageUrl = action.payload;
        });
        builder.addCase(getImageUrlAsync.rejected, (state, action) => {
          state.isMediaLoading = false;
          state.error = action;
        });
        
        
  },
});
export default mediaSlice.reducer;
