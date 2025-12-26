
import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../inventary.css"
import { notifyMeAlertSort, notifyMeFilter, stockAlertSort } from "./stockFilterData";
import CustomText from "../../common/CustomText";
const StockFilter=({setSearch,setFilter,setSort,search,stockAlerstStatus,exportProductHandler})=>{
    return(
        <div className="sales">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search}  onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search your Products"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">    
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={stockAlerstStatus=="stock"?stockAlertSort:notifyMeAlertSort}/>
                       </div>}/>
                 {stockAlerstStatus!="stock" &&  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={ notifyMeFilter}/>
                  </div>}/>}
                   <CustomButton onclick={()=>{exportProductHandler()}} value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default StockFilter;