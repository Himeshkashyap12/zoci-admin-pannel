import { useDispatch, useSelector } from "react-redux";
import { getReturningCustomerDetailsAsync } from "../../../../feature/sales/salesSlice";
import Loader from "../../../loader/Loader";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReturningCustomerDetailsTable from "./ReturningCustomerDetailsTable";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
const ReturningCustomerDetails=({id})=>{
    const navigate=useNavigate();
    const [page,setPage]=useState(1)
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {returningCustomerDetails}=useSelector(state=>state?.sales);      
            const returningCustomerDetailsHandler=async()=>{
              try {
                const data={
                  page:page,
                  limit:10
                }
              const res=await dispatch(getReturningCustomerDetailsAsync({token,id,data})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
    
            useEffect(()=>{
                  returningCustomerDetailsHandler();
           },[page]);            
              
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
                value={`Sales Reports → Returning Customers→ ${returningCustomerDetails?.data?.customerName}`}
              />
            </div>
           
           
            <div>
              <ReturningCustomerDetailsTable  setPage={setPage} page={page}/>
            </div>
          </div>
        </>
    )
}
export default ReturningCustomerDetails;