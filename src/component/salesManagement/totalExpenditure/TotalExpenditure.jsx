
import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row, Skeleton } from "antd";
import TotalExpenditureFilter from "./TotalExpenditureFilter";
import TotalExpenditureTable from "./TotalExpenditureTable";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { getTotalExpenditureAsync } from "../../../feature/sales/salesSlice";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import { toast } from "react-toastify";
const TotalExpenditure = () => {
        const [page,setPage]=useState(1);
        const [search,setSearch]=useState("");
        const debounce=useDebounce(search,500);
        const [date,setDate]=useState([]); 
        const [filter,setFilter]=useState([])
        const [sort,setSort]=useState([])
        const navigate = useNavigate();
        const token=Cookies.get("token");
        const dispatch=useDispatch();
        const {totalExpenditure,isLoading}=useSelector(state=>state?.sales);            
                const totalExpenditureHandler=async()=>{
                const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),
                  ...((date?.length>0 && date[0]!='') && {startDate:date[0],endDate:date[1]} )


                }
                if(search && !trimSearch) return;
              try {
              const res=await dispatch(getTotalExpenditureAsync({token,data})).unwrap();
              } catch (error) {
                // toast.error("Something went wrong. Please try again.");  
              }
            }
          const totalExpenditureCards=[
            {
            title: "Operational Expenses",
            value: `Rs. ${totalExpenditure?.totals?.operationalExpenses}`,
          },
           {
            title: "Event Expenses",
            value: `Rs. ${totalExpenditure?.totals?.eventExpenses}`,
          }
          ]

               useEffect(()=>{
                totalExpenditureHandler();
              },[debounce,filter,sort,date]);

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
          value={"Sales Reports → Total Expenditure"}
        />
      </div>
      <div>
        <Row gutter={[10]}>

           {totalExpenditureCards?.map((item)=>{
            return(
                <Col span={8}>
                {isLoading? <Skeleton.Node active={"active"} className="!w-[100%] !h-[150px] rounded-xl" />: <SalesCard item={item}/>}
            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <TotalExpenditureFilter setPage={setPage} filterKey={filter} sortKey={sort}   setDate={setDate} date={date} search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}/>
      </div>
      <div>
        <TotalExpenditureTable item={totalExpenditure} setPage={setPage} page={page} />
      </div>
    </div>
  );
};
export default TotalExpenditure;
 