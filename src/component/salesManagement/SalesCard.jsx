import { Card } from "antd";
import CustomText from "../common/CustomText";

const SalesCard=({item})=>{    
    return(
        <>
        <Card >
            <div className="flex flex-col items-between min-h-[70px] gap-3">
           <CustomText className={"!text-[16px]"} value={item?.title}/>
           <CustomText className={"!text-[20px] font-bold"} value={item?.value}/>
           </div>
         </Card>
        </>
    )
}
export default SalesCard;