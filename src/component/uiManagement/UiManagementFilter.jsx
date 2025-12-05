

import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import CustomText from "../common/CustomText";
import { useEffect, useState } from "react";
import { collectionDataHandler, getCollectionAsync } from "../../feature/uiManagement/UiManagementSlice";
import { useDebounce } from "../../hooks/UseDebounce";
import Cookies from "js-cookie"
import { useDispatch } from "react-redux";
import { uiFilterData } from "./uiFilterData";
const UiManagementFilter=({})=>{
   const [search,setSearch]=useState("");
   const debouncedText = useDebounce(search, 500);
   const token=Cookies.get("token");
   const [sortFilter,setSortFilter]=useState([]);
   console.log(sortFilter,"hvhv");
   
   const dispatch=useDispatch();
      const getCollection=async()=>{ 
                try {
             const trimSearch=search.trim();
            const data={
                ...(trimSearch && { search:trimSearch }),
                ...(sortFilter.length>0 && { [sortFilter[0]]:sortFilter[1] }),
                  page:1,
                  limit:10
              }

      if (search && !trimSearch) {
        return; 
      }
      dispatch(collectionDataHandler())
            const res=await dispatch(getCollectionAsync({token,data})).unwrap();
            } catch (error) {
               console.log(error);   
            } 
            }


             useEffect(()=>{
                     getCollection();
                },[debouncedText,sortFilter]);
    return(
        <div className="inventary">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput onchange={(e)=>{setSearch(e.target.value)}} name={"search"} value={search} search={true} placeholder={"Search Collection"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                  <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSortFilter(value)}} option={uiFilterData}/>


                       </div>}/>
                
                 
                  </div>
                  </Col>
            </Row>
        </div>
    )
}
export default UiManagementFilter;