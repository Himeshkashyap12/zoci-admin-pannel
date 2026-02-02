import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { birthdayFilter, birthdaySort } from "./birdthDayData";
const BirthdayPromotionFilter=({setSearch,search,setSort,setFilter,exportOrderHandler})=>{
    return(
        <div className="marketing">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search} onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search your Customer"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 {/* <div className="flex gap-5 justify-end"> 
                  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter  placeholder={"Sort"}    onchange={(value)=>{setSort(value)}} option={birthdaySort}/>
                  </div>}/>
                   <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter  placeholder={"Filter"}    onchange={(value)=>{setFilter(value)}} option={birthdayFilter}/>

                  </div>}/>
                  
                  
                  <CustomButton onclick={exportOrderHandler}  value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div> */}
              </Col>
            </Row>
        </div>
    )
}
export default BirthdayPromotionFilter;