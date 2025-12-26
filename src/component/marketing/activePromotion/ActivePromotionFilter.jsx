import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomModal from "../../common/CustomModal";
import { useEffect, useState } from "react";
import CreateNewPromotion from "../CreateNewPromotion";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie"
import { getAllPromotionAsync, promotionExportInExcelAsync } from "../../../feature/marketing/marketingSlice";
import { useDebounce } from "../../../hooks/UseDebounce";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { activePromotionFilter, activePromotionSort } from "./activePromotionFilterData";
import "../marketing.css"
import CustomDate from "../../common/CustomDate";
import { isoToUTC } from "../../../constants/constants";
import { marketingPromotionHandler } from "../exportMarketing";
const { RangePicker } = DatePicker;
const ActivePromotionFilter=()=>{
  const [newPromotionModel,setPromotionModel]=useState(false);
     const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const [search,setSearch]=useState("");
      const [activeSort,setSort]=useState([]);
      const [activeFilter,setFilter]=useState([]);
      const [expireDate,setExpireDate]=useState("");
      const [promotionDate,setPromotionDate]=useState("")
      const debouncedText=useDebounce(search,500);
        const getActivePromotion=async()=>{
          try {
             const trimSearch=search.trim();
            const data={
                ...(trimSearch && { search:trimSearch }),
                ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                ...(activeFilter?.length>0 && { [activeFilter[0]]:activeFilter[1] }),
                  page:1,
                  limit:10
              }
      if (search && !trimSearch) {
        return; 
      }
       const res=await dispatch(getAllPromotionAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }

      const exportOrderHandler = async () => {
           const trimSearch=search.trim();
            const data={
                ...(trimSearch && { search:trimSearch }),
                ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                ...(activeFilter?.length>0 && { [activeFilter[0]]:activeFilter[1] }),
                  page:1,
                  limit:10
                }
           marketingPromotionHandler({dispatch,token,data})
         };

        useEffect(()=>{
            getActivePromotion();
        },[debouncedText,activeFilter,activeSort,expireDate])

    return(
        <div className="marketing">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search  onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search your Promotion"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                     <CustomButton onclick={()=>{setPromotionModel(true)}} className={"!text-[#fff]"} value={"Create new Promotion"}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                        <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={activePromotionFilter}/>
                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter  placeholder={"Sort"}    onchange={(value)=>{setPromotionDate(value)}} option={activePromotionSort}/>
                  </div>}/>
                    <CustomButton onclick={()=>{exportOrderHandler()}} value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
              </Col>
            </Row>
            <CustomModal  footer={false} setOpen={setPromotionModel} open={newPromotionModel} modalBody={<CreateNewPromotion setOpen={setPromotionModel}/>} width={"1052px"}/>

        </div>
    )
}
export default ActivePromotionFilter;