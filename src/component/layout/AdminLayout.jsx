import {   Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import {  Outlet } from "react-router";
import CustomSidebar from "./SibeBar";
import { useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAsync } from "../../feature/uiManagement/UiManagementSlice";
import Cookies from "js-cookie";
const AdminLayout = () => {
  const {isLoading}=useSelector(state=>state?.auth)
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const contentStyle = {
    color: "#d5c294",
    backgroundColor: "#efe6dc",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };
  const getCategoryHandler=async()=>{
    try {
      const res=await dispatch(getCategoryAsync(token))
      
    } catch (error) {
     toast.error("Something went wrong. Please try again.");
      
    }
  }

  useEffect(()=>{
    getCategoryHandler();
  },[])
  
  if(isLoading) return <Loader/>


  return (
    <>
      <Layout style={layoutStyle}>
        <CustomSidebar  />
          <Content style={contentStyle}>
            <div className="overflow-y-auto h-full">
              <Outlet />
            </div>
          </Content>
      </Layout>

    </>
  );
};
export default AdminLayout;
