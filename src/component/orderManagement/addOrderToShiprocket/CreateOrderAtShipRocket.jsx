import { Col, Row } from "antd";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import { useEffect, useState } from "react";
import { generate4DigitRandomNumber } from "../../../constants/constants";
import CustomDate from "../../common/CustomDate";
import CustomSelect from "../../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
const CreateOrderAtShipRocket=()=>{
    const [orderInput,setOrderInput]=useState({
  order_id: "",
  order_date: "",
  pickup_location: "",
  billing_customer_name: "",
  billing_last_name: "",
  billing_address: "",
  billing_city: "",
  billing_pincode: null,
  billing_state: "",
  billing_country: "",
  billing_phone: "", 
  shipping_is_billing: true,

  order_items: [
    {
      name: "Kunai",
      sku: "SKU123",
      units: 1,
      selling_price: 900,
    },
  ],

  payment_method: "Prepaid",
  sub_total: 900,
  length: 10,
  breadth: 10,
  height: 10,
  weight: 1,
})
const token=Cookies.get("shipRocketToken");
const dispatch=useDispatch();
const {pickUpLocation}=useSelector(state=>state.order);
 const pickUpLocationOption=()=>{
       
 }

const orderInputHandler=(e)=>{
    const {name,value}=e.target;
    setOrderInput({...orderInput,[name]:value})
}

    useEffect(()=>{
      const orderId= generate4DigitRandomNumber();
      setOrderInput({...orderInput,order_id:orderId})
    },[])

    return(
        <div className="w-[70%] mx-auto pt-5">
        < div className="flex flex-col gap-10">
       <Row gutter={[40,40]}>
         <Col span={12}>
            <div className="flex flex-col gap-2">
                <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Order Id"}/>
           
              <CustomInput
                name="order_id"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Mobile Number"
                value={orderInput?.order_id}
                onchange={(e)=>{orderInputHandler(e)}}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
                <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Date"}/>
             <CustomDate onchange={(e,value)=>setOrderInput({...orderInput,order_date:value})}/>
            </div>
          </Col>
         
       </Row>
       <Row gutter={[40,40]}>
         <Col span={12}>
            <div className="flex flex-col gap-2">
                <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Customer First Name"}/>
              <CustomInput
                name="billing_customer_name"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer First Name"
                value={orderInput?.billing_customer_name}
                onchange={(e)=>{orderInputHandler(e)}}
              />
            </div>
          </Col>
          <Col span={12}>
             <div className="flex flex-col gap-2">
              <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Customer Last Name"}/>
               <CustomInput
                name="billing_last_name"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer Last Name"
                value={orderInput?.billing_last_name}
                onchange={(e)=>{orderInputHandler(e)}}
              />
            </div>
          </Col>
         
       </Row>
        <Row gutter={[40,40]}>
         <Col span={12}>
            <div className="flex flex-col gap-2">
                <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Customer First Name"}/>
            <CustomSelect value={orderInput?.pickup_location} onchange={(e)=>{setOrderInput({...orderInput,pickup_location:e})}} options={pickUpLocationOption} className="!rounded-full" />

            </div>
          </Col>
          <Col span={12}>
             <div className="flex flex-col gap-2">
              <CustomText className={"text-[#214344] !font-[600] !text-[14px]"} value={"Customer Last Name"}/>
               <CustomInput
                name="billing_last_name"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer Last Name"
                value={orderInput?.billing_last_name}
                onchange={(e)=>{orderInputHandler(e)}}
              />
            </div>
          </Col>
         
       </Row>
       
        </div>
        </div>
    )
}
export default CreateOrderAtShipRocket;