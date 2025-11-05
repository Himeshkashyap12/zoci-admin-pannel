
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import MakeTOOrderFilter from "./MakeToOrderFilter";
import MakeToOrderTablePage from "./MakeTOOrderTable";

const MakeToOrder=()=>{
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Order Management → Make to Order"}/>
            </div>
            <div>
                <MakeTOOrderFilter/>
            </div>
            
              <div>
               {/* <BestSellerTable/> */}
               <MakeToOrderTablePage/>
              </div>
        
        </div>
    )
}
export default MakeToOrder;