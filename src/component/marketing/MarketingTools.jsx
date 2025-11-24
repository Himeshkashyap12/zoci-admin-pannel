import {  useNavigate } from "react-router-dom"
import CustomButton from "../common/CustomButton"
import SalesCard from "../salesManagement/SalesCard";
import { Col, Row } from "antd";
import MarketingToolsTable from "./MarketingToolsTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarketingDashboardAsync } from "../../feature/marketing/marketingSlice";
import Cookies from "js-cookie"
import Loader from "../loader/Loader";
const MarketingTools=()=>{
    const navigate=useNavigate();
    const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {marketingDashboard,isLoading}=useSelector(state=>state?.marketing);
            console.log(marketingDashboard);
            
        const getMarketingdashboard=async()=>{
          try {
          const res=await dispatch(getMarketingDashboardAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }



        useEffect(()=>{
        getMarketingdashboard();
        },[])

     const dashboardData = [
            {
              title: "Active Promotions",
              value: marketingDashboard?.[0]?.activePromotionsCount,
            },
            {
              title: "Total Redemption",
              value: marketingDashboard?.[0]?.totalRedemptionCount,
            },
            {
              title: "Current Month Usage",
              value: marketingDashboard?.[0]?.currentMonthRedemptionCount,
            }
  
];
if(isLoading) return <Loader/>

    return(
        <div className="flex flex-col gap-5 p-5">
          <Row gutter={[20,20]}>
           {dashboardData?.map((item,idx)=>{
              return(
                 <Col span={8}>  
                    <SalesCard item={item} />
                  </Col>
              )
           })}
          </Row>
         <div className="flex  gap-5">
          <CustomButton onclick={()=>{navigate("/admin/active-promotion")}}  className={"!text-[#fff] !w-[250px] !h-[60px]"} value={"Active Promotions"}/>
          <CustomButton onclick={()=>{navigate("/admin/expired-promotion")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Expired Promotions"}/>
          <CustomButton onclick={()=>{navigate("/admin/birthday-promotion")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Birthday / Anniversary Banners"}/>
         </div>
         <div className="">
          <MarketingToolsTable marketingDashboard={marketingDashboard} />

         </div>
         <div>
           </div>

        </div>
    )
}
export default MarketingTools;