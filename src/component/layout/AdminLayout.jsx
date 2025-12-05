import {   Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import {  Outlet } from "react-router";
import CustomSidebar from "./SibeBar";
import { useState } from "react";
import Loader from "../loader/Loader";
const AdminLayout = () => {
  const [loading,setLoding]=useState(false)


  const contentStyle = {
    color: "#d5c294",
    backgroundColor: "#efe6dc",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  
  if(loading) return <div className="absolute to-0% bottom-0 left-0 right-0 fle justify-center items-center"><Loader/></div>


  return (
    <>
      <Layout style={layoutStyle}>
        <CustomSidebar  setLoding={setLoding}/>
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
