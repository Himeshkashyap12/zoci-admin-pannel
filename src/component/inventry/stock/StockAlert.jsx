import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import StockAlertButton from "./StockAlertButton";
import StockFilter from "./StockFilter";
import StockAlertTable from "./StockAlerttable";
import NotifyMeTable from "./NotifyMeTable";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
const StockAlert=()=>{
    const [stockAlerstStatus,setStockAlertStatus]=useState("stock");
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    console.log(selectedRowKeys,"dfdshfjhdsbfkj");
    
    const navigate=useNavigate()

    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Inventory Management & Analysis → Stock Level Alerts"}/>
            </div>
            <div>
                <StockFilter stockAlerstStatus={stockAlerstStatus} selectedRowKeys={selectedRowKeys}/>
            </div>
            <div >
                <StockAlertButton setStockAlertStatus={setStockAlertStatus} stockAlerstStatus={stockAlerstStatus}/>
            </div>
              <div>
                {stockAlerstStatus=="stock"?<StockAlertTable selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>:<NotifyMeTable selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>}
              </div>
        </div>
    )
}
export default StockAlert;