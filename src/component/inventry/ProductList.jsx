import { Col, Image, Row } from "antd";
import CustomInput from "../common/CustomInput";
import CustomText from "../common/CustomText";
import { SearchOutlined } from "@ant-design/icons";
import CustomButton from "../common/CustomButton"
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
const ProductList=()=>{
    return(
            <Row justify={"center"} gutter={[40]}>
                 <Col span={8}>
                 <div className="flex  gap-5 items-center">
                    <div className="w-[30%]">
                   <CustomText className={"font-bold !text-[#214344]"} value={"Entire Product list"}/>
                   </div>
                   <div className="w-[70%]">
                   <CustomInput placeholder={"Search your product"} />
                   </div>
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 "> 
                  <CustomButton className={"!text-[#fff]"} value={"Print"}/>
                  <CustomButton className={"!text-[#fff]"} value={"Import bulk product"}/>
                  <CustomButton className={"!text-[#fff]"} value={"Create individual product"}/>
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
        
    )
}
export default ProductList;