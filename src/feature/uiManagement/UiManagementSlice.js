import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  category:{}, 
  collection:[],
  signatureItem:[],
  menCategory:[],
  womenCategory:[],
  homeVideos:[],
  isLoading: false,
  error: null,
};




export const getHomeVideosAsync = createAsyncThunk(
  "category/homeVideos",
 async ({token}) => {
        try {
      const res = await api.get(`ui/getAllVideos`,{
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
export const updateHomeVideoAsync = createAsyncThunk(
  "category/updateVideo",
 async ({token,id,formData}) => {
  console.log(formData,"formdata");
  
        try {
      const res = await api.put(`/ui/updateVideo/${id}`,formData,{
        headers: {
          "Content-Type": "multipart/form-data" ,
          "Authorization": `Bearer ${token}`,
        }

      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);
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
 async ({token,data}) => {
  
        try {
      const res = await api.post(`/ui/collections`,data,{
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


export const getCollectionAsync = createAsyncThunk(
  "collection/getCollection",
 async ({token,data}) => {
  
        try {
      const res = await api.get(`/ui/collections`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const getSignatureAsync = createAsyncThunk(
  "collection/getSignatureAsync",
 async ({token,id}) => {
        try {
      const res = await api.get(`/ui/collections/${id}`,{
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
export const addItemToCollectionAsync = createAsyncThunk(
  "collection/addItemToAsync",
 async ({token,id,data}) => {
  console.log(id);
  
        try {
      const res = await api.post(`ui/collections/${id}/items`,data,{
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

export const deleteItemToCollectionAsync = createAsyncThunk(
  "collection/deleteItem",
 async ({token,collectionId,ItemId}) => {
  
        try {
      const res = await api.delete(`ui/collections/${collectionId}/items/${ItemId}`,{
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


export const updateColllectionAsync = createAsyncThunk(
  "collection/updateCollection",
 async ({token,id,data}) => {
  
        try {
      const res = await api.put(`/ui/collections/${id}`,data,{
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



export const getMenCategoryHandlerAsync = createAsyncThunk(
  "collection/menCategoryAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/category/getallCategory`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);
export const getWomenCategoryHandlerAsync = createAsyncThunk(
  "collection/womenCategoryAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`/category/getallCategory`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        params:{
          ...data
        }
      });
      return res?.data; 
    } catch (error) {
      throw error;
    }
  }
);
export const createCategoryAsync = createAsyncThunk(
  "collection/createCategoryAsync",
 async ({token,data}) => {
        try {
      const res = await api.post(`/category/create-category`,data,{
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
export const deleteCategoryAsync = createAsyncThunk(
  "collection/dleteCategoryAsync",
 async ({token,id}) => {
        try {
      const res = await api.delete(`/category/delete-category/${id}`,{
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
export const editCategoryAsync = createAsyncThunk(
  "collection/editCategoryAsync",
 async ({token,id,updatedData}) => {
        try {
      const res = await api.put(`/category/update-category/${id}`,updatedData,{
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


export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    collectionDataHandler:(state,action)=>{
       state.collection=[];
    }
   
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
          console.log(action.payload);
          
          state.collection=[...state.collection,...action.payload?.collections]
        });
        builder.addCase(getCollectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getSignatureAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getSignatureAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.signatureItem=action.payload
        });
        builder.addCase(getSignatureAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(addItemToCollectionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(addItemToCollectionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(addItemToCollectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(deleteItemToCollectionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteItemToCollectionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(deleteItemToCollectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        builder.addCase(updateColllectionAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateColllectionAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateColllectionAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getMenCategoryHandlerAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getMenCategoryHandlerAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.menCategory=action.payload;
        });
        builder.addCase(getMenCategoryHandlerAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(getWomenCategoryHandlerAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getWomenCategoryHandlerAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.womenCategory=action.payload;
        });
        builder.addCase(getWomenCategoryHandlerAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(createCategoryAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createCategoryAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(createCategoryAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(deleteCategoryAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(editCategoryAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(editCategoryAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(editCategoryAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        builder.addCase(getHomeVideosAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getHomeVideosAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.homeVideos=action.payload;
        });
        builder.addCase(getHomeVideosAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
          builder.addCase(updateHomeVideoAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(updateHomeVideoAsync.fulfilled, (state, action) => {                
          state.isLoading = false;
        });
        builder.addCase(updateHomeVideoAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
        
        
        
        
        
        
        
        
  },
});


export const {collectionDataHandler}=categorySlice.actions;
export default categorySlice.reducer;
