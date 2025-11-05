import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import VendorFilter from "./VendorFilter";
import VendorPerformanceTable from "./VendorPerformanceTable";
import { useNavigate } from "react-router-dom";

const VendorPerformance=()=>{
    const navigate=useNavigate();
    return(
        <>
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Inventory Management & Analysis → Vendor Performance Analysis"}/>
            </div>
            <div>
                <VendorFilter/>
            </div>
            
              <div>
                <VendorPerformanceTable/>
              </div>
        
        </div>
        </>
    )
}
export default VendorPerformance;