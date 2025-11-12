import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomModal from "../../common/CustomModal";
import CreateNewPromotion from "../CreateNewPromotion";
import { useState } from "react";
const ExpiredPromotionFilter=()=>{
      const [newPromotionModel,setPromotionModel]=useState(false)
    
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
                 <CustomButton onclick={()=>{setPromotionModel(true)}} className={"!text-[#fff]"} value={"Create new Promotion"}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    <CustomText className={"!text-[#fff]"} value={"Filter"}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Sort"}/>

                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
              </Col>
            </Row>
            <CustomModal  footer={false} setOpen={setPromotionModel} open={newPromotionModel} modalBody={<CreateNewPromotion setOpen={setPromotionModel}/>} width={"1052px"}/>

        </>
    )
}
export default ExpiredPromotionFilter;