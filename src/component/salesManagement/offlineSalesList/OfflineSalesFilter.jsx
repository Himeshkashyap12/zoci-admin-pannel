import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { offlineSalesFilter, offlineSaleSort } from "./offlineFilterData";
import "../sales.css"
const { RangePicker } = DatePicker;

const OnlineSalesFilter=({setSearch,setFilter,setSort,setDate,exportOfflineSales,setPage,filterKey,sortKey})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40,20]}>
                 <Col xxl={6} xl={24} lg={24} md={24} sm={24}>
                  <div className="w-[70%] ">
                   <CustomInput search onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Sales"} />
                   </div>
                 </Col>
                 
                 <Col xxl={18} xl={24} lg={24} md={24} sm={24}>
                 <div className="flex flex-wrap gap-5 xl:justify-end ">
                   <RangePicker
                   disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                   onChange={(i,value)=>{setDate(value)}} />  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter value={sortKey} placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={offlineSaleSort}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter value={filterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={offlineSalesFilter}/>
                  </div>}/>
                   <CustomButton onclick={()=>{exportOfflineSales()}} value={<div className="flex items-center gap-2">
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