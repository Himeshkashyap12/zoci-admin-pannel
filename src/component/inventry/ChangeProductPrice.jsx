import { Col, Row } from "antd";
import CustomSelect from "../common/CustomSelect";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

const ChangeProductPrice=()=>{
    return(
        <>
        <Row gutter={[20]}>
            <Col span={8}>
              <CustomSelect className="w-full !h-[50px]"/>
            </Col>
            <Col span={8}>
            <div className="!!h-[50px]">
              <CustomInput  className={"h-[50px]"}   />
              </div>
            </Col>
            <Col span={8}>
            <CustomButton value={"Change all Silver product price"} className={" !text-[16px] !font-semibold !h-[50px] w-full !text-[#fff]"}/>
            </Col>
          </Row>
        </>
    )
}
export default ChangeProductPrice;