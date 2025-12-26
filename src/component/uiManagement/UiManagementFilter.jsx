

import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import { uiFilterData } from "./uiFilterData";
const UiManagementFilter=({search,setSearch,setSortFilter})=>{
   
   
     
    return(
        <div className="inventary">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search onchange={(e)=>{setSearch(e.target.value)}} name={"search"} value={search}  placeholder={"Search Collection"} />
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