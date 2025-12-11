


import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import ReturningCustomerFilter from "./ReturningCustomerFilter";
import ReturningCustomerTable from "./ReturningCustomerTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import Cookies from "js-cookie"
import { getReturningCustomerAsync } from "../../../feature/sales/salesSlice";
import { useDebounce } from "../../../hooks/UseDebounce";
const ReturnCustomer = () => {
  const navigate = useNavigate();
   const token=Cookies.get("token");
   const [search,setSearch]=useState("");
   const debounce=useDebounce(search,500);
   const [filter,setFilter]=useState([])
   const [sort,setSort]=useState([]) 
   const [page,setPage]=useState(1)              
    const dispatch=useDispatch();
    const {returningCustomers,isLoading}=useSelector(state=>state?.sales);      
            const returningCustomerHandler=async()=>{
              const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),

                }
              try {
                if(search && !trimSearch) return;
              const res=await dispatch(getReturningCustomerAsync({token,data})).unwrap();
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
                },[debounce,sort,filter,page]);
  
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
              <ReturningCustomerFilter search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}/>
            </div>
            <div>
              <ReturningCustomerTable  page={page} setPage={setPage} returningCustomers={returningCustomers}/>
            </div>
          </div>
        );
};
export default ReturnCustomer;
