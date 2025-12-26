import CustomSlider from "../common/CustomSlider";
import CustomText from "../common/CustomText";

const EventSales=({item})=>{
    return(
        <div className="flex flex-col gap-2">
            <CustomText className={"!text-[16px] font-[400]"} value={"Exhibition or event Sales"}/>
            <div className="w-full bg-[#fff] p-[24px] rounded-md">
                <CustomSlider EventSalesSlider={item}/>
            </div>
        </div>
    )
}
export default EventSales;