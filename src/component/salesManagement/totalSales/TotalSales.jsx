import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import ToTalSalesFilter from "./TotalSalesFilter";
import TotalSalesTable from "./TotalSalesTable";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row, Skeleton } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getTotalSalesAsync } from "../../../feature/sales/salesSlice";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import { useDebounce } from "../../../hooks/UseDebounce";
const TotalSales = () => {
  const navigate = useNavigate();
     const token=Cookies.get("token"); 
      const [date,setDate]=useState([]); 
       const [search,setSearch]=useState("");
             const debounce=useDebounce(search,500);
             const [filter,setFilter]=useState([])
             const [sort,setSort]=useState([]) 
      const [page,setPage]=useState(1)
      const dispatch=useDispatch();
      const {totalSales,isLoading}=useSelector(state=>state?.sales);
            
            const getTotalSalesHandler=async()=>{
                const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),
                  ...((date?.length>0 && date[0]!='') && {startDate:date[0],endDate:date[1]} ),

                }
              try {
                if(search && !trimSearch) return;

              const res=await dispatch(getTotalSalesAsync({token,data})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
            const totalSalesCard=[
              {
              title: "Exhibition Sales",
              value: `Rs. ${totalSales?.totals?.exhibitionSales}`,
            },
            {
              title: "Event Sales",
              value: `Rs. ${totalSales?.totals?.eventSales}`,
            },
            {
              title: "Online Sales",
              value: `Rs. ${totalSales?.totals?.onlineSales}`,
            },
            ]
            useEffect(()=>{
              getTotalSalesHandler();
            },[debounce,page,filter,sort,date])
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
          value={"Sales Reports → Total Sales"}
        />
      </div>
      <div>
        <Row gutter={[10]}>

           {totalSalesCard?.map((item)=>{
            return(
                <Col span={8}>
            {isLoading? <Skeleton.Node active={"active"} className="!w-[100%] !h-[150px] rounded-xl" />: <SalesCard item={item}/>}
            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <ToTalSalesFilter setPage={setPage} filterKey={filter} sortKey={sort}  setDate={setDate} date={date} search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}  />
      </div>
      <div>
        <TotalSalesTable page={page} setPage={setPage}  totalSales={totalSales}/>
      </div>
    </div>
  );
};
export default TotalSales;
