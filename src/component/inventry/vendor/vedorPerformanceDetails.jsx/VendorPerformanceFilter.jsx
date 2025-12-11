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

const   VendorPerformanceFilter=({setSort,setFilter,setSearch,search,exportProductHandler})=>{
    const [productListBulkModel,setproductListBulkModel]=useState(false);
    return(
        <>
         <div className="inventary">
            <Row justify={"center"} gutter={[40,20]}>
                 <Col span={6}>
                 <div className="flex  gap-20 items-center">
                   
                   <div >
                   <CustomInput onchange={(e)=>{setSearch(e.target.value)}}  className={"!w-[350px]"} search={search} placeholder={"Search Vendor Products"} />
                   </div>
                   </div>
                 </Col>
                 <Col span={18}>
                 <div className="flex gap-2 justify-end"> 
                  {/* <CustomButton className={"!text-[#fff]"} value={"Print"}/> */}
                  {/* <CustomButton onclick={()=>{naviagte("/admin/create-product")}}  className={"!text-[#fff]"} value={"Add New product"}/> */}
                  <CustomButton onclick={()=>{setproductListBulkModel(true)}} className={"!text-[#fff]"} value={"Bulk Import"}/>
                  <CustomButton value={<div className="flex items-center justify-between gap-1 ">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                   <CustomMultipleFilter placeholder={"Filter"}  onchange={(value)=>setFilter(value)} option={vendorDetailsFilter}   />

                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"}  onchange={(value)=>setSort(value)} option={vendorDetailsSort}   />

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