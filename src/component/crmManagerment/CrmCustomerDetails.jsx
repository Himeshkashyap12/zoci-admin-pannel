import { Col, Image, Row } from "antd";
import profile from "../../assets/crm/customerDetail.png"
import CustomText from "../common/CustomText";
const CrmCustomerDetails=()=>{
    return(
        <Row gutter={20}>
            <Col span={6}>
               <div className="flex flex-col ps-[20px] gap-5">
                <div className="size-[200px] ">
                    <Image className="h-full w-full object-cover rounded-full" preview={false} src={profile}/>
                </div>
                <div className="flex flex-col gap-1 ps-[10px]">
                    <CustomText className={"!text-[24px] !text-[#214344] font-bold"} value={"Meher Bose"}/>
                    <CustomText className={"!text-[18px] !text-[#000] font-[300] "} value={`Customer ID : 123456`}/>
                </div>

               </div>
            
            </Col>
            <Col span={10}>
            <div className="flex flex-col gap-5">
                <div><CustomText className={"!text-[#214344] !text-[18px] font-semibold"}  value={"Details"}/></div>
                <div className="flex gap-10 ">
                <div className="flex flex-col gap-2">
                    <CustomText className={"!text-[#000] !text-[18px] "}  value={"Email"}/>
                    <CustomText className={"!text-[#214344] !text-[18px] w-[] "}  value={"Meher Bose@email.com"}/>
               </div>
                <div className="flex flex-col gap-2">
                    <CustomText className={"!text-[#000] !text-[18px] "}  value={"Phone"}/>
                    <CustomText className={"!text-[#214344] !text-[18px] "}  value={"(555) 123-4567"}/>
               </div>
               </div>
            </div>
            
            </Col>
        
        </Row>
    )
}
export default CrmCustomerDetails;