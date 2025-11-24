import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import {useDispatch, useSelector} from "react-redux"
import Cookies from "js-cookie"
import { stockLevelAlertAsync } from "../../../feature/inventaryManagement/inventarySlice";
import { Image } from "antd";
import Loader from "../../loader/Loader";
const StockAlertTable=({setSelectedRowKeys,selectedRowKeys})=>{
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {stockLevelAlert,isLoading}=useSelector(state=>state?.inventary);
       const stockAlertData=stockLevelAlert?.data?.map((item)=>{
        return {...item,key:item?.productId}
      }); 
      
            
        const getStockAlert=async()=>{
          try {
          const res=await dispatch(stockLevelAlertAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }



        useEffect(()=>{
        getStockAlert();
        },[])
    const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 100,
      render: (_,text,idx) =>  <CustomText className={  " "} value={idx+1}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Image"}/>
      ),
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (text) => <div className="flex justify-center"> <Image className="!size-[50px]" src={text?.productImage}/></div>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"}/>

      ),
      dataIndex: "productName",
      key: "productName",
      width: 250,
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
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Quantity Sold"}/>),
      dataIndex: "quantitySold",
      align: "center",
      key: "quantitySold",
      width: 130,
      render: (text) =>  <CustomText value={text}/>

     
    },
     
  ];

 const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable rowSelection={rowSelection}  dataSource={stockAlertData} columns={columns} scroll={{x:1700}}/>

        </>
    )
}
export default StockAlertTable;