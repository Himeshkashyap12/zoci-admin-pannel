

import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import ActivePromotionFilter from "./ActivePromotionFilter";
import ActivePromotionTable from "./ActivePromotionTable";

const ActivePromotion=()=>{
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/marketing")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Marketing Tools → Active Promotions"}/>
            </div>
            <div>
                <ActivePromotionFilter/>
            </div>
              <div>
                <ActivePromotionTable/>
              </div>
        
        </div>
    )
}
export default ActivePromotion;