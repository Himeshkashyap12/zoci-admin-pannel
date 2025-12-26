import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import "../allVisitors.css"
import { useEffect, useState } from "react";
import { getAllCustomerList } from "../../../feature/crm/crmSlice";
import { useDebounce } from "../../../hooks/UseDebounce";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { customerListSort } from "./CustomerListData";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
const { RangePicker } = DatePicker;

const CustomerListFilter=({setSearch,search,setSortKey,setDate})=>{


      

               
    return(
        <div className="visitors">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search} onchange={(e)=>setSearch(e.target.value)} placeholder={"Search your Customer"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">  
                  <RangePicker 
                    disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                    onChange={(i,value)=>{setDate(value)}} />    
                  {/* <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  placeholder={"Sort"}  option={customerListSort}   onchange={(value)=>{setSortKey(value)}} />

                       </div>}/> */}
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                  <CustomMultipleFilter  placeholder={"Sort"}  option={customerListSort}   onchange={(value)=>{setSortKey(value)}} />


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default CustomerListFilter;