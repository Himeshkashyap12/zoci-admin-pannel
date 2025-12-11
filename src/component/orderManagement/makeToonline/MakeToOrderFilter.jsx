import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../order.css"
import { makeToOnlineOrderFilter, makeToOnlineOrderSort } from "./makeToOrderOnlineData";
const { RangePicker } = DatePicker;
const MakeTOOrderFilter=({search,setSearch,setFilter,setSort,exportOrderHandler,setDate})=>{
    return(
        <div className="order">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput value={search} onchange={(e)=>{setSearch(e.target.value)}}  placeholder={"Search Your Orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={makeToOnlineOrderFilter}/>
                    
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={makeToOnlineOrderSort}/>

                  </div>}/>
                    <RangePicker onChange={(i,value)=>{setDate(value)}} />
                  <CustomButton onclick={()=>{exportOrderHandler()}} value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                 
                  </div>}/>
                  </div>
                  </Col>
            </Row>
        </div>
    )
}
export default MakeTOOrderFilter;