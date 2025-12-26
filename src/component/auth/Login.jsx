import React, { useState } from "react";
import {  Button, ConfigProvider, Image, Input } from "antd";
import {  useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {  loginWithNumberAndPassword } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import CustomInput from "../common/CustomInput";
import CustomText from "../common/CustomText";
import { specialChar } from "../../constants/regex";
const Login = ({ setSingnin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    mobile: "",
    password: "",
  });
const {isLoading}=useSelector(state=>state?.auth);
  const inputHandler = (e) => {
    const {name,value}=e.target;
           if(name=="mobile" && value?.length>10  || specialChar?.test(value) ) return; 
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const signInHandler = async () => {
    try {
      const data={...input}
      const res=await dispatch(loginWithNumberAndPassword({data})).unwrap();      
      if(res?.status_code==200){
         toast.success(res?.message);
          navigate("/admin/inventary");
      }
    } catch (error) {
      toast.error(error.response.data.message);
     

    }
  };

if(isLoading) return <Loader/>
  return (
    <>
       <div className="relative min-h-screen bg-[#e7dbcb] flex flex-col">

  {/* Top hero image */}
  <div className="!h-[100vh] w-full">
    <Image
      className="!h-full w-full object-cover"
      preview={false}
      src="https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764669578193_ff96502f05fef5b845cf4c680f85876781222402%20%281%29.png"
    />
  </div>

  {/* Centered Login Box */}
  <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 
                  w-[90%] sm:w-[500px] bg-[#e7dbcb] rounded-xl shadow-lg
                  border  p-10
                 ">

    <h2 className="text-center text-2xl mb-6 font-semibold text-[#1e1e1e]">
      Login
    </h2>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
      <CustomText className={"!text-[#214344]"} value={"Username"}/>
      <CustomInput
        type="text"

        name="mobile"
        value={input?.mobile}
        onchange={(e)=>{inputHandler(e)}}
        placeholder="Username"
        className="px-4 py-2 rounded-md h-[46px]"
      />
</div>
      <div className="flex flex-col gap-1">
      <CustomText className={"!text-[#214344]"} value={"Password"}/>

      <Input.Password
        name="password"
        value={input?.password}
        onChange={(e)=>{inputHandler(e)}}
        placeholder="Password"
        className="px-4 py-2 rounded-md h-[46px]"
      />
</div>
      <p className="text-center text-sm !text-[#214344] -mt-2">
        Login to view our exclusive products
      </p>

      <Button
        onClick={signInHandler}
        className="!bg-[#214344] !text-white rounded-full !py-2">
        Login
      </Button>

     
    </div>
  </div>

  {/* Footer */}
  <div className="absolute bottom-5 w-full text-center text-xs !text-[#fff]">
    ©2025–2026 All Rights Reserved. Zoci® is a registered trademark.<br/>
    Cookie Preferences, Privacy, and Terms.
  </div>

</div>

      </>


  );
};
export default Login;
