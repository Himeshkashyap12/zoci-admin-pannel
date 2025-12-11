import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../../hooks/UseDebounce";
import Cookies from "js-cookie";
import { getBirthdayAnniversaryReminderAsync } from "../../../feature/crm/crmSlice";
import { useEffect, useState } from "react";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { birthdayCrmSort } from "./birthdayData";
import "../allVisitors.css";
const BirthdayReminderFilter=({type})=>{
      const [search,setSearch]=useState("");
  const [sortKey,setSortKey]=useState([])
   const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const debounceText=useDebounce(search,500)
    



       const getCrmBirthdayReminderHandler=async()=>{
            const trimSearch=search.trim();
          try {
            const data={
                ...(trimSearch && { q:trimSearch }),
                ...(sortKey?.length>0 && { [sortKey[0]]:sortKey[1]}),
                  page:1,
                  limit:10,
                  type:type
            }
             if(search && !trimSearch) return;
                const res=await dispatch(getBirthdayAnniversaryReminderAsync({token,data})).unwrap();
                } catch (error) {
                  console.log(error);
                }
              }
      
              
               useEffect(()=>{
                      getCrmBirthdayReminderHandler();
                 },[sortKey,debounceText])
       
         
    return(
        <div className="visitors">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput  onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search your orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">    
                  {/* <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    <CustomText className={"!text-[#fff]"} value={"Filter"}/>
                       </div>}/> */}
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter  placeholder={"Sort"}  option={birthdayCrmSort}   onchange={(value)=>{setSortKey(value)}} />


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}

export default BirthdayReminderFilter;