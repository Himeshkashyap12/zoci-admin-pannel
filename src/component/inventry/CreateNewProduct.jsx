import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomText from "../common/CustomText";
import { Col, Row } from "antd";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";

const CreateNewProduct=()=>{
    const navigate=useNavigate();
    return(
        <>
    <div className="flex flex-col gap-5 p-[24px]">

        <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/inventary");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Inventory Management & Analysis → Create Products Individually "}
        />
      </div>
      {/* ProductForm */}
        <div className="product-form">
          <Row gutter={[40,40]}>
            <Col span={12}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                <CustomText value={"Production Source"}/>
                <CustomText className={"!text-[#EF4444]"} value={"*"}/>
                </div>
               <CustomSelect className="!rounded-full" />
               </div>
            
            </Col>
            <Col span={12}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                <CustomText value={"Product Category "}/>
                <CustomText className={"!text-[#EF4444]"} value={"*"}/>
                </div>
               <CustomInput className="!rounded-full" />
               </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>

        </div>
      </div>
        </>
    )
}
export default CreateNewProduct;