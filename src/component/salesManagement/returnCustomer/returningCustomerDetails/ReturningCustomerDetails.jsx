import { useDispatch, useSelector } from "react-redux";
import { getReturningCustomerDetailsAsync } from "../../../../feature/sales/salesSlice";
import Loader from "../../../loader/Loader";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ReturningCustomerDetailsTable from "./ReturningCustomerDetailsTable";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
const ReturningCustomerDetails=({id})=>{
    const navigate=useNavigate();
    
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {returningCustomerDetails,isLoading}=useSelector(state=>state?.sales);      
    console.log(returningCustomerDetails,"returningCustomerDetails");
    
            const returningCustomerDetailsHandler=async()=>{
              try {
              const res=await dispatch(getReturningCustomerDetailsAsync({token,id})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
    
            useEffect(()=>{
                  returningCustomerDetailsHandler();
           },[]);            
              
    if(isLoading) return <Loader/>
    return(
        <>
          <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/admin/returning-customer");
                }}
              >
                <CustomText
                  className={"!text-[#214344] !text-[20px]"}
                  value={<LeftOutlined />}
                />
              </div>
              <CustomText
                className={"!text-[#214344] !text-[20px]"}
                value={"Sales Reports → Returning Customers→ Meher Bose"}
              />
            </div>
           
           
            <div>
              <ReturningCustomerDetailsTable/>
            </div>
          </div>
        </>
    )
}
export default ReturningCustomerDetails;