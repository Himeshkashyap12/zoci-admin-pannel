

import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import CustomText from "../common/CustomText";
const UiManagementFilter=({})=>{
  


    return(
        <div className="inventary">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search={true} placeholder={"Search your orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                   <CustomMultipleFilter placeholder={"Filter"} />

                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter placeholder={"Sort"}/>


                  </div>}/>
                 
                  </div>
                  </Col>
            </Row>
        </div>
    )
}
export default UiManagementFilter;