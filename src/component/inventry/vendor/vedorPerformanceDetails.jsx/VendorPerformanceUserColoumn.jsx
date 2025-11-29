import CustomText from "../../../common/CustomText"

const VendorPerformanceUserColoumn=({name,value})=>{
    return(
        <>
        <div className="flex gap-3">
            <div className="w-[150px]">
                <CustomText className={"font-[500]"} value={name}/>
            </div>
            <div>
                <CustomText value={value}/>
            </div>
        </div>
        </>
    )
}
export default VendorPerformanceUserColoumn