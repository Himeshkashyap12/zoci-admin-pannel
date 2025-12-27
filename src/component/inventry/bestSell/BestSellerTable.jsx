import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bestSellingProducts } from "../../../feature/inventaryManagement/inventarySlice";
import Cookies from "js-cookie"
import { Image } from "antd";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
const BestSellerTable=({page,setPage,selectedRowKeys,setSelectedRowKeys})=>{
      const {bestSeller,isLoading}=useSelector(state=>state?.inventary);
      const bestSellerData=bestSeller?.data?.map((item)=>{
        return {...item,key:item?.productId}
      })
 const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 100,
      render: (_,text,idx) =>  <CustomText  value={idx+1}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Image"}/>
      ),
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (_,text) => <div className="flex justify-center"> <Image className="!size-[50px]" src={text?.productImage}/></div>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"}/>

      ),
      dataIndex: "productName",
      key: "productName",
      width: 300,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/>

      ),
      dataIndex: "sku",
      key: "sku",
      width: 150,
      render: (text) =>  <CustomText value={text}/>
    },
   
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>
      ),
      dataIndex: "price",
      key: "price",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={`Rs. ${text}`}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Available Qut."}/>),
      dataIndex: "availableQuantity",
      key: "availableQuantity",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Metal Type"}/>),
      dataIndex: "metalType",
      key: "metalType",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text==""?"NA":text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Category"}/>),
      dataIndex: "category",
      key: "category",
      width: 250,
      align: "center",
      render: (text) =>  <CustomText value={text??"NA"}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Total Sold Quantity"}/>),
      dataIndex: "totalSoldQuantity",
      align: "center",
      key: "totalSoldQuantity",
      width: 250,
      render: (text) =>  <CustomText value={text}/>

     
    }
     
  ];

 const onSelectChange = productsId => {
    setSelectedRowKeys(productsId);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable rowSelection={rowSelection} scroll={{x:1400}}  dataSource={bestSellerData} columns={columns}/>
              <CustomPagination pageNumber={page} total={bestSeller?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default BestSellerTable;