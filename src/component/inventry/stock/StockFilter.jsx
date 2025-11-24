import { Col, Image, Row } from "antd";
import filter from "../../../assets/inventary/filter.png"
import sort from "../../../assets/inventary/sort.png"
import CustomText from "../../common/CustomText";
import CustomButton from "../../common/CustomButton";
import CustomInput from "../../common/CustomInput";
import { notifyMeAsync, stockLevelAlertAsync } from "../../../feature/inventaryManagement/inventarySlice";
import { useDispatch } from "react-redux";
import CustomMultipleFilter from "../../common/CustumMultipleFilter";
import { useEffect, useState } from "react";
import "../inventary.css"
import { useDebounce } from "../../../hooks/UseDebounce";
import Cookies from "js-cookie";
const StockFilter=({stockAlerstStatus,selectedRowKeys})=>{
  console.log(selectedRowKeys);
  
  const dispatch=useDispatch();
  const [search,setSearch]=useState("");
  const [filterKey,setFilter]=useState([])
  const [sortKey,setSort]=useState([]);
  const debouncedText = useDebounce(search, 500);
  const token=Cookies.get("token")

  const sortOption=[
    {label:"Price-High to Low",value:"priceDesc"},
    {label:"Price-Low to High",value:"priceAsc"},
     {label:"Rating",value:"rating"},
    {label:"Newest",value:"newest"},
     {label:"Oldest",value:"oldest"},
  ]
 
  
  const filterOptions = [
  {
    label:"Availability",
    value:"availability",
  
    children: [
      {
        value: 'In Stock',
        label: 'In Stock',
      
      },
      {
        value: 'Out Of Stock',
        label: 'Out Of Stock',
      
      },
    ],
  },
   {
    label:"Metal Type",
    value:"metalType",
    children: [
      {
        value: 'Silver',
        label: 'Silver',
      
      },
      {
        value: 'Gold',
        label: 'Gold',
      
      },
      {
        value: 'Platinum',
        label: 'Platinum',
      
      },
    ],
  },
  {
    label:"Stone Type",
    value:"stoneType",
    children: [
      {
        value: 'Natural Diamond',
        label: 'Natural Diamond',
      
      },
      {
        value: 'Lab Grown Diamond',
        label: 'Lab Grown Diamond',
      
      },
      
    ],
  },
  {
    label:"Gender",
    value:"gender",
    children: [
      {
        value: 'Men',
        label: 'Men',
      
      },
      {
        value: 'Women',
        label: 'Women',
      
      },
      
    ],
  }
  
];
   const getNotifyMe=async()=>{
          try {
            const data={
       ...(search && { search }),
       ...(sortKey?.length>0 && { sort:sortKey[0] }),
       ...(filterKey?.length>0 && { [filterKey[0]]:filterKey[1] }),
           }
      const res=await dispatch(notifyMeAsync({token,data})).unwrap();
                } catch (error) {
                      console.log(error);
                  }
        }
      const getStockAlert=async()=>{
                    try {
                       const data={
       ...(search && { search }),
       ...(sortKey?.length>0 && { sort:sortKey[0] }),
       ...(filterKey?.length>0 && { [filterKey[0]]:filterKey[1] }),
  }
                            const res=await dispatch(stockLevelAlertAsync({token,data})).unwrap();
                      } catch (error) {
                              console.log(error);
                      }
                 }
          

useEffect(()=>{
     if(stockAlerstStatus=="stock"){
      getStockAlert();
     }else{
      getNotifyMe();
     }
},[debouncedText,filterKey,sortKey])

   
    return(
        <div className="inventary">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput onchange={(e)=>{setSearch(e.target.value)}} search={true} placeholder={"Search your orders"} />
                   </div>
                 </Col>
                 
                 <Col span={16}>
                 <div className="flex gap-5 justify-end"> 
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                   <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={filterOptions}/>

                       </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={sortOption}/>


                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
                  </Col>
            </Row>
        </div>
    )
}
export default StockFilter;