
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import CrmCustomerDetails from "../../CrmCustomerDetails";
import CustomerListDetailTable from "./OrderHistoryTable";
import { useEffect, useState } from "react";
import { customerWishListAndBagAsync } from "../../../../feature/crm/crmSlice";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import CrmDetailsButton from "./CrmDetailsButton";
import OrderHistoryTable from "./OrderHistoryTable";
import BagWishListTable from "./BagWishListTable";
import Loader from "../../../loader/Loader";
const CustomerListDetails = () => {
  const [orderHistory,setOrderHistory]=useState(false);
  const [customerDetails,setCustomerDetails]=useState({})
  const {id}=useParams();
  const dispatch=useDispatch()
  const token=Cookies.get("token");
  const {wishListAndBag,isLoading}=useSelector(state=>state?.crm);
  console.log(wishListAndBag,"customerDetails");
  const navigate = useNavigate();
  console.log(wishListAndBag);
  
  const getCustomerDetails=async()=>{
    try {
      const res=await dispatch(customerWishListAndBagAsync({token,id})).unwrap();
      console.log(res);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getCustomerDetails();
  },[])
  
 console.log(customerDetails,"customerDetails");
  return (
    <div className="flex flex-col gap-10 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/crm");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={`CRM → Customer List→ ${customerDetails?.name}`}
        />
      </div>
     
      
      <div>
        <div>
        <CrmCustomerDetails visitors item={customerDetails}/>
      </div>
        <CrmDetailsButton setOrderHistory={setOrderHistory} orderHistory={orderHistory}/>
      </div>
      <div className="pt-10">
       {orderHistory? <OrderHistoryTable id={id} setCustomerDetails={setCustomerDetails}/>:<BagWishListTable id={id} setCustomerDetails={setCustomerDetails}/>}
      </div>
    </div>
  );
};
export default CustomerListDetails;
