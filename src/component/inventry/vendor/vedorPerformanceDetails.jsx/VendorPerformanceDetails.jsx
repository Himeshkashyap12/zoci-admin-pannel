



import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import { vendorPerformanceDetailsAnalysis } from "../../../../feature/inventaryManagement/inventarySlice";
import VendorPerformanceDetailUsers from "./VendorPerformaceDetailsUser";
import VendorPerformanceFilter from "./VendorPerformanceFilter";
import VendorPerformanceDetailTable from "./VendorPerformanceDetailTable";
const VendorPerformanceAnalysisDetails = () => {
  
  const {id}=useParams();
  console.log(id);
  
  const dispatch=useDispatch()
  const token=Cookies.get("token");
  const {vendorPerformanceAnalysisData}=useSelector(state=>state?.inventary);
  const navigate = useNavigate();
  console.log(vendorPerformanceAnalysisData,"hvhvhphoneNumber");
  
  const getVendorPerformanceDetails=async()=>{
    try {
      const res=await dispatch(vendorPerformanceDetailsAnalysis({token,id})).unwrap();
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getVendorPerformanceDetails();
  },[id])
  
 
  return (
    <div className="flex flex-col gap-10 p-[24px]">
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
          value={`Inventory Management & Analysis → Vendor Performance Analysis→ ${vendorPerformanceAnalysisData?.data?.vendor?.name}`}
        />
      </div>
     
      
     
        <div>
        {/* <CrmCustomerDetails item={customerDetails}/> */}
        <VendorPerformanceDetailUsers item={vendorPerformanceAnalysisData?.data?.vendor}/>
      </div>
      <div>
        <VendorPerformanceFilter/>
      </div>
     
     
      <div>
        <VendorPerformanceDetailTable item={vendorPerformanceAnalysisData?.data?.products}/>
      </div>
    </div>
  );
};
export default VendorPerformanceAnalysisDetails;
