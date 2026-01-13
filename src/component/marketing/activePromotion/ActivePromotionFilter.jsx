import { Col, DatePicker, Image, Row } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import exports from "../../../assets/inventary/export.png";
import filter from "../../../assets/inventary/filter.png";
import sort from "../../../assets/inventary/sort.png";
import { getAllPromotionAsync } from "../../../feature/marketing/marketingSlice";
import { useDebounce } from "../../../hooks/UseDebounce";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomModal from "../../common/CustomModal";
import CustomText from "../../common/CustomText";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import CreateNewPromotion from "../CreateNewPromotion";
import { marketingPromotionHandler } from "../exportMarketing";
import "../marketing.css";
import { activePromotionFilter, activePromotionSort } from "./activePromotionFilterData";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
const ActivePromotionFilter=({setSearch,search,setFilter,activeFilter,activeSort,setSort})=>{
         const [newPromotionModel,setPromotionModel]=useState(false);
         const dispatch=useDispatch();
         const token=Cookies.get("token");
         const {promotion}=useSelector(state=>state?.marketing);
        const exportOrderHandler = async () => {
         if(promotion?.promos?.length==0) return toast?.error("Please add promotion before export")
           const trimSearch=search?.trim();
              const data={
                ...(trimSearch && { search:trimSearch }),
                ...(activeSort?.length>0 && { [activeSort[0]]:activeSort[1] }),
                ...(activeFilter?.length>0 && { [activeFilter[0]]:activeFilter[1] }),
                  page:1,
                  limit:10
               }
            marketingPromotionHandler({dispatch,token,data})
        };
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
                    <CustomMultipleFilter  placeholder={"Sort"}    onchange={(value)=>{setSort(value)}} option={activePromotionSort}/>
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