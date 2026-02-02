import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../sales.css"
import { totalSaleFilter, totalSaleSort } from "./totalSalesData";
const { RangePicker } = DatePicker;

const OnlineSalesFilter=({setSearch,setFilter,setSort,search,setDate,setPage,fiterKey,sortKey})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40,20]}>
                 <Col  xxl={8} xl={24} lg={24} md={24}>
                   <div className="w-[70%]">
                   <CustomInput search value={search}  onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Sales"} />
                   </div>
                 </Col>
                 <Col  xxl={16} xl={24} lg={24} md={24}>
                 <div className="flex gap-5 justify-end">  
                   <RangePicker
                   disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                   onChange={(i,value)=>{setPage(1),setDate(value)}} />  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  value={sortKey}  placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={totalSaleSort}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter value={fiterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={totalSaleFilter}/>
                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default OnlineSalesFilter;