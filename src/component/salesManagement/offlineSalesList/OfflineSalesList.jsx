





import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import OfflineSalesFilter from "./OfflineSalesFilter";
import OfflineSalesTable from "./OfflineSalesTable";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getOfflineListAsync } from "../../../feature/sales/salesSlice";
import { useEffect, useState } from "react";
import CustomPagination from "../../common/CustomPagination";
import { useDebounce } from "../../../hooks/UseDebounce";
import { offlineSalesExport } from "../constants";
import { toast } from "react-toastify";
const OfflineSalesList = () => {
  const navigate = useNavigate();
  const token=Cookies.get("token");  
      const dispatch=useDispatch();
       const [page,setPage]=useState(1);
      const [date,setDate]=useState([]); 
             const [search,setSearch]=useState("");
             const debounce=useDebounce(search,500);
             const [filter,setFilter]=useState([])
             const [sort,setSort]=useState([])
        const getOfflineSalesList=async()=>{
           const trimSearch=search.trim();
          const data={
            limit:10,
            page:page,
            ...(search && {search:trimSearch} ),
            ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
            ...(filter?.length>0 && {[filter[0]]:filter[1]} ),
             ...((date?.length>0 && date[0]!='') && {startDate:date[0],endDate:date[1]} ),

          }
             if(search && !trimSearch) return ;
          try {
          const res=await dispatch(getOfflineListAsync({token,data})).unwrap();
          } catch (error) {
            // toast.error("Something went wrong. Please try again.");  
          }
        }
         const exportOfflineSales = async () => {
                           const data={
                             ...(search && {search:trimSearch} ),
                                    ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                              ...(filter?.length>0 && {[filter[0]]:filter[1]} ),
                                  ...((date?.length>0 && date[0]!='') && {startDate:date[0],endDate:date[1]} ),
        
                            }
                                     offlineSalesExport({dispatch,token,data})
                   };
        useEffect(()=>{
        getOfflineSalesList();
        },[debounce,filter,sort,date,page])
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
          value={"Sales Reports → Offline Sales List"}
        />
      </div>
     
      <div>
        <OfflineSalesFilter setPage={setPage} filterKey={filter} sortKey={sort}  exportOfflineSales={exportOfflineSales} setDate={setDate} date={date} setSearch={setSearch} setFilter={setFilter} setSort={setSort}/>
      </div>
      <div>
        <OfflineSalesTable page={page} setPage={setPage} />
       
      </div>
    </div>
  );
};
export default OfflineSalesList;
