



import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import { vendorPerformanceDetailsAnalysis } from "../../../../feature/inventaryManagement/inventarySlice";
import VendorPerformanceDetailUsers from "./VendorPerformaceDetailsUser";
import VendorPerformanceFilter from "./VendorPerformanceFilter";
import VendorPerformanceDetailTable from "./VendorPerformanceDetailTable";
import { useDebounce } from "../../../../hooks/UseDebounce";
import { dataExportInExcelHandler } from "../../constants";
const VendorPerformanceAnalysisDetails = () => {
        const [selectedRowKeys,setSelectedRowKeys]=useState([]);
        console.log(selectedRowKeys,"njbhvhbhbh");
        
        const {id}=useParams();  
        const dispatch=useDispatch()
        const token=Cookies.get("token");
        const {vendorPerformanceAnalysisData}=useSelector(state=>state?.inventary);
        const navigate = useNavigate();
        const [page,setPage]=useState(1);
        const [search,setSearch]=useState("");
        const debounce=useDebounce(search,500);
        const [filter,setFilter]=useState([])
        const [sort,setSort]=useState([]) 
        const getVendorPerformanceDetails=async()=>{
             const trimSearch=search.trim();
                  const data={
                      limit:10,
                      page:page,
                      ...(search && {search:trimSearch} ),
                      ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                      ...(filter?.length>0 && {[filter[0]]:filter[1]} ),

                }
              try {
          if(search && !trimSearch) return;
      const res=await dispatch(vendorPerformanceDetailsAnalysis({token,id,data})).unwrap();
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
  }


  const exportProductHandler = async () => {
      const data = { productIds: selectedRowKeys };
      dataExportInExcelHandler({dispatch,token,data})
  };
  useEffect(()=>{
    getVendorPerformanceDetails();
  },[page,filter,sort,debounce,id]);
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
        <VendorPerformanceDetailUsers item={vendorPerformanceAnalysisData?.data?.vendor}/>
      </div>
      <div>
        <VendorPerformanceFilter exportProductHandler={exportProductHandler}  search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}/>
      </div>
      <div>
        <VendorPerformanceDetailTable setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} setPage={setPage} page={page} id={id} />
      </div>
    </div>
  );
};
export default VendorPerformanceAnalysisDetails;
