import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import MakeTOOrderFilter from "./ProductExchangeFilter";
import MakeToOrderTablePage from "./ProductExchangeTable";
import ProductExchangeFilter from "./ProductExchangeFilter";
import ProuctExchangeTable from "./ProductExchangeTable";
import { useDispatch } from "react-redux";
import { getOrderProductReturnedAdnExchange } from "../../../feature/order/orderSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDebounce } from "../../../hooks/UseDebounce";
import { orderExportInExcelHandler } from "../constants";
const ProductExchange=()=>{
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const [date,setDate]=useState([]);  
      const [page,setPage]=useState(1);
      const [search,setSearch]=useState("");
      const debounce=useDebounce(search,500);
      const [sort,setSort]=useState([]);
      const dispatch=useDispatch();            
            const getProductExchangeHandler=async()=>{
               const trimSearch=search.trim();
                const data={
                 orderStatus:"Exchanges",
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...((date?.length>0 && date[0]!='') && {startDate:[date[0]],endDate:date[1]} )
                }
              try {
             if(search && !trimSearch) return;
              const res=await dispatch(getOrderProductReturnedAdnExchange({token,data})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
              const exportOrderHandler = async () => {
                              const data={startDate:[date[0]],endDate:date[1]}
                                orderExportInExcelHandler({dispatch,token,data})
                  };
            useEffect(()=>{
            getProductExchangeHandler();
            },[page,sort,debounce,date])
            
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/order")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Order Management → Products Exchanged"}/>
            </div>
            <div>
                <ProductExchangeFilter setPage={setPage} sortKey={sort}  date={date}  setDate={setDate} exportOrderHandler={exportOrderHandler} search={search} setSort={setSort}  setSearch={setSearch} />
            </div>
            
              <div>
               <ProuctExchangeTable page={page} setPage={setPage}/>
              </div>
        
        </div>
    )
}
export default ProductExchange;