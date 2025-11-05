import { Card, Typography } from "antd";
import CustomText from "../common/CustomText";

const InventaryCards=({title,count})=>{
    return(
        <>
        <Card variant="borderless">
            <div className="flex flex-col gap-5">
         <CustomText className={"!text-[16px] "} value={title}/>
         <CustomText className={"!text-[20px] font-bold"} value={count}/>
         </div>
  </Card>

        </>
    )

}
export default InventaryCards;