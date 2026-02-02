



import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import AllVisitorsFilter from "./AllvisitorsFilter";
import AllVisitorsTable from "./AllVisitorsTable";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getAllVisitorsAsync } from "../../../feature/crm/crmSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import { toast } from "react-toastify";
const AllVisitorsList = () => {
    const navigate=useNavigate();
    const [search,setSearch]=useState("");
    const [sortKey,setSortKey]=useState([]);
    const debounceText=useDebounce(search,500)
    const token=Cookies.get("token");  
    const dispatch=useDispatch();
    const [date,setDate]=useState([]); 
    const [page,setPage]=useState(1);
    const getAllVisitors=async()=>{
        const trimSearch=search.trim();
          try {
            const data={
                ...(trimSearch && { search:trimSearch }),
                ...(sortKey?.length>0 && { [sortKey[0]]:sortKey[1] }),
            ...((date?.length>0 && date[0]!='') && {fromDate:date[0],toDate:date[1]} ),
                  page:page,
                  limit:10
             }
             if(search && !trimSearch) return;
          const res=await dispatch(getAllVisitorsAsync({token,data})).unwrap();
          } catch (error) {
          //  toast.error("Something went wrong. Please try again.");
          }
        }
         useEffect(()=>{
           getAllVisitors();
          },[page,debounceText,sortKey,date])
        
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/crm");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"CRM → All Visitor List"}
        />
      </div>
     
      <div>
        <AllVisitorsFilter setPage={setPage}  sortKey={sortKey}  setDate={setDate} date={date}  search={search} setSearch={setSearch} setSortKey={setSortKey} />
      </div>
      <div>
        <AllVisitorsTable page={page} setPage={setPage} />
      </div>
    </div>
  );
};
export default AllVisitorsList;
