

import { Col, Row } from "antd";
import CustomText from "../common/CustomText";
import ProductSalesChart from "./ProductSalesChart";
import MonthlySalesChart from "./MonthLySalesChart";
import SalesCard from "./SalesCard";
import EventSales from "./EventSales";
import CustomButton from "../common/CustomButton";
import SalesReportTable from "./SalesReportTable";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../common/CustomModal";
import { useState } from "react";
import AddExpense from "./addNewExpense/AddExpence";
const SalesReport=()=>{
  const [addExpenseModel,setAddExpenseModel]=useState(false);
  const navigate=useNavigate();
    const dashboardData = [
  {
    title: "Total Sales",
    value: "Rs. 125,450",
    percent: "+12%"
  },
  {
    title: "Total Expenditure",
    value: "Rs. 25,450",
    percent: "+8%"
  },
  {
    title: "Net Profit",
    value: "$143.37",
    percent: "-3%"
  },
  {
    title: "Total Orders",
    value: "350",
    percent: "+1.5%"
  },
  {
    title: "Total Orders Value",
    value: "$125,450",
    percent: "+12%"
  },
  {
    title: "Average Order Value",
    value: "875",
    percent: "+8%"
  },
  {
    title: "Top-Selling Category",
    value: "Ring",
    percent: "+12%"
  },
  {
    title: "Returning Customers",
    value: "350",
    percent: "+1.5%"
  }
];

    return(
       <div className="flex flex-col gap-5 p-5">
        <CustomText value={"Sales Reports"}/>
           <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-[700px]">
                <MonthlySalesChart  />
          </div>
            </Col>
            <Col span={12}>
            <div className="w-[700px]">
          <ProductSalesChart/>
          </div>
            </Col>
          </Row>
          <Row gutter={[20,20]}>
           {dashboardData.map((item,idx)=>{
              return(
                 <Col span={6}>
                    <Link to={
                        idx==0 && "/admin/total-sales" || 
                        idx==1 && "/admin/total-expenditure" || 
                        idx==2 && "/admin/net-profit" || 
                        idx==3 && "/admin/total-order" || 
                        idx==4 && "/admin/sales" || 
                        idx==5 && "/admin/sales" || 
                        idx==6 && "/admin/sales" || 
                        idx==7 && "/admin/returning-customer" 
                        }>
                    <SalesCard item={item} />
                    </Link>
                  </Col>
              )
           })}
          </Row>
          <Row>
            <Col span={24}>
             <EventSales/>
             </Col>
          </Row>
         <div className="flex justify-between">
          <CustomButton onclick={()=>{navigate("/admin/online-sales")}}  className={"!text-[#fff] !w-[250px] !h-[60px]"} value={"Online Sales List"}/>
          <CustomButton onclick={()=>{navigate("/admin/make-order-list")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Make to order list "}/>
          <CustomButton onclick={()=>{navigate("/admin/offline-sales-list")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"offline sales list"}/>
          <CustomButton onclick={()=>{setAddExpenseModel(true)}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Add Expenses"}/>
         </div>
         <div>
            <SalesReportTable />
           </div>

           <CustomModal open={addExpenseModel} setOpen={setAddExpenseModel} modalBody={<AddExpense setOpen={setAddExpenseModel}/>} width={800} />
        </div>
    )
}
export default SalesReport;