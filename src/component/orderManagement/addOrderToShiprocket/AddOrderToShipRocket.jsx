import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useLocation, useNavigate } from "react-router-dom";
import CreateOrderAtShipRocket from "./CreateOrderAtShipRocket";
import { useDispatch, useSelector } from "react-redux";
import { generateTokenAsync, getAddressAsync } from "../../../feature/order/orderSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
const AddOrderToShipRocket = () => {
  const navigate = useNavigate();
  const dipspatch=useDispatch();
  const {state}=useLocation();  
  const orderItems=state?.item?.items?.map((item)=>{
       return   { name: item?.productName,
                sku: item?.sku,
                units: item?.qty,
                selling_price:item?.price
                }
         });  
  const shipRocketToken=Cookies.get("shipRocketToken");
  const orderId=Cookies.set("orderId",state?.item?.orderId)  ;  
  const {shipRocketAddress}=useSelector(state=>state?.order); 
  const generateShipRoketToken=async()=>{
    try {
      const data={
         method: "POST",
         endpoint: "/v1/external/auth/login",
         body:{
          email: import.meta.env.VITE_SHIPROCKET_EMAIL,
          password: import.meta.env.VITE_SHIPROCKET_PASSWORD
         }
      }
      const res=await dipspatch(generateTokenAsync({data})).unwrap();  
    } catch (error) {
      console.log(error); 
    }
  }
  const getShippingAddress=async()=>{
     try {
      const data={  
            method: "GET",
            endpoint: "/v1/external/settings/company/pickup"
      }
      const res=await dipspatch(getAddressAsync({data,shipRocketToken})).unwrap();  
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(()=>{
    if(!shipRocketToken){
     generateShipRoketToken()
    }else{
      getShippingAddress();
    }
  },[])
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/order");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Order Management → Create Order To Shiprocket"}
        />
      </div>
      <div>
        <CreateOrderAtShipRocket  item={state?.item} status={state?.status} orderItems={orderItems} shipRocketAddress={shipRocketAddress}/>
      </div>
    </div>
  );
};
export default AddOrderToShipRocket;
