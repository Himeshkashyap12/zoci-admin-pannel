

import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row, Skeleton } from "antd";
import TotalOrderFilter from "./TotalOrderFilter";
import TotalOrderTable from "./TotalOrderTable";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getTotalOrderAsync } from "../../../feature/sales/salesSlice";
import Cookies from "js-cookie";
import { useDebounce } from "../../../hooks/UseDebounce";
const TotalOrder = () => {
  const navigate = useNavigate();
   const token=Cookies.get("token");
    const dispatch=useDispatch();
         const [search,setSearch]=useState("");
         const debounce=useDebounce(search,500);
         const [filter,setFilter]=useState([])
         const [sort,setSort]=useState([])       
         const [page,setPage]=useState(1)
         const [date,setDate]=useState([]); 
    
    const {totalOrders,isLoading}=useSelector(state=>state?.sales);  
            const totalOrderHandler=async()=>{
               const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),
                  ...((date?.length>0 && date[0]!='') && {startDate:date[0],endDate:date[1]} )


                }
              try {
                if(search && !trimSearch) return;
              const res=await dispatch(getTotalOrderAsync({token,data})).unwrap();
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
              },[page,filter,sort,debounce,date]);

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
              {isLoading? <Skeleton.Node active={"active"} className="!w-[100%] !h-[150px] rounded-xl" />: <SalesCard item={item}/>}

            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <TotalOrderFilter setDate={setDate} date={date} search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch} />
      </div>
      <div>
        <TotalOrderTable page={page} setPage={setPage}   item={totalOrders} />
      </div>
    </div>
  );
};
export default TotalOrder;
