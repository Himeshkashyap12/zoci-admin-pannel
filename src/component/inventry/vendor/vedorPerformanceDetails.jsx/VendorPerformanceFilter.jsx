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

const   VendorPerformanceFilter=()=>{
    const [productListBulkModel,setproductListBulkModel]=useState(false);
    const naviagte=useNavigate();
    return(
        <>
         <div className="inventary">
            <Row justify={"center"} gutter={[40,20]}>
                 <Col span={24}>
                 <div className="flex  gap-20 items-center">
                   
                   <div >
                   <CustomInput className={"!w-[350px]"} search={true} placeholder={"Search your product"} />
                   </div>
                   </div>
                 </Col>
                 <Col span={24}>
                 <div className="flex gap-2"> 
                  {/* <CustomButton className={"!text-[#fff]"} value={"Print"}/> */}
                  <CustomButton onclick={()=>{naviagte("/admin/create-product")}}  className={"!text-[#fff]"} value={"Add New product"}/>
                  <CustomButton onclick={()=>{setproductListBulkModel(true)}} className={"!text-[#fff]"} value={"Bulk Import"}/>
                  <CustomButton value={<div className="flex items-center justify-between gap-1 ">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                   <CustomMultipleFilter placeholder={"Filter"} />
                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"}  />

                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-1">
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