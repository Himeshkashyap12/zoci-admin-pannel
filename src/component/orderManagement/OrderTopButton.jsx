

import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
const OrderTopButton = () => {
  const navigate=useNavigate();
  return (
    <>
      <div>
        <CustomText
          value={"Order Management"}
          className={"!text-[#214344] !text-[20px] "}
        />
      </div>
      <div className="flex gap-10">
        <CustomButton
          onclick={()=>{navigate("/admin/order-online")}}
          className={"!text-[14px] font-semibold w-[200px] !h-[50px] !text-[#fff]"}
          value={"Manage Online Orders"}
        />
       
        <CustomButton
          onclick={()=>{navigate("/admin/make-order")}}
          className={"!text-[14px] font-semibold w-[200px] !h-[50px] !text-[#fff]"}
          value={"Make to order  "}
        />
        <CustomButton
          onclick={()=>{navigate("/admin/generate-invoice")}}
          className={"!text-[14px] font-semibold w-[200px] !h-[50px] !text-[#fff]"}
          value={"Generate Instant Invoice  "}
        />
        <CustomButton
          onclick={()=>{navigate("/admin/product-returned")}}
          className={"!text-[14px] font-semibold w-[200px] !h-[50px] !text-[#fff]"}
          value={"Products Returned "}
        />
        <CustomButton
          onclick={()=>{navigate("/admin/product-exchange")}}
          className={"!text-[14px] font-semibold w-[200px] !h-[50px] !text-[#fff]"}
          value={"Products Exchanged "}
        />
      </div>
    </>
  );
};
export default OrderTopButton;
