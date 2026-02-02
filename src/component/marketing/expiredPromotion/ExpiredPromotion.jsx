



import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import ExpiredPromotionTable from "./ExpiredPromotionTable";
import ActivePromotionFilter from "../activePromotion/ActivePromotionFilter";
import { useEffect, useState } from "react";
import { getAllPromotionAsync } from "../../../feature/marketing/marketingSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { useDebounce } from "../../../hooks/UseDebounce";
import { toast } from "react-toastify";
const ExpiredPromotion=()=>{
    const navigate=useNavigate();
       const token=Cookies.get("token");  
       const dispatch=useDispatch();
       const [page,setPage]=useState(1);
        const [search,setSearch]=useState("");
         const [activeSort,setSort]=useState([]);
         const [activeFilter,setFilter]=useState([]);
         const debouncedText=useDebounce(search,500);

    const getExpiredPromotion=async()=>{
         const trimSearch=search.trim();
                const data={isActive:false,limit:10,page:page,
                     ...(trimSearch && { search:trimSearch }),
                ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                ...(activeFilter?.length>0 && { [activeFilter[0]]:activeFilter[1] }),
                }
               if (search && !trimSearch) {
                return
               }
              try {
              const res=await dispatch(getAllPromotionAsync({token,data})).unwrap();
              } catch (error) {
                // toast.error("Something went wrong. Please try again.");
              }
            }

            useEffect(()=>{
               getExpiredPromotion();
            },[page,activeSort,activeFilter,debouncedText])
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/marketing")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Marketing Tools → Expired Promotions"}/>
            </div>
            <div>
                <ActivePromotionFilter expired={false} setSearch={setSearch} setSort={setSort}  setFilter={setFilter} search={search} activeSort={activeSort} activeFilter={activeFilter} />
            </div>
              <div>
                <ExpiredPromotionTable page={page} setPage={setPage}/>
              </div>
        </div>
    )
}
export default ExpiredPromotion;