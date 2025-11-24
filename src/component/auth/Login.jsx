import React, { useState } from "react";
import {  Button, ConfigProvider, Input } from "antd";
import {  useNavigate } from "react-router";
import { loginWithNumberAndPassword } from "../../feature/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
const Login = ({ setSingnin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    mobile: "",
    password: "",
  });
  const {isLoading}=useSelector(state=>state?.auth)

  const inputHandler = (e) => {
      if(e.target.name==="mobile" && isNaN(e.target.value)){
        return;
      }
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const signInHandler = async () => {
    if (input.mobile.length < 10 || input.mobile == "")
      return toast.error("Please enter valid mobile number");
    if (input.password == "" || input.password.length < 6)
      return toast.error("Please enter valid password");
    try {
      const res = await loginWithNumberAndPassword(input);
      if (res.status) {
        toast.success(res.message);
        localStorage.setItem("token", res.data?.token);
        localStorage.setItem("userId", res.data?._id);
        dispatch(loginSuccess({ token: res.data.token, users: res.data }));
        if (res.data.role === "admin") {
          navigate("/admin/inventary");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setInput({
        mobile: input.mobile,
        password: "",
      });
    }
  };


  return (
    
      <div className="w-[20%] mx-auto flex flex-col gap-5     justify-center  items-center h-[100vh]">
        <Input
          type="text"
          name="mobile"
          value={input.mobile}
          onChange={(e) => {
            inputHandler(e);
          }}
          placeholder="Enter mobile Number "
          className="w-[100%] px-4 py-2 rounded-full"
        />
        <Input.Password
          name="password"
          value={input.password}
          onChange={(e) => {
            inputHandler(e);
          }}
          placeholder="Enter Password"
          className="w-[100%] px-4 py-2 rounded-full"
        />
        <Button
          onClick={() => {
            signInHandler();
          }}
          className="w-[100%] !bg-[#214344] !text-[#fff] rounded-full !py-2 "
        >
          Sign in
        </Button>
      
      </div>

  );
};
export default Login;
