import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { vendorPerformanceAnalysis } from "../../../feature/inventaryManagement/inventarySlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
const VendorPerformanceTable=({page,setPage})=>{
  const navigate=useNavigate();
      const {vendorPerformance,isLoading}=useSelector(state=>state?.inventary);            
      const vendorData=vendorPerformance?.data?.map((item)=>{
    return {...item,key:item?.vendorId}
  })
    const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 100,
      align:"center",
      render: (_,text,idx) =>  <CustomText  value={idx+1}/>
    },
   
      {
      title: (
       <div > <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Vendor"}/></div>

      ),
      dataIndex: "vendorName",
      key: "vendorName",
      width: 250,
      render: (_,text) => {        
        return (
            <div onClick={()=>{navigate(`/admin/vendor-performance/${text?.phoneNumber}`)}}><CustomText value={text?.vendorName}/></div>
        )
      } 
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU Quantity"}/>

      ),
      dataIndex: "skuQuantity",
      key: "skuQuantity",
      width: 150,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
  
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Quantity"}/>
      ),
      dataIndex: "productQuantity",
      key: "productQuantity",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={` ${text}`}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Average Rating"}/>),
      dataIndex: "averageRating",
      key: "averageRating",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Total Sales"}/>),
      dataIndex: "totalSales",
      key: "totalSales",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Revenue"}/>),
      dataIndex: "revenue",
      key: "revenue",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
  
     
  ];
//   const selectTableRowHandler = productKey => {
//     setSelectedRowKeys(productKey);
//   };
//  const rowSelection = {
//     selectedRowKeys,
//     onChange: selectTableRowHandler,
//   };
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable  dataSource={vendorData} columns={columns}/>
              <CustomPagination pageNumber={page} total={vendorPerformance?.totalVendors} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default VendorPerformanceTable;