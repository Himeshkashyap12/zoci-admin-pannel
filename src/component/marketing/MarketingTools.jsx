import {  useNavigate } from "react-router-dom"
import CustomButton from "../common/CustomButton"
import SalesCard from "../salesManagement/SalesCard";
import { Col, Row } from "antd";
import MarketingToolsTable from "./MarketingToolsTable";

const MarketingTools=()=>{
    const navigate=useNavigate();
     const dashboardData = [
  {
    title: "Active Promotions",
    value: "10",
  },
  {
    title: "Total Redemption",
    value: "12,365",
  },
  {
    title: "Current Month Usage",
    value: "456",
  }
  
];
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
          <MarketingToolsTable/>

         </div>
         <div>
           </div>

        </div>
    )
}
export default MarketingTools;