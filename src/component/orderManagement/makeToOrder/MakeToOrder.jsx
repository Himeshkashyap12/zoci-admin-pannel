
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import MakeTOOrderFilter from "./MakeToOrderFilter";
import MakeToOrderTablePage from "./MakeTOOrderTable";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getMakeToOrderAsync } from "../../../feature/order/orderSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import { orderExportInExcelHandler } from "../constants";
const MakeToOrder=()=>{
    const navigate=useNavigate()
    const token=Cookies.get("token");  
    const dispatch=useDispatch();
    const [date,setDate]=useState([]);  
    const [page,setPage]=useState(1);
    const [search,setSearch]=useState("");
    const debounce=useDebounce(search,500);
    const [filter,setFilter]=useState([])
    const [sort,setSort]=useState([])  
    const getMakeToOrder=async()=>{
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
          const res=await dispatch(getMakeToOrderAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
          const exportOrderHandler = async () => {
                  const data={startDate:[date[0]],endDate:date[1]}
                           orderExportInExcelHandler({dispatch,token,data})
                       };
        useEffect(()=>{
        getMakeToOrder();
        },[page,filter,debounce,sort,date])
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Order Management → Make to Order"}/>
            </div>
            <div>
                <MakeTOOrderFilter date={date} setPage={setPage} filterKey={filter} sortKey={sort} setDate={setDate} exportOrderHandler={exportOrderHandler} search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}  />
            </div>
            
              <div>
               <MakeToOrderTablePage  setPage={setPage} page={page}/>
              </div>
        
        </div>
    )
}
export default MakeToOrder;