// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie';
// const token = Cookies.get('token');
// const initialState= {
//     role:localStorage.getItem("role"),
//     userData:{},
//     user:null,
//     token:token || null,
//     isAuthenticated:!!token,
//     mobile:""
// }


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess:(state,action)=>{ 
//         state.userData=action.payload.users;   
//         state.user=action.payload?.users._id;
//         state.token=action.payload.token;
//         state.isAuthenticated=true;
//         Cookies.set('token', action.payload?.token, { expires: 1 });
//     },
//     logout:(state,action)=>{
//         state.user=null;
//         state.token=null;
//         state.isAuthenticated=false;
//         Cookies.remove("token");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("role");
//         localStorage.removeItem("wish");
//         localStorage.removeItem("cart");
//     },
 

  
//   },
// });
// export const {loginSuccess,logout}=authSlice.actions
// export default authSlice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axios/axios";
import Cookies from "js-cookie"
const token=Cookies.get("token");
const initialState = {
    token:token || null,
    isAuthenticated: !!token,
    isLoading:false,
    error:null
};

export const loginWithNumberAndPassword = createAsyncThunk(
  "auth/loginAsync",
 async ({data}) => {
        try {
      const res = await api.post(`/user/loginwithpassword`,data,{
        headers: {
          "Content-Type": "application/json",
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);
export const logOutHandler = createAsyncThunk(
  "auth/logoutAsync",
   async ({token,userId}) => {
        try {
      const res = await api.post(`/user/logout/${userId}`,{},{
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
      });
      return res?.data; // No need for `await res.data`
    } catch (error) {
      return error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
       builder.addCase(loginWithNumberAndPassword.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(loginWithNumberAndPassword.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.token=action?.payload?.data?.token;
          state.isAuthenticated=true;
          Cookies.set("token",action?.payload?.data?.token,{
             expires: 1  ,
             secure: true,
             sameSite: 'Strict'});
          Cookies.set("id",action?.payload?.data?._id);
          Cookies.set("key",0);
        });
        builder.addCase(loginWithNumberAndPassword.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
        builder.addCase(logOutHandler.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(logOutHandler.fulfilled, (state, action) => {                
          state.isLoading = false;
          state.token = null;
          state.isAuthenticated = false;
          Cookies.remove('token');
          Cookies.remove('id');
          Cookies.remove("key");
          Cookies.remove("shipRocketToken");
          Cookies.remove("orderId");
        });
        builder.addCase(logOutHandler.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
  },
});
export default authSlice.reducer;

