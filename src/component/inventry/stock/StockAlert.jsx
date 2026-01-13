import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import StockAlertButton from "./StockAlertButton";
import StockFilter from "./StockFilter";
import StockAlertTable from "./StockAlerttable";
import NotifyMeTable from "./NotifyMeTable";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { notifyMeAsync, stockLevelAlertAsync } from "../../../feature/inventaryManagement/inventarySlice";
import { useDebounce } from "../../../hooks/UseDebounce";
import { dataExportInExcelHandler } from "../constants";
const StockAlert=()=>{
    const [stockAlerstStatus,setStockAlertStatus]=useState("stock");
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const token=Cookies.get("token"); 
      const [total,setTotal]=useState(null) ;
      const [page,setPage]=useState(1);
      const [search,setSearch]=useState("");
      const debounce=useDebounce(search,500);
      const [filter,setFilter]=useState([])
      const [sort,setSort]=useState([]) 
      const navigate=useNavigate();
      const dispatch=useDispatch();
      const {notfyMe,stockLevelAlert}=useSelector(state=>state?.inventary);      
      const notifyMeData=notfyMe?.data?.map((item)=>{
        return {...item,key:item?.productId}
      });  
       const stockAlertData=stockLevelAlert?.data?.map((item)=>{
        return {...item,key:item?.productId}
      }); 
        const getNotifyMe=async()=>{
            const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),

                }
              try {
          if(search && !trimSearch) return;
          const res=await dispatch(notifyMeAsync({token,data})).unwrap();
          setTotal(res?.total)
          } catch (error) {
            console.log(error);
          }
        }
        const getStockAlert=async()=>{
          const trimSearch=search.trim();
                const data={
                  limit:10,
                  page:page,
                  ...(search && {search:trimSearch} ),
                  ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
                  ...(filter?.length>0 && {[filter[0]]:filter[1]} ),

                }
              try {
          if(search && !trimSearch) return;
          const res=await dispatch(stockLevelAlertAsync({token,data})).unwrap();
          setTotal(res?.total)

          } catch (error) {
            console.log(error);
          }
        }

        const exportProductHandler = async () => {
            const data = { productIds: selectedRowKeys };
            dataExportInExcelHandler({dispatch,token,data})
        };
        useEffect(()=>{
            if(stockAlerstStatus=="stock"){
                getStockAlert()
            }else{
                getNotifyMe();

            }
          
        },[stockAlerstStatus,page,filter,sort,debounce])

    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Inventory Management & Analysis → Stock Level Alerts"}/>
            </div>
            <div>
                <StockFilter filterKey={filter} sortKey={sort} setPage={setPage}  exportProductHandler={exportProductHandler} stockAlerstStatus={stockAlerstStatus} search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}   selectedRowKeys={selectedRowKeys}/>
            </div>
            <div >
                <StockAlertButton setStockAlertStatus={setStockAlertStatus} stockAlerstStatus={stockAlerstStatus}/>
            </div>
              <div>
                {stockAlerstStatus=="stock"?<StockAlertTable setPage={setPage} page={page} total={total} stockAlertData={stockAlertData} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>:<NotifyMeTable total={total} setPage={setPage} page={page} notifyMeData={notifyMeData} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>}
              </div>
        </div>
    )
}
export default StockAlert;