

import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import TotalOrderFilter from "./TotalOrderFilter";
import TotalOrderTable from "./TotalOrderTable";
import { useEffect } from "react";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTotalOrderAsync } from "../../../feature/sales/salesSlice";
import Cookies from "js-cookie";
const TotalOrder = () => {
  const navigate = useNavigate();
   const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {totalOrders,isLoading}=useSelector(state=>state?.sales);  
            const totalOrderHandler=async()=>{
              try {
              const res=await dispatch(getTotalOrderAsync({token})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
     const totalOrderCard=[
              {
              title: "Exhibition Expenses",
              value: `Rs. ${totalOrders?.summary?.exhibitionOrders}`,
            },
            {
              title: "Event Expenses",
              value: `Rs. ${totalOrders?.summary?.eventOrders}`,
            },
            {
              title: "Online/Operational Expenses",
              value: `Rs. ${totalOrders?.summary?.onlineOrders}`,
            },
            ]
              useEffect(()=>{
                totalOrderHandler();
              },[]);

        if(isLoading) return <Loader/>
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/sales");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Sales Reports → Total Order"}
        />
      </div>
      <div>
        <Row gutter={[10]}>

           {totalOrderCard?.map((item)=>{
            return(
                <Col span={8}>
             <SalesCard item={item}/>
            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <TotalOrderFilter />
      </div>
      <div>
        <TotalOrderTable item={totalOrders} />
      </div>
    </div>
  );
};
export default TotalOrder;
