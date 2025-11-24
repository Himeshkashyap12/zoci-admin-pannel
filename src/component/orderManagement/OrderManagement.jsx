import { Col, Row } from "antd";
import OrderTopButton from "./OrderTopButton";
import OnlineOrderChart from "./OrderChart";
import ProductChart from "./ProductChart";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie"
import { useEffect } from "react";
import {  getOrderManagementDashboardAsync } from "../../feature/order/orderSlice";
import Loader from "../loader/Loader";
const OrderManagement=()=>{
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {orderDashboard,isLoading}=useSelector(state=>state?.order);
            console.log(orderDashboard);
            
        const getOrderDashboard=async()=>{
          try {
          const res=await dispatch(getOrderManagementDashboardAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
        getOrderDashboard();
        },[])
        if(isLoading) return <Loader/>
    return(
       <div className="flex flex-col gap-5 p-5">
          <OrderTopButton/>
           <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-[700px]">
          <OnlineOrderChart onlineOrders={orderDashboard?.onlineOrders} />
          </div>
            </Col>
            <Col span={12}>
            <div className="w-[700px]">
          <ProductChart exchangedCategories={orderDashboard?.exchangedCategories}/>
          </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <div className="!h-[400px]">
            <OnlineOrderChart onlineOrders={orderDashboard?.onlineOrders} />
            </div>
            </Col>
          </Row>
         
          
        </div>
    )
}
export default OrderManagement;