






import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import CrmCustomerDetails from "../../CrmCustomerDetails";
import AllVisitorsDetailsTable from "./AllvisiterDetailsTable";
import { useDispatch, useSelector } from "react-redux";
import { allVisitorsDetailsAsync } from "../../../../feature/crm/crmSlice";
import { useEffect } from "react";
import Cookies from "js-cookie"
const AllVisitorsDetails = () => {
  const {id}=useParams();
  const dispatch=useDispatch()
  const token=Cookies.get("token");
  const {visitorsDetails}=useSelector(state=>state?.crm);
  const navigate = useNavigate();
  console.log(visitorsDetails);
  
  const getVisitorsDetails=async()=>{
    try {
      const res=await dispatch(allVisitorsDetailsAsync({token,id})).unwrap();
      console.log(res);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getVisitorsDetails();
  },[])
  

 
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
          value={`CRM → All Visitor List→  ${visitorsDetails?.user?.name}`}
        />
      </div>
     
      <div>
        <CrmCustomerDetails item={visitorsDetails?.user}/>
      </div>
      <div className="pt-10">
        <AllVisitorsDetailsTable item={visitorsDetails?.data}/>
      </div>
    </div>
  );
};
export default AllVisitorsDetails;
