import CustomButton from "../common/CustomButton";

const UiManagementButton=({collection,setCollection})=>{
    return(
        <div className="flex justify-center w-full ">
            <div className="flex bg-[#fff] p-1 rounded-full ">
            <CustomButton onclick={()=>{setCollection(true)}} className={` ${collection ? "!bg-[#214344] !text-[#F0D5A0] hover:!text-[#F0D5A0]": "!bg-[#fff] !text-[#214344] hover:!text-[#214344]"} w-[200px] !text-[14px]`} value={"Collections"}
            />
             <CustomButton onclick={()=>{setCollection(false)}} className={`${!collection ? "!bg-[#214344] !text-[#F0D5A0]":"!bg-[#fff] !text-[#214344]" } w-[200px]  !text-[14px]`} value={"Carousel Ui"}
            />
         </div>
        </div>
    )
}
export default UiManagementButton;