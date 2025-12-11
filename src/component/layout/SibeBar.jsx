import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import logo from "../../assets/header.png";
import { Menu, Typography } from "antd";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import CustomText from "../common/CustomText";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { logOutHandler } from "../../feature/auth/authSlice";
import { toast } from "react-toastify";
const CustomSidebar = () => {
  const key=Number(Cookies.get("key")); 
  const [selectKey, setSelectKey] = useState(key);
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const userId=Cookies.get("id");
  const siderStyle = {
    color: "#fff",
    backgroundColor: "#214344",
  };
  const sidebarItems = [
    {
      key: 0,
      path: "/admin/inventary",
      style: {
        backgroundColor: selectKey == 0 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 0 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/inventary"}>
          <div >
            <Typography.Text
              className={`${
                selectKey == 0 ? "!text-[#214344]" : "!text-[#fff]"
              } font-[300] !text-[20px] `}
            >
              Inventory Management
            </Typography.Text>
          </div>
        </Link>
      ),
    },
    {
      key: 1,
      path: "/admin/order",
      style: {
        backgroundColor: selectKey == 1 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 1 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/order"}>
          <Typography.Text
            className={`${
              selectKey == 1 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px]`}
          >
            Order Management
          </Typography.Text>
        </Link>
      ),
    },
    {
      key: 2,
      path: "/admin/sales",
      style: {
        backgroundColor: selectKey == 2 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 2 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/sales"}>
          <Typography.Text
            className={`${
              selectKey == 2 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px]`}
          >
            Sales Reports
          </Typography.Text>
        </Link>
      ),
    },
    {
      key: 3,
      path: "/admin/crm",
      style: {
        backgroundColor: selectKey == 3 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 3 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/crm"}>
          <Typography.Text
            className={`${
              selectKey == 3 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px] `}
          >
            CRM
          </Typography.Text>
        </Link>
      ),
    },
    {
      key: 4,
      path: "/admin/marketing",
      style: {
        backgroundColor: selectKey == 4 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 4 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/marketing"}>
          <Typography.Text
            className={`${
              selectKey == 4 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px]`}
          >
            Marketing Tools
          </Typography.Text>
        </Link>
      ),
    },
    {
      key: 6,
      path: "/admin/ui-management",
      style: {
        backgroundColor: selectKey == 6 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 6 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/ui-management"}>
          <Typography.Text
            className={`${
              selectKey == 6 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px]`}
          >
            Ui Management
          </Typography.Text>
        </Link>
      ),
    },
    {
      key: 7,
      path: "/admin/blog",
      style: {
        backgroundColor: selectKey == 7 && "#F0D5A0",
        marginBottom: "10px",
        height: "40px",
        border: selectKey != 7 && "2px solid #F0D5A0",
      },
      label: (
        <Link to={"/admin/blog"}>
          <Typography.Text
            className={`${
              selectKey == 7 ? "!text-[#214344]" : "!text-[#fff]"
            } font-[300] !text-[20px]`}
          >
            Blog Management
          </Typography.Text>
        </Link>
      ),
    },
  ];
  const handleSidebar = (e) => {
    console.log(e.key);
    
    setSelectKey(e.key);
    Cookies.set("key", e.key);
    const selectedItem = sidebarItems.find((item) => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };
const logoutHandler = async () => {
  
    try {

      const res=await  dispatch(logOutHandler({token,userId:userId})).unwrap();
      console.log(res);
      if(res?.statusCode==200 && res.status=="success"){
      toast.success(res.message);

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    setSelectKey(key)

  },[]);
  return (
    <>
      <Sider width="18%" style={siderStyle}>
      <div className="flex flex-col h-[100vh] justify-between">
        <div className="pt-5">
          <div className="lg:h-[50px] h-[30px] lg:w-[150px] w-[100px] mx-auto">
            <img src={logo} alt="logo" />
          </div>
          <div className="admin-sidebar flex flex-col px-2 gap-3 pt-10  ">
            <Menu
              onClick={(e) => {
                handleSidebar(e);
              }}
              items={sidebarItems}
              className="!bg-[#214344]"
              mode="inline"
            />
          </div>
        </div>
        <div className="p-[20px] cursor-pointer" onClick={()=>{logoutHandler()}}>
          <CustomText className={"!text-[#ECD29E]"} value={"Logout"}/>
        </div>
        </div>
      </Sider>
      
    </>
  );
};
export default CustomSidebar;
