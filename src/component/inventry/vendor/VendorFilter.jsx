import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../../common/CustomModal";
import AddNewVendor from "./AddNewVendor";
const VendorFilter=()=>{
  const [addVendorModel,setAddVendorModel]=useState(false);
    return(
        <>
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput placeholder={"Search your orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                     <CustomButton onclick={()=>{setAddVendorModel(true)}} value={<div className="flex items-center gap-2">
                    <PlusOutlined style={{fontSize:"20px",color:"#F0D5A0"}} />
                    <CustomText className={"!text-[#fff]"} value={"Add New vendor"}/>

                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    <CustomText className={"!text-[#fff]"} value={"Filter"}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Sort"}/>

                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
                  </Col>
            </Row>
            <CustomModal  footer={false} setOpen={setAddVendorModel} open={addVendorModel} modalBody={<AddNewVendor setOpen={setAddVendorModel}/>} width={"1052px"}/>
        </>
    )
}
export default VendorFilter;