import CustomSlider from "../common/CustomSlider";
import CustomText from "../common/CustomText";

const EventSales=()=>{
    const EventSalesSlider=[
        {
            title:"The lil flea",
            place:"Delhi",
            price:"Rs. 24,700",
            image:"https://picsum.photos/200/300"
        },
        {
            title:"The lil flea 2",
            place:"Lucknow",
            price:"Rs. 22,700",
            image:"https://picsum.photos/200/300"
        },
        {
            title:"The lil flea 3",
            place:"Bihar",
            price:"Rs. 20,700",
            image:"https://picsum.photos/200/300"
        }
    ]
    return(
        <div className="flex flex-col gap-2">
            <CustomText className={"!text-[16px] font-[400]"} value={"Exhibition or event Sales"}/>
            <div className="w-full bg-[#fff] p-[24px] rounded-md">
                <CustomSlider EventSalesSlider={EventSalesSlider}/>
            </div>

        </div>
    
    )
}
export default EventSales;