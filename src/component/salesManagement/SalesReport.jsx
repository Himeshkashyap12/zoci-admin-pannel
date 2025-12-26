

import { Col, Empty, Row, Skeleton } from "antd";
import CustomText from "../common/CustomText";
import ProductSalesChart from "./ProductSalesChart";
import MonthlySalesChart from "./MonthLySalesChart";
import SalesCard from "./SalesCard";
import EventSales from "./EventSales";
import CustomButton from "../common/CustomButton";
import SalesReportTable from "./SalesReportTable";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../common/CustomModal";
import { useEffect, useState } from "react";
import AddExpense from "./addNewExpense/AddExpence";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { getSalesDashboardAsync, getSalesTimeAsync } from "../../feature/sales/salesSlice";
import Loader from "../loader/Loader";
import dayjs from "dayjs";
import { DotChartOutlined } from "@ant-design/icons";
const SalesReport=()=>{
  const [addExpenseModel,setAddExpenseModel]=useState(false);
  const [salesDateOptionValue,setSalesDateOptionValue]=useState({});
  const [salesChartValue,setSalesChartValue]=useState("");
  console.log(salesDateOptionValue,"kbdsfh");
  
  const navigate=useNavigate();
  const token=Cookies.get("token");  
  const dispatch=useDispatch();
  const {slaesDashboard,isLoading,isDashboardLoading}=useSelector(state=>state?.sales);

   const handleSalesReport=(e)=>{
    setSalesChartValue(e)
    const endDate = dayjs(); // today
  let startDate = dayjs();

  if (e === "oneYear") {
    startDate = endDate.subtract(1, "year");
  }
  if (e === "oneMonth") {
    startDate = endDate.subtract(1, "month");
  }

  if (e === "sixMonth") {
    startDate = endDate.subtract(6, "month");
  }

  if (e === "threeMonth") {
    startDate = endDate.subtract(3, "month");
  }

  const payload = {
    startDate: startDate.format("YYYY-MM-DD"),
    endDate: endDate.format("YYYY-MM-DD")
  };
  setSalesDateOptionValue(payload)

    

  }
        const getSalesDashboard=async()=>{
          try {
            const data={...salesDateOptionValue}
          const res=await dispatch(getSalesDashboardAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        const getSalesRevenue=async()=>{
            try {
              const res=await dispatch(getSalesTimeAsync({token}))
            } catch (error) {
              console.log(error);
              
            }
          }

        useEffect(()=>{
        getSalesDashboard();

     
        },[salesDateOptionValue]);
        useEffect(()=>{
               getSalesRevenue()
          },[])
        if(isLoading) return <Loader/>

        const dashboardData = [
      {
        title: "Total Sales",
        value: slaesDashboard?.summary?.totalSales,
        percent: "+12%"
      },
      {
        title: "Total Expenditure",
        value: slaesDashboard?.summary?.totalExpenditure,
        percent: "+8%"
      },
      {
        title: "Net Profit",
        value: slaesDashboard?.summary?.netProfit,
        percent: "-3%"
      },
      {
        title: "Total Orders",
        value: slaesDashboard?.summary?.totalOrders,
        percent: "+1.5%"
      },
      {
        title: "Total Orders Value",
        value: slaesDashboard?.summary?.totalOrderValue??0,
        percent: "+12%"
      },
      {
        title: "Average Order Value",
        value: slaesDashboard?.summary?.avgOrderValue,
        percent: "+8%"
      },
      {
        title: "Top-Selling Category",
        value: slaesDashboard?.summary?.topCategory
    ,
        percent: "+12%"
      },
      {
        title: "Returning Customers",
        value: slaesDashboard?.summary?.returningCustomers,
        percent: "+1.5%"
      }
    ];

if(isLoading ) return <Loader/>
    return(
       <div className="flex flex-col gap-5 p-5">
        <CustomText value={"Sales Reports"}/>
           <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-auto">
                {/* {isDashboardLoading?<Skeleton.Node active style={{ width: 680,height:430 }} /> */}
<MonthlySalesChart salesChartValue={salesChartValue} handleSalesReport={handleSalesReport}  item={slaesDashboard?.monthlySales}/>
          </div>
            </Col>
            <Col span={12}>
            <div className="w-auto">
          <ProductSalesChart salesChartValue={salesChartValue} handleSalesReport={handleSalesReport}  item={slaesDashboard?.productSoldByCategory} />
          </div>
            </Col>
          </Row>
          <Row gutter={[20,20]}>
           {dashboardData.map((item,idx)=>{
            console.log(item);
            
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
          {slaesDashboard?.events?.length>0 &&  <EventSales item={slaesDashboard?.events}/>}
             </Col>
          </Row>
         <div className="flex justify-between">
            <CustomButton onclick={()=>{navigate("/admin/online-sales")}}  className={"!text-[#fff] !w-[250px] !h-[60px]"} value={"Online Sales List"}/>
            <CustomButton onclick={()=>{navigate("/admin/make-order-list")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Make To Order List "}/>
            <CustomButton onclick={()=>{navigate("/admin/offline-sales-list")}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Offline Sales List"}/>
            <CustomButton onclick={()=>{setAddExpenseModel(true)}} className={"!text-[#fff] !w-[250px] !h-[60px]"}value={"Add Expenses"}/>
         </div>
         <div>
            <SalesReportTable  />
           </div>

           <CustomModal open={addExpenseModel} setOpen={setAddExpenseModel} modalBody={<AddExpense setOpen={setAddExpenseModel}/>} width={800} />
        </div>
    )
}
export default SalesReport;