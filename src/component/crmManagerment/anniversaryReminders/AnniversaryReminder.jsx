import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import AnniversaryReminderFilter from "./AnniversaryReminderFilter";
import AnniversaryRemindertable from "./AnniversaryReminderTable";
import BirthdayReminderFilter from "../birthdayReminder/BirthdayReminderFilter";
import { useDispatch } from "react-redux";
import { getBirthdayAnniversaryReminderAsync } from "../../../feature/crm/crmSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import Cookies from "js-cookie"
const AnniversaryReminder = () => {
  const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const [page,setPage]=useState(1);
      const [date,setDate]=useState([]); 
       const [search,setSearch]=useState("");
       const [sortKey,setSortKey]=useState([])
       const debounceText=useDebounce(search,500)
      const getCrmBirthdayReminderHandler=async()=>{
          const trimSearch=search.trim();
          try {
            const data={
                ...(trimSearch && { q:trimSearch }),
                ...(sortKey?.length>0 && { [sortKey[0]]:sortKey[1]}),
            ...((date?.length>0 && date[0]!='') && {dateFrom:date[0],dateTo:date[1]} ),
                  page:page,
                  limit:10,
                  type:"anniversary"
            }
             if(search && !trimSearch) return;
          const res=await dispatch(getBirthdayAnniversaryReminderAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        };
         useEffect(()=>{
                getCrmBirthdayReminderHandler();
                },[page,sortKey,debounceText,date])
 
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
          value={"CRM → Anniversary Reminders"}
        />
      </div>
     
      <div>
        <BirthdayReminderFilter setDate={setDate} date={date} search={search} setSearch={setSearch} setSortKey={setSortKey}/>
      </div>
      <div>
        <AnniversaryRemindertable  page={page} setPage={setPage}/>
      </div>
    </div>
  );
};
export default AnniversaryReminder;
