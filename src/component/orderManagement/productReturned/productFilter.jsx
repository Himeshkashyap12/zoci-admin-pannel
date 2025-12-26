import { Col, DatePicker, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import exports from "../../../assets/inventary/export.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { productReturnedSort } from "./productReturnedData";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../order.css";
const { RangePicker } = DatePicker;
const ProductFilter=({setSearch,setSort,search,data,setDate,exportOrderHandler})=>{
    return(
        <div className="order">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search name={"search"} value={search} onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search Your Orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                    <RangePicker disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                     onChange={(i,value)=>{setDate(value)}} />
                  {/* <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={makeToOnlineOrderSort}/>

                       </div>}/> */}
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={productReturnedSort}/>


                  </div>}/>

                  <CustomButton onclick={()=>{exportOrderHandler()}} value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={exports}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default ProductFilter;