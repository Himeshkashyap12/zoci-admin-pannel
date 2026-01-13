import CustomText from "../../../common/CustomText"
import CustomInput from "../../../common/CustomInput"
import CustomModal from "../../../common/CustomModal"
import CreateBulkProduct from "../../CreateBulkProduct"
import { useState } from "react"
import { Col, Image, Row } from "antd";
import filter from "../../../../assets/inventary/filter.png"
import sort from "../../../../assets/inventary/sort.png"
import CustomButton from "../../../common/CustomButton"
import CustomMultipleFilter from "../../../common/CustumMultipleFilter"
import { useNavigate } from "react-router-dom"
import { vendorDetailsFilter, vendorDetailsSort } from "./vendorDetailsFilterData"

const   VendorPerformanceFilter=({setSort,setFilter,setSearch,search,exportProductHandler ,filterKey,sortKey,setPage})=>{
    const [productListBulkModel,setproductListBulkModel]=useState(false);
    return(
        <>
         <div className="inventary">
            <Row justify={"center"} gutter={[40,20]}>
                 <Col span={6}>
                 <div className="flex  gap-20 items-center">
                   <div >
                   <CustomInput search value={search} onchange={(e)=>{setPage(1),setSearch(e.target.value)}}  className={"!w-[350px]"}  placeholder={"Search Vendor Products"} />
                   </div>
                   </div>
                 </Col>
                 <Col span={18}>
                 <div className="flex gap-2 justify-end"> 
                  <CustomButton onclick={()=>{setproductListBulkModel(true)}} className={"!text-[#fff]"} value={"Bulk Import"}/>
                  <CustomButton value={<div className="flex items-center justify-between gap-1 ">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter value={filterKey} placeholder={"Filter"}  onchange={(value)=>{setPage(1),setFilter(value)}} option={vendorDetailsFilter}   />
                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter value={sortKey} placeholder={"Sort"}  onchange={(value)=>{setPage(1),setSort(value)}} option={vendorDetailsSort}   />
                  </div>}/>
                  <CustomButton onclick={()=>{exportProductHandler()}} value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
                  </Col>
               
            </Row>
            <CustomModal closeIcon  footer={false} setOpen={setproductListBulkModel} open={productListBulkModel} modalBody={<CreateBulkProduct setproductListBulkModel={setproductListBulkModel}/>} width={"490px"}  align={"center"}/>

            </div>

        </>
    )
}
export default VendorPerformanceFilter;