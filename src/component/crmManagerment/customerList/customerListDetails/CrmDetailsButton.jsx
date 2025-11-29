import { useState } from "react";
import CustomButton from "../../../common/CustomButton";

const CrmDetailsButton=({orderHistory,setOrderHistory})=>{
    return(
        <div className="flex justify-center w-full ">
            <div className="flex bg-[#fff] p-1 rounded-full ">
            <CustomButton onclick={()=>{setOrderHistory(false)}} className={` ${!orderHistory ? "!bg-[#214344] !text-[#F0D5A0] hover:!text-[#F0D5A0]": "!bg-[#fff] !text-[#214344] hover:!text-[#214344]"} w-[200px] !text-[14px]`} value={"Bag & Wishlist"}
            />
             <CustomButton onclick={()=>{setOrderHistory(true)}} className={`${orderHistory ? "!bg-[#214344] !text-[#F0D5A0]":"!bg-[#fff] !text-[#214344]" } w-[200px]  !text-[14px]`} value={"Order History"}
            />
         </div>
        </div>
    )
}
export default CrmDetailsButton;