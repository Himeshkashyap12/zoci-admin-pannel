import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  category:{}, 
  collection:[],
  signatureItem:[],
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
 async ({token}) => {
  
        try {
      const res = await api.get(`/ui/collections`,{
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
          state.collection=action.payload
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
        
        
        
        
        
  },
});
export default categorySlice.reducer;
