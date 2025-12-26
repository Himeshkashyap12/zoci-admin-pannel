import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";



const initialState = {
  faq:[],
  isLoading:false,
  isCreateFaqLoading:false,
  error:null
};

export const fetchFaqAsync = createAsyncThunk(
  "faq/faqAsync",
  async ({token}) => {
    try {
      const res = await api.get("/faqs",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });   
         
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const createFaqAsync = createAsyncThunk(
  "faq/createFaqAsync",
  async ({token,data}) => {
    try {
      const res = await api.post("/faqs",data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });   
         
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteFaqAsync = createAsyncThunk(
  "faq/deleteFaqAsync",
  async ({token,id}) => {
    try {
      const res = await api.delete(`/faqs/delete/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });   
         
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editFaqAsync = createAsyncThunk(
  "faq/editFaqAsync",
  async ({token,id,updatedData}) => {
    try {
      const res = await api.put(`/faqs/${id}`,updatedData,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });   
         
      return res?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFaqAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFaqAsync.fulfilled, (state, action) => {
      state.isLoading = false;         
      state.faq=action?.payload?.data;   
    });
    builder.addCase(fetchFaqAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(createFaqAsync.pending, (state) => {
      state.isCreateFaqLoading = true;
    });
    builder.addCase(createFaqAsync.fulfilled, (state, action) => {
      state.isCreateFaqLoading = false;         
    });
    builder.addCase(createFaqAsync.rejected, (state, action) => {
      state.isCreateFaqLoading = false;
      state.error = action.error.message;
    });
     builder.addCase(deleteFaqAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteFaqAsync.fulfilled, (state, action) => {
      state.isLoading = false;         
    });
    builder.addCase(deleteFaqAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(editFaqAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editFaqAsync.fulfilled, (state, action) => {
      state.isLoading = false;         
    });
    builder.addCase(editFaqAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    
   
  },
});
export default faqSlice.reducer;