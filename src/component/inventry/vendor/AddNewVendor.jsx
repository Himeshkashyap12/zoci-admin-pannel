import { Button, Col, Row } from "antd";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";

const AddNewVendor=({setOpen})=>{
    return(
        <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Add New Vendor"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Company Name"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"GST"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Vendor Name"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Phone Number"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Address"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Purchase invoice"}/>
                       <CustomInput className={"h-[46px]"}/>
                       
                      </div></Col>
                </Row>
                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton className={"!text-[#fff] !bg-[#214344] w-[180px]"} value={"Yes, Add New Vendor"}/>
                    <Button onClick={()=>{setOpen(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]">No, Cancel</Button>

                </div>
            </div>
        </div>
    )
}
export default AddNewVendor;