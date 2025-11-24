


import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import ReturningCustomerFilter from "./ReturningCustomerFilter";
import ReturningCustomerTable from "./ReturningCustomerTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../../loader/Loader";
import Cookies from "js-cookie"
import { getReturningCustomerAsync } from "../../../feature/sales/salesSlice";
const ReturnCustomer = () => {
  const navigate = useNavigate();
   const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {returningCustomers,isLoading}=useSelector(state=>state?.sales);      
            const returningCustomerHandler=async()=>{
              try {
              const res=await dispatch(getReturningCustomerAsync({token})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
            const totalReturnCards=[
              {
              title: "Exhibition Returning Customers",
              value: `Rs. ${returningCustomers?.counts?.exhibition}`,
            },
            {
              title: "Event Returning Customers",
              value: `Rs. ${returningCustomers?.counts?.event}`,
            },
            {
              title: "Online/Operational Returning Customers",
              value: `Rs. ${returningCustomers?.counts?.online}`,
            },
            ]
            useEffect(()=>{
                  returningCustomerHandler();
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
                value={"Sales Reports → Returning Customers"}
              />
            </div>
            <div>
              <Row gutter={[10]}>
                {totalReturnCards?.map((item)=>{
                  return(
                      <Col span={8}>
                  <SalesCard item={item}/>
                  </Col>
                  )
                }) }
            
              </Row>
            </div>
            <div>
              <ReturningCustomerFilter />
            </div>
            <div>
              <ReturningCustomerTable returningCustomers={returningCustomers}/>
            </div>
          </div>
        );
};
export default ReturnCustomer;
