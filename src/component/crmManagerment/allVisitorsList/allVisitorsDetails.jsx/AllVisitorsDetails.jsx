






import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import CrmCustomerDetails from "../../CrmCustomerDetails";
import AllVisitorsDetailsTable from "./AllvisiterDetailsTable";
import { useDispatch, useSelector } from "react-redux";
import { allVisitorsDetailsAsync } from "../../../../feature/crm/crmSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import CustomInput from "../../../common/CustomInput";
import { useDebounce } from "../../../../hooks/UseDebounce";
import Loader from "../../../loader/Loader";
const AllVisitorsDetails = () => {
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);
  const debouncingText=useDebounce(search,500)
  const {id}=useParams();
  const dispatch=useDispatch()
  const token=Cookies.get("token");
  const {visitorsDetails}=useSelector(state=>state?.crm);
  const navigate = useNavigate();
  console.log(visitorsDetails);
  
  const getVisitorsDetails=async()=>{
    try {
      const data={
           page:page,
           limit:10,
          ...(search &&  {search:search})
      }
      const res=await dispatch(allVisitorsDetailsAsync({token,id,data})).unwrap();
      console.log(res);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getVisitorsDetails();
  },[debouncingText,page])
  

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
        <CrmCustomerDetails visitors={false} item={visitorsDetails?.user}/>
      </div>
      <div className="pt-5 flex flex-col gap-3">
          <CustomInput name={"search"} value={search} onchange={(e)=>{setSearch(e.target.value)}} className={"!w-[300px]"} placeholder={"Search your Products"} />
        <AllVisitorsDetailsTable setPage={setPage} item={visitorsDetails?.data}/>
      </div>
    </div>
  );
};
export default AllVisitorsDetails;
