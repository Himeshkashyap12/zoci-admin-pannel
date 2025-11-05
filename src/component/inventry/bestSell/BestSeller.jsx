import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import BestSellerFilter from "./BestSelletFilter";
import BestSellerTable from "./BestSellerTable";

const BestSeller=()=>{
   const navigate=useNavigate();
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Inventory Management & Analysis → Best-selling Product "}/>
            </div>
            <div>
                <BestSellerFilter/>
            </div>
            
              <div>
               <BestSellerTable/>
              </div>
        
        </div>
    )
}
export default BestSeller;