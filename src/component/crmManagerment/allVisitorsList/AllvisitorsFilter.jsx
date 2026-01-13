import { Col, DatePicker, Image, Row } from "antd";
import sort from "../../../assets/inventary/sort.png";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import "../allVisitors.css";
import { allVisitorsFiltorData } from "./VisitorsFilterData";
const { RangePicker } = DatePicker;
const AllVisitorsFilter=({setSearch,setSortKey,search,setDate,setPage,sortKey})=>{
    return(
        <div className="visitors">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search value={search} name={"search"}  onchange={(e)=>{setPage(1),setSearch(e.target.value)}} placeholder={"Search your Visitors"} />
                   </div>
                 </Col>   
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">    
                 <RangePicker 
                    disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }}
                    onChange={(i,value)=>{setPage(1),setDate(value)}} />  
                    <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                     <CustomMultipleFilter value={sortKey} placeholder={"Sort"}  option={allVisitorsFiltorData}   onchange={(value)=>{setPage(1),setSortKey(value)}} />

                  </div>}/>
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default AllVisitorsFilter;