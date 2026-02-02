
import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../inventary.css"
import { notifyMeAlertSort, notifyMeFilter, stockAlertSort } from "./stockFilterData";
import CustomText from "../../common/CustomText";
import { useSelector } from "react-redux";
const StockFilter=({setSearch,setFilter,setSort,search,stockAlerstStatus,exportProductHandler,filterKey,sortKey,setPage})=>{
   const {category}=useSelector(state=>state?.ui);
  const filteredCategory=category?.categories?.map((item)=>{
    return { label:item?.title,value:item?.title}
  });
  const filtedCategoryBestSeller={
    label:"Category",
    value:"category",
    children: filteredCategory
  
  }
    return(
        <div className="inventary">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search}  onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Products"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">    
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter  value={sortKey} placeholder={"Sort"} onchange={(value)=>{setPage(1),setSort(value)}} option={stockAlerstStatus=="stock"?stockAlertSort:notifyMeAlertSort}/>
                       </div>}/>
                 {stockAlerstStatus!="stock" &&  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter value={filterKey} placeholder={"Filter"} onchange={(value)=>{setPage(1),setFilter(value)}} option={ [...notifyMeFilter,filtedCategoryBestSeller]}/>
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