import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { makeToOrderFilter, makeToOrderSort } from "./makeToOrdersData";
import "../order.css";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const MakeTOOrderFilter=({search,setSearch,setFilter,setSort,exportOrderHandler,setDate})=>{
  const navigate=useNavigate();
    return(
        <div className="order">
         <Row justify={"space-between"} gutter={[20,20]}>
                 <Col span={6}>
                  <div className="w-[70%]">
                   <CustomInput search  value={search} name={"search"} onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search Your Orders"} />
                   </div>
                 </Col>
                 
                 <Col span={18}>
                 <div className="flex gap-5 justify-end"> 
                    <RangePicker disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }} onChange={(i,value)=>{setDate(value)}} />
                <CustomButton onclick={()=>{navigate("/admin/add-new-order")}} className={"!w-[220px] !text-[#fff]"} value={"Add New Order"}/>

                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/> 
                   <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={makeToOrderSort}/>
                       </div>}/>
                        
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={makeToOrderFilter}/>
                   </div>}/>

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