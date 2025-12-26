


import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../sales.css"
import { returningFilter, returningSort } from "./returningData";
const { RangePicker } = DatePicker;

const ReturningCustomerFilter=({setSearch,setFilter,setSort,search,setDate})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search}  onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search your Sales"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">   
                   <RangePicker 
                   disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                   onChange={(i,value)=>{setDate(value)}} />  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={returningSort}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={returningFilter}/>


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default ReturningCustomerFilter;