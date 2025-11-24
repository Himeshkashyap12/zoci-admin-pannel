



import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import BirthdayPromotionTable from "./BirthdayPromotionTable";
import BirthdayPromotionFilter from "./BirthdayPromotionFilter";
import { useState } from "react";
import BirthdayPromotionButton from "./BirthDayPromotionButton";
import AnniversaryPromotionalTable from "./AnniversaryProtionTable";

const BirthdayPromotion=()=>{
    const [birthdayPromotion,setBirthdayPromotion]=useState(false);
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/marketing")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Marketing Tools →  Birthday / Anniversary Banners"}/>
            </div>
            <div>
                <BirthdayPromotionFilter/>
            </div>
             <div>
                <BirthdayPromotionButton birthdayPromotion={birthdayPromotion}  setBirthdayPromotion={setBirthdayPromotion}/>
             </div>
              <div>
               {birthdayPromotion? <BirthdayPromotionTable/>:<AnniversaryPromotionalTable/>}
              </div>
        </div>
    )
}
export default BirthdayPromotion;