import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  blog:[],
  blogDetails:{}, 
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
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlogAsync",
 async ({token,id}) => {
        try {
      const res = await api.delete(`blog/deleteBlog/${id}`,{
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

export const updateBlogAsync = createAsyncThunk(
  "blog/updateBlog",
 async ({token,id,data}) => {
        try {
      const res = await api.put(`blog/updateBlog/${id}`,data,{
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

export const getBlogDetailsAsync = createAsyncThunk(
  "blog/blogDetailsAsync",
 async ({token,id}) => {
        try {
         
      const res = await api.get(`/blog/getBlog/${id}`,{
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
        builder.addCase(deleteBlogAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(deleteBlogAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(updateBlogAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateBlogAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateBlogAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getBlogDetailsAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getBlogDetailsAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.blogDetails=action.payload?.data
          
        });
        builder.addCase(getBlogDetailsAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        
        
        
        
  },
});
 export const {filteredDataHandler}=blogSlice.actions;
export default blogSlice.reducer;
