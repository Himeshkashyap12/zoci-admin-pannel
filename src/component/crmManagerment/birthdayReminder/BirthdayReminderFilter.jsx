import { Col, DatePicker, Image, Row } from "antd";
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
const { RangePicker } = DatePicker ;

const BirthdayReminderFilter=({search,setSearch,setSortKey,setDate,setPage,sortKey})=>{
    return(
        <div className="visitors">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">   
                  <RangePicker 
                    disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                    onChange={(i,value)=>{setPage(1),setDate(value)}} />   
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter value={sortKey}  placeholder={"Sort"}  option={birthdayCrmSort}   onchange={(value)=>{setPage(1),setSortKey(value)}} />


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}

export default BirthdayReminderFilter;