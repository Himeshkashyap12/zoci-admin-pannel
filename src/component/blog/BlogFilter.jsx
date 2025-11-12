import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import CustomText from "../common/CustomText";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import { useNavigate } from "react-router-dom";
const BlogFilter=()=>{
    const navigate=useNavigate();
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
                 <CustomButton onclick={()=>{navigate("/admin/add-new-blog")}} className={"!text-[#fff]"} value={"Add New Blog"}/>  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    <CustomText className={"!text-[#fff]"} value={"Filter"}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Custom"}/>

                  </div>}/>
                 
                  </div>
              </Col>
            </Row>
        </>
    )
}
export default BlogFilter;