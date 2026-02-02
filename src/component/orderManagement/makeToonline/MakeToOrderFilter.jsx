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
const MakeTOOrderFilter=({search,setSearch,setFilter,setSort,exportOrderHandler,setDate,setPage,filterKey,sortKey})=>{
    return(
        <div className="order">
         <Row   gutter={[40,20]}>
                 <Col xxl={8} xl={24} lg={24} md={24}>
                  <div className="w-[70%]">
                   <CustomInput search value={search} onchange={(e)=>{setPage(1),setSearch(e.target.value)}}  placeholder={"Search Your Orders"} />
                   </div>
                 </Col>
                 
                 <Col xxl={16} xl={24} lg={24} md={24}>
                 <div className="flex gap-5 xxl:justify-end">
                      <RangePicker
                      disabledDate={(current) => {
                        return current && current > new Date().setHours(0, 0, 0, 0);
                      }} onChange={(i,value)=>{setPage(1),setDate(value)}} />
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter value={filterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={makeToOnlineOrderFilter}/>
                    
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter value={sortKey} placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={makeToOnlineOrderSort}/>

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