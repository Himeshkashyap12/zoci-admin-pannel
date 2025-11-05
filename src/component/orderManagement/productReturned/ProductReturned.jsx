

import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import ProductFilter from "./productFilter";
import ProductReturnedTable from "./ProductReturnedTable";

const ProductReturned=()=>{
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Order Management → Products Returned"}/>
            </div>
            <div>
                <ProductFilter/>
            </div>
            
              <div>
                <ProductReturnedTable/>
              </div>
        
        </div>
    )
}
export default ProductReturned;