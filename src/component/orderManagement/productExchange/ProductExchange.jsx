import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import MakeTOOrderFilter from "./ProductExchangeFilter";
import MakeToOrderTablePage from "./ProductExchangeTable";
import ProductExchangeFilter from "./ProductExchangeFilter";
import ProuctExchangeTable from "./ProductExchangeTable";

const ProductExchange=()=>{
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Order Management → Products Exchanged"}/>
            </div>
            <div>
                <ProductExchangeFilter/>
            </div>
            
              <div>
               {/* <BestSellerTable/> */}
               <ProuctExchangeTable/>
              </div>
        
        </div>
    )
}
export default ProductExchange;