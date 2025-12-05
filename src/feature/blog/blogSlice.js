import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  blog:[], 
  isLoading: false,
  error: null,
};

export const getBlogAsync = createAsyncThunk(
  "blog/blogAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/blog/getAllBlogs`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }

      });
      return res?.data?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);

export const createBlogAsync = createAsyncThunk(
  "blog/createBlogAsync",
 async ({token,data}) => {
        try {
      const res = await api.post(`/blog/createNewBlog`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }

      });
      return res?.data?.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
     filteredDataHandler:(state,action)=>{
      state.blog=[];
     }
  },
  extraReducers: (builder) => {
       builder.addCase(getBlogAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getBlogAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          console.log(action?.payload,"kfsufb");
          
          state.blog = [...state?.blog,...action.payload.blogs];
        });
        builder.addCase(getBlogAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(createBlogAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createBlogAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(createBlogAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        
  },
});
 export const {filteredDataHandler}=blogSlice.actions;
export default blogSlice.reducer;
