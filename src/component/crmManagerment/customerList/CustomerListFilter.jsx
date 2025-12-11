import { Col, Image, Row } from "antd";
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
const CustomerListFilter=()=>{
 const [search,setSearch]=useState("");
  const [sortKey,setSortKey]=useState([])
  const [fillterKey,setFilterKey]=useState([])
   const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const debounceText=useDebounce(search,500)


        const getAllCustomerListHandler=async()=>{

          const trimSearch=search.trim();

                try {
                   const data={
                ...(trimSearch && { search:trimSearch }),
                ...(sortKey?.length>0 && { [sortKey[0]]:sortKey[1] }),
                ...(fillterKey?.length>0 && { [fillterKey[0]]:fillterKey[1] }),
                  page:1,
                  limit:10
              
             }
             if(search && !trimSearch) return;

                const res=await dispatch(getAllCustomerList({token,data})).unwrap();
                } catch (error) {
                  console.log(error);
                }
              }

                useEffect(()=>{
                getAllCustomerListHandler();
           },[debounceText,sortKey,fillterKey]); 
    return(
        <div className="visitors">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput onchange={(e)=>setSearch(e.target.value)} placeholder={"Search your Customer"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">    
                  {/* <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  placeholder={"Sort"}  option={customerListSort}   onchange={(value)=>{setSortKey(value)}} />

                       </div>}/> */}
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                  <CustomMultipleFilter  placeholder={"Sort"}  option={customerListSort}   onchange={(value)=>{setFilterKey(value)}} />


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default CustomerListFilter;