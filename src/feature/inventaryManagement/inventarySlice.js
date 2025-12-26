import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
const initialState = {
  inventaryDashboard:{}, 
  products:{},
  stockLevelAlert:[],
  notfyMe:[],
  vendorPerformance:[],
  bestSeller:[],
  vendorPerformanceAnalysisData:[],
  productById:[],
  productBySku:[],
  isLoading: false,
  isDashboardLoading:false,
  isCreateProductLoading:false,
  error: null,
};

export const getInventaryDashbordAsync = createAsyncThunk(
  "inventary/inventaryAsync",
 async ({token}) => {
        try {
      const res = await api.get(`/product/dashboard`,{
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



export const getAllProductAsync = createAsyncThunk(
  "inventary/productAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`product/getAllProduct`,{
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
export const getAllProductByIdAsync = createAsyncThunk(
  "inventary/productIdAsync",
 async ({token,id}) => {
        try {
      const res = await api.get(`/product/get-productbyid/${id}`,{
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


export const updateProductAsync = createAsyncThunk(
  "inventary/updateProductAsync",
 async ({token,data,id}) => {
        try {
      const res = await api.put(`/product/updateProduct/${id}`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }

      });
      console.log(res,"dfdf");
      
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "inventary/deleteProduct",
 async ({token,id}) => {
        try {
      const res = await api.delete(`product/deleteProduct/${id}`,{
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
export const stockLevelAlertAsync = createAsyncThunk(
  "inventary/stockAlertAsync",
 async ({token,data}) => {
        try {
      const res = await api.get(`product/stock-alerts`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },params:{
          ...data
        }
      });      
      return res.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);
export const notifyMeAsync = createAsyncThunk(
  "inventary/notifyMe",
 async ({token,data}) => {
        try {
      const res = await api.get(`product/notify-me-products`,{
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
export const vendorPerformanceAnalysis = createAsyncThunk(
  "inventary/vendorAnalysis",
 async ({token,data}) => {
        try {
      const res = await api.get(`/product/performance-summary`,{
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
export const vendorPerformanceDetailsAnalysis = createAsyncThunk(
  "inventary/vendorPerformanceDetails",
 async ({token,id,data}) => {
        try {
      const res = await api.get(`/product/performance/${id}`,{
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


export const bestSellingProducts = createAsyncThunk(
  "inventary/bestSelling",
 async ({token,data}) => {
        try {
      const res = await api.get(`/product/best-selling-products`,{
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
export const dataExportInExcel = createAsyncThunk(
  "inventary/dataExport",
 async ({token,data}) => {
        try {
      const res = await api.post(`/product/export-products`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        responseType: "blob",
        
      });
       return { blob: res.data, headers: res.headers };      
    } catch (error) {
      throw error;
    }
  }
);
export const createVendorAsync = createAsyncThunk(
  "inventary/createVendor",
 async ({token,data}) => {
        try {
      const res = await api.post(`product/createVendor`,data,{
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
export const createProductHandlerAsync = createAsyncThunk(
  "inventary/createProduct",
 async ({token,data}) => {
        try {
      const res = await api.post(`/product/create-new-product`,data,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });      
      return res?.data; // No need for `await res.data`
    } catch (error) {
      console.log(error);
      
      // throw error;
      return error;
      
    }
  }
);
export const createBulkProductAsync = createAsyncThunk(
  "inventary/createBulkProduct",
 async ({token,formData}) => {
        try {
      const res = await api.post(`/product/bulk-upload-products`,formData,{
        headers: {
         "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        }
      });      
      return res?.data; // No need for `await res.data`
    } catch (error) {
      throw error;
    }
  }
);


export const productBySkuAsync = createAsyncThunk(
  "inventary/productBySku",
 async ({token,data}) => {
        try {
      const res = await api.post(`/exhibition/search-sku`,data,{
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



export const inventarySlice = createSlice({
  name: "inventary",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
       builder.addCase(getInventaryDashbordAsync.pending, (state) => {
          state.isDashboardLoading = true;
        });
        builder.addCase(getInventaryDashbordAsync.fulfilled, (state, action) => {                
          state.isDashboardLoading = false;
          state.inventaryDashboard = action.payload;
        });
        builder.addCase(getInventaryDashbordAsync.rejected, (state, action) => {
          state.isDashboardLoading = false;
          state.error = action;
        });
         builder.addCase(getAllProductAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getAllProductAsync.fulfilled, (state, action) => {                
          state.isLoading = false;          
          state.products = action.payload;
        });
        builder.addCase(getAllProductAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
          state.products = [];

        });
         builder.addCase(deleteProductAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {                
          state.isLoading = false;          
        });
        builder.addCase(deleteProductAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
          builder.addCase(stockLevelAlertAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(stockLevelAlertAsync.fulfilled, (state, action) => {                
          state.isLoading = false;   
          console.log(action.payload);
          
          state.stockLevelAlert = action.payload;

        });
        builder.addCase(stockLevelAlertAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(notifyMeAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(notifyMeAsync.fulfilled, (state, action) => {                
          state.isLoading = false;   
          console.log(action.payload);
          
          state.notfyMe = action.payload;

        });
        builder.addCase(notifyMeAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(vendorPerformanceAnalysis.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(vendorPerformanceAnalysis.fulfilled, (state, action) => {                
          state.isLoading = false;   
          state.vendorPerformance = action.payload;

        });
        builder.addCase(vendorPerformanceAnalysis.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
          builder.addCase(vendorPerformanceDetailsAnalysis.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(vendorPerformanceDetailsAnalysis.fulfilled, (state, action) => {                
          state.isLoading = false;   
          state.vendorPerformanceAnalysisData = action.payload;

        });
        builder.addCase(vendorPerformanceDetailsAnalysis.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
          state.vendorPerformanceAnalysisData=[]
        });
         builder.addCase(bestSellingProducts.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(bestSellingProducts.fulfilled, (state, action) => {                
          state.isLoading = false;   
          state.bestSeller = action.payload;

        });
        builder.addCase(bestSellingProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
         builder.addCase(dataExportInExcel.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(dataExportInExcel.fulfilled, (state, action) => {                
          state.isLoading = false;   

        });
        builder.addCase(dataExportInExcel.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action;
        });
          builder.addCase(createVendorAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(createVendorAsync.fulfilled, (state, action) => {                
          state.isLoading = false;   

        });
        builder.addCase(createVendorAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
        builder.addCase(createProductHandlerAsync.pending, (state) => {
          state.isCreateProductLoading = true;
        });
        builder.addCase(createProductHandlerAsync.fulfilled, (state, action) => {                
          state.isCreateProductLoading = false;   

        });
        builder.addCase(createProductHandlerAsync.rejected, (state, action) => {
          state.isCreateProductLoading = false;
          console.log(action);
          
          state.error = action.payload;
        });
         builder.addCase(createBulkProductAsync.pending, (state) => {
          state.isCreateProductLoading = true;
        });
        builder.addCase(createBulkProductAsync.fulfilled, (state, action) => {                
          state.isCreateProductLoading = false;   

        });
        builder.addCase(createBulkProductAsync.rejected, (state, action) => {
          state.isCreateProductLoading = false;
          state.error = action.payload;
        });
        builder.addCase(updateProductAsync.pending, (state) => {
          state.isCreateProductLoading = true;
        });
        builder.addCase(updateProductAsync.fulfilled, (state, action) => {                
          state.isCreateProductLoading = false;   

        });
        builder.addCase(updateProductAsync.rejected, (state, action) => {
          state.isCreateProductLoading = false;
          console.log(action.payload);
          
          state.error = action.payload;
        });
          builder.addCase(getAllProductByIdAsync.pending, (state) => {
          state.isCreateProductLoading = true;
        });
        builder.addCase(getAllProductByIdAsync.fulfilled, (state, action) => {                
          state.isCreateProductLoading = false;  
          state.productById=action.payload; 

        });
        builder.addCase(getAllProductByIdAsync.rejected, (state, action) => {
          state.isCreateProductLoading = false;
          console.log(action.payload);
          
          state.error = action.payload;
        });
         builder.addCase(productBySkuAsync.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(productBySkuAsync.fulfilled, (state, action) => {                
          state.isLoading = false;  
          state.productBySku=action?.payload?.products; 

        });
        builder.addCase(productBySkuAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.productBySku=[];
                });
        
        
        
  },
});
export default inventarySlice.reducer;

