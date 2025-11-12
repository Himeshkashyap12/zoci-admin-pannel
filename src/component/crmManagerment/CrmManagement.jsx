import {  useNavigate } from "react-router-dom"
import CustomButton from "../common/CustomButton"
import SalesCard from "../salesManagement/SalesCard";
import CustomText from "../common/CustomText";
import { Col, Row } from "antd";
import CrmTable from "./CrmTable";

const CrmManagement=()=>{
    const navigate=useNavigate();
     const dashboardData = [
  {
    title: "Total Costumers",
    value: "125,450",
    percent: "+12%"
  },
  {
    title: "New Costumers",
    value: "Rs. 25,450",
    percent: "+8%"
  },
  {
    title: "Top Customer Spend",
    value: "$143.37",
    percent: "-3%"
  },
  {
    title: "Frequent Shoppers",
    value: "350",
    percent: "+1.5%"
  },
  {
    title: "Birthday Reminders",
    value: "$125,450",
    percent: "+12%"
  },
  {
    title: "Anniversary Reminders",
    value: "875",
    percent: "+8%"
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
         <div className="flex justify-between">
          <CustomButton onclick={()=>{navigate("/admin/crm-all-visitors-list")}}  className={"!text-[#fff] !w-[250px] !h-[60px]"} value={"All Visitor List"}/>
          <CustomButton onclick={()=>{navigate("/admin/crm-customer-list")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Customers List "}/>
          <CustomButton onclick={()=>{navigate("/admin/crm-birthday-reminder")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Birthday Reminders"}/>
          <CustomButton onclick={()=>{navigate("/admin/crm-anniversary-reminder")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Anniversary Reminders"}/>
         </div>
         <div className="">
          <CrmTable />

         </div>
         <div>
           </div>

        </div>
    )
}
export default CrmManagement;