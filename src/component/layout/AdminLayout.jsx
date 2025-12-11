import {   Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import {  Outlet } from "react-router";
import CustomSidebar from "./SibeBar";
import { useState } from "react";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
const AdminLayout = () => {
  const {isLoading}=useSelector(state=>state?.auth)


  const contentStyle = {
    color: "#d5c294",
    backgroundColor: "#efe6dc",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  
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
