
import { useLocation } from "react-router-dom";
import CustomText from "../../../common/CustomText.jsx";
import { LeftOutlined } from "@ant-design/icons";
import MakeToOrderDetailsTable from "./MaketoOrderDetailTable.jsx";

const MakeToOrderDetails=()=>{
    const {state}=useLocation();
    console.log(state,"bhgh");
    
    return(
        <>
         <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={`Order Management → Make to Order → ${state?.customerName}`}/>
            </div>
            <div>
                {/* <ProductExchangeFilter/> */}
            </div>
            
              <div>
               {/* <BestSellerTable/> */}
               {/* <ProuctExchangeTable/> */}
               <MakeToOrderDetailsTable item={state?.items}/>
              </div>
        
        </div>
        </>
    )
}
export default MakeToOrderDetails;