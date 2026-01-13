import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { onlineSalesFilter, onlineSaleSort } from "./onlineFilterData";
import "../sales.css";
const { RangePicker } = DatePicker;

const OnlineSalesFilter=({setSearch,setFilter,setSort,setDate,exportOnlineSales,setPage,filterKey,sortKey})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40,20]}>
                 <Col xxl={7} xl={24} lg={24} md={24}>
                  <div className="w-[70%]">
                   <CustomInput search onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Sales"} />
                   </div>
                 </Col>
                 
                 <Col xxl={17} xl={24} lg={24} md={24}>
                 <div className="flex flex-wrap gap-5 xxl:justify-end"> 
                   <RangePicker
                     disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                    onChange={(i,value)=>{setPage(1),setDate(value)}} />  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  value={sortKey} placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={onlineSaleSort}/>
                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter value={filterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={onlineSalesFilter}/>
                  </div>}/>
                   <CustomButton onclick={()=>{exportOnlineSales()}} value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default OnlineSalesFilter;