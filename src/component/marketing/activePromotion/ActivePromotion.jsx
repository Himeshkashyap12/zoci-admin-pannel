

import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import ActivePromotionFilter from "./ActivePromotionFilter";
import ActivePromotionTable from "./ActivePromotionTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getAllPromotionAsync } from "../../../feature/marketing/marketingSlice";
import { useDebounce } from "../../../hooks/UseDebounce";
import { toast } from "react-toastify";
const ActivePromotion=()=>{
    const navigate=useNavigate();
    const token=Cookies.get("token");  
    const dispatch=useDispatch();
    const [page,setPage]=useState(1);
     const [search,setSearch]=useState("");
      const [activeSort,setSort]=useState([]);
      const [activeFilter,setFilter]=useState([]);
      const debouncedText=useDebounce(search,500);
    const getActivePromotion=async()=>{
         const trimSearch=search.trim();
              try {
                const data={isActive:true,limit:10,page:page,
                     ...(trimSearch && { search:trimSearch }),
                ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                ...(activeFilter?.length>0 && { [activeFilter[0]]:activeFilter[1] }),
                }
               if (search && !trimSearch) {
                 return; 
               }
              const res=await dispatch(getAllPromotionAsync({token,data}))?.unwrap();
              
              } catch (error) {
                // toast.error("Something went wrong. Please try again.");
               
              }
            }
            useEffect(()=>{
                    getActivePromotion();
             },[page,activeSort,activeFilter,debouncedText]);
     
    return(
           <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/marketing")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Marketing Tools → Active Promotions"}/>
            </div>
            <div>
                <ActivePromotionFilter expired={true} setSearch={setSearch} setSort={setSort}  setFilter={setFilter} search={search} activeSort={activeSort} activeFilter={activeFilter}  />
            </div>
              <div>
                <ActivePromotionTable page={page} setPage={setPage}/>
              </div>
        
        </div>
    )
}
export default ActivePromotion;