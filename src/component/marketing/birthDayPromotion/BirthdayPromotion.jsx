



import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import BirthdayPromotionTable from "./BirthdayPromotionTable";
import BirthdayPromotionFilter from "./BirthdayPromotionFilter";
import { useEffect, useState } from "react";
import BirthdayPromotionButton from "./BirthDayPromotionButton";
import AnniversaryPromotionalTable from "./AnniversaryProtionTable";
import { getAllAnniversaryAsync, getAllBirthdayPromotion } from "../../../feature/marketing/marketingSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useDebounce } from "../../../hooks/UseDebounce";
const BirthdayPromotion=()=>{
          const [birthdayPromotion,setBirthdayPromotion]=useState(false);
          const [selectedRowKeys,setSelectedRowKeys]=useState([]);
          const navigate=useNavigate();
          const [search,setSearch]=useState("");
          const [activeSort,setSort]=useState([]);
          const debouncedText=useDebounce(search,500) ;
          const [page,setPage]=useState(1)
          const token=Cookies.get("token");  
          const dispatch=useDispatch();     
            const getBirthdayPromotion=async()=>{
              const trimSearch=search.trim();
                const data={
                    ...(trimSearch && { search:trimSearch }),
                    ...(activeSort?.length>0 && {[activeSort[0]]:activeSort[1]}),
                    page:page,
                    limit:10
                }

                    if (search && !trimSearch) {
                        return; 
                    }
                    try{
                    const res=await dispatch(getAllBirthdayPromotion({token,data})).unwrap();
                    } catch (error) {
                        console.log(error);
                    }
                    }
                 const getAnniversayPromotion=async()=>{
                       const trimSearch=search.trim();
                        const data={
                            ...(trimSearch && { search:trimSearch }),
                            ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                            page:page,
                            limit:10
                        }

                            if (search && !trimSearch) {
                                return; 
                            }
                            try{
                      const res=await dispatch(getAllAnniversaryAsync({token,data})).unwrap();
                      } catch (error) {
                        console.log(error);
                      }
                    }
              useEffect(()=>{
                if(birthdayPromotion){
                getBirthdayPromotion();

                }else{
                getAnniversayPromotion();

                }
        },[birthdayPromotion,debouncedText,activeSort])
    return(
        <div className="flex flex-col gap-5 p-[24px]">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/marketing")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Marketing Tools →  Birthday / Anniversary Banners"}/>
            </div>
            <div>
                <BirthdayPromotionFilter  search={search} setSort={setSort} setSearch={setSearch}/>
            </div>
             <div>
                <BirthdayPromotionButton birthdayPromotion={birthdayPromotion}  setBirthdayPromotion={setBirthdayPromotion}/>
             </div>
              <div>
               {birthdayPromotion? <BirthdayPromotionTable selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>:<AnniversaryPromotionalTable  selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>}
              </div>
        </div>
    )
}
export default BirthdayPromotion;