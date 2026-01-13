import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../sales.css"
import { totalOrderFilter, totalOrderSort } from "./totalOrderData";
const { RangePicker } = DatePicker;

const TotalOrderFilter=({setSearch,setFilter,setSort,search,setDate,setPage,filterKey,sortKey})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search}  onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Sales"} />
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
                   <CustomMultipleFilter value={sortKey}  placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={totalOrderSort}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter value={filterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={totalOrderFilter}/>


                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default TotalOrderFilter;