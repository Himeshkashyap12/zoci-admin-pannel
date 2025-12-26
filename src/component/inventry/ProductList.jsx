import { Col, Image, Row } from "antd";
import CustomInput from "../common/CustomInput";
import CustomText from "../common/CustomText";
import CustomButton from "../common/CustomButton"
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/UseDebounce";
import { dataExportInExcel, getAllProductAsync } from "../../feature/inventaryManagement/inventarySlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./inventary.css"
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomModal from "../common/CustomModal";
import CreateBulkProduct from "./CreateBulkProduct";
import { dataExportInExcelHandler } from "./constants";
const ProductList=({exportProductHandler})=>{
  const [search,setSearch]=useState("");
  const [productListBulkModel,setproductListBulkModel]=useState(false)
  const [filterKey,setFilter]=useState([])
  const [sortKey,setSort]=useState([])
  const debouncedText = useDebounce(search, 500);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const token=Cookies.get("token");
  
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


 const getAllProducts=async()=>{
  const trimSearch=search.trim();
  const data={
       ...(trimSearch && { search:trimSearch }),
       ...(sortKey?.length>0 && { sort:sortKey[0] }),
       ...(filterKey?.length>0 && { [filterKey[0]]:filterKey[1] }),
  }
  if (search && !trimSearch) {
    return; // stops searching on space
  }
    try {
    const res=await dispatch(getAllProductAsync({token,data})).unwrap();
    
    } catch (error) {
      console.log(error);

    }
  }
  
  useEffect(() => {
  if (debouncedText || !search) {
   getAllProducts();
  }
}, [debouncedText,sortKey,filterKey]);
    return(
      <div className="inventary">
            <Row justify={"center"} gutter={[40,20]}>
                 <Col span={24}>
                 <div className="flex  gap-20 items-center">
                    <div >
                   <CustomText className={"font-bold !text-[#214344]"} value={"Entire Product list"}/>
                   </div>
                   <div >
                   <CustomInput search className={"!w-[350px]"}  onchange={(e)=>setSearch(e.target.value)}  placeholder={"Search your product"} />
                   </div>
                   </div>
                 </Col>
                 <Col span={24}>
                 <div className="flex gap-2"> 
                  {/* <CustomButton className={"!text-[#fff]"} value={"Print"}/> */}
                  <CustomButton onclick={()=>{setproductListBulkModel(true)}}   className={"!text-[#fff]"} value={"Import bulk product"}/>
                  <CustomButton onclick={()=>{navigate("/admin/create-product")}} className={"!text-[#fff]"} value={"Create individual product"}/>
                  <CustomButton value={<div className="flex items-center justify-between gap-1 ">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                    {/* <CustomText className={"!text-[#fff]"} value={"Filter"}/> */}
                   <CustomMultipleFilter placeholder={"Filter"} onchange={(value)=>{setFilter(value)}} option={filterOptions}/>
                  </div>}/>
                  <CustomButton value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                   <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value)}} option={sortOption}/>

                  </div>}/>
                  <CustomButton onclick={()=>{exportProductHandler()}} value={<div className="flex items-center gap-1">
                    <Image preview={false} className="!size-[20px]" src={sort}/>
                    <CustomText className={"!text-[#fff]"} value={"Export in Excel"}/>
                  </div>}/>
                  </div>
                  </Col>
               
            </Row>
            <CustomModal closeIcon  footer={false} setOpen={setproductListBulkModel} open={productListBulkModel} modalBody={<CreateBulkProduct setproductListBulkModel={setproductListBulkModel}/>} width={"490px"}  align={"center"}/>

            </div>
        
    )
}
export default ProductList;