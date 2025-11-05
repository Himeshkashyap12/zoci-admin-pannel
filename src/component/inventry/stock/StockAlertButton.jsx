import { useState } from "react";
import CustomButton from "../../common/CustomButton";

const StockAlertButton=({stockAlerstStatus,setStockAlertStatus})=>{
    return(
        <div className="flex justify-center w-full ">
            <div className="flex bg-[#fff] p-1 rounded-full ">
            <CustomButton onclick={()=>{setStockAlertStatus("stock")}} className={` ${stockAlerstStatus=="stock" ? "!bg-[#214344] !text-[#F0D5A0] hover:!text-[#F0D5A0]": "!bg-[#fff] !text-[#214344] hover:!text-[#214344]"} w-[200px] !text-[14px]`} value={"Stock Level Alert"}
            />
             <CustomButton onclick={()=>{setStockAlertStatus("alert")}} className={`${stockAlerstStatus=="alert" ? "!bg-[#214344] !text-[#F0D5A0]":"!bg-[#fff] !text-[#214344]" } w-[200px]  !text-[14px]`} value={"Notify Me"}
            />
         </div>
        </div>
    )
}
export default StockAlertButton;