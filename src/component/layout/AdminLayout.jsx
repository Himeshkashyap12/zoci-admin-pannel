import {   Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import {  Outlet } from "react-router";
import { logOutApi } from "../../feature/auth/authApi";
import { logout } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomSidebar from "./SibeBar";
const AdminLayout = () => {
  const dispatch = useDispatch();
  const contentStyle = {
    color: "#d5c294",
    backgroundColor: "#efe6dc",
  };
  const layoutStyle = {
    overflow: "hidden",
    height: "100vh",
  };

  


  return (
    <>
      <Layout style={layoutStyle}>
        <CustomSidebar />
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
