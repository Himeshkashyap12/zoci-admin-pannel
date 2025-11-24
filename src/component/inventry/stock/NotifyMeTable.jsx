import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { notifyMeAsync } from "../../../feature/inventaryManagement/inventarySlice";
import { Image } from "antd";
import Loader from "../../loader/Loader";
const NotifyMeTable=({setSelectedRowKeys,selectedRowKeys})=>{
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {notfyMe,isLoading}=useSelector(state=>state?.inventary);      
      const notifyMeData=notfyMe?.data?.map((item)=>{
        return {...item,key:item?.productId}
      });         
        const getNotifyMe=async()=>{
          try {
          const res=await dispatch(notifyMeAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
          getNotifyMe();
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
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"No. of customers intrested"}/>),
      dataIndex: "interestedCount",
      align: "center",
      key: "interestedCount",
      width: 300,
      render: (text) =>  <CustomText value={text}/>

     
    },
     
  ];
 const notifyMeSelectHandler = productId => {
    console.log('selectedRowKeys changed: ', productId);
    setSelectedRowKeys(productId);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: notifyMeSelectHandler,
  };
  if(isLoading) return <Loader/>

    return(
        <>
              <CustomTable rowSelection={rowSelection}  dataSource={notifyMeData} columns={columns}/>

        </>
    )
}
export default NotifyMeTable;