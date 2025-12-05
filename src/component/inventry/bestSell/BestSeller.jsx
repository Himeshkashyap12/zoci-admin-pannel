import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import BestSellerFilter from "./BestSelletFilter";
import BestSellerTable from "./BestSellerTable";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { bestSellingProducts } from "../../../feature/inventaryManagement/inventarySlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import { dataExportInExcelHandler } from "../constants";
const BestSeller=()=>{
      const [selectedRowKeys,setSelectedRowKeys]=useState([])
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const [page,setPage]=useState(1);
      const [search,setSearch]=useState("");
      const debounce=useDebounce(search,500);
      const [filter,setFilter]=useState([])
      const [sort,setSort]=useState([]) 
      const getBestSeller=async()=>{
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
                const res=await dispatch(bestSellingProducts({token,data})).unwrap();
             } catch (error) {
                console.log(error);
            }
        }
       const exportProductHandler = async () => {
           const data = { productIds: selectedRowKeys };
           dataExportInExcelHandler({dispatch,token,data})
       };
         useEffect(()=>{
              getBestSeller();
          },[page,debounce,filter,sort])
      return(
         <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Inventory Management & Analysis → Best-selling Product "}/>
            </div>
            <div>
                <BestSellerFilter exportProductHandler={exportProductHandler}  search={search} setSort={setSort} setFilter={setFilter} setSearch={setSearch}/>
            </div>
            
              <div>
               <BestSellerTable setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} setPage={setPage} page={page}/>
              </div>
        
        </div>
    )
}
export default BestSeller;