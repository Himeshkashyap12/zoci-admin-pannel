import {  useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import {  useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { CopyOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { toast } from "react-toastify";
import CustomPagination from "../../common/CustomPagination.jsx"
import { useNavigate } from "react-router-dom";
import { isoToIST } from "../../../constants/constants.js";
const MakeToOrderTablePage=({page,setPage})=>{
      const {makeOnlineOrders,isLoading}=useSelector(state=>state?.order);
      console.log(makeOnlineOrders);
      
      const navigate=useNavigate();
      const copyTextHandler=async(text)=>{
                  try {
                      await navigator.clipboard.writeText(text);
                      toast.success("Address copied successfully");
                    } catch (err) {
                      console.error('Failed to copy text: ', err);
                    }
                }
              const columns = [
                  {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
                ),
                dataIndex: "title",
                key: "title",
                width: 100,
                align:"center",
                render: (_,text,idx) => <CustomText  value={idx+1}/>
              },
              {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Pic"}/>
                ),
                dataIndex: "items",
                key: "items",
                align:"center",
                width: 200,
                render: (_,text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text?.items[0]?.image}/></div></div>
              },
                {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Id"}/>  ),
                dataIndex: "orderId",
                key: "orderId",
                align:"center",
                width: 250,
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "items",
                key: "items",
                align:"center",
                width: 200,
                render: (_,text) =>   <CustomText value={text?.items?.[0]?.sku??"-"}/>
              }, 
              {
                title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>,
                dataIndex: "items",
                key: "items",
                width: 200,
                align:"center",
                render: (_,text) =>   <CustomText value={text?.items?.[0]?.size??"-"}/>
              },
              {
                title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Customer Name"}/>),
                dataIndex: "customerName",
                key: "customerName",
                width: 250,
                align: "start",
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Contact No."}/>),
                dataIndex: "customerMobile",
                key: "customerMobile",
                width: 250,
                align: "start",
                render: (text) => <CustomText value={text}/>
              },
              
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/> ),
                dataIndex: "customerAddress",
                key: "customerAddress",
                width: 350,
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.length<=20?text:text?.slice(0,20)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "price",
                key: "price",
                width: 300,
                align: "center",
                render: (_,text) => <CustomText value={`Rs. ${text?.items?.[0]?.price??"-"}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Ordered Status"}/>),
                dataIndex: "orderStatus",
                key: "orderStatus",
                width: 250,
                align: "center",
                render: (_,text) => {
                  return(  <CustomText 
                     className={`font-semibold
                      ${text?.orderStatus=="Ordered" && "!text-[#214344]" }
                      ${text?.orderStatus=="Pending" && "!text-[#FFB23E]" }
                      ${text?.orderStatus=="Delivered" && "!text-[#5AA53C]" }
                      ${text?.orderStatus=="Cancelled" && "!text-[#f44336]" }
                      ${text?.orderStatus=="Confirmed" && "!text-[#5AA53C]" }
                     `}
                    value={text?.orderStatus}/>  )
                
                  }
              },
               {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Add to shiprocket"}/>),
                dataIndex: "orderStatus",
                key: "orderStatus",
                width: 250,
                align: "center",
                render: (_,text) =><div className="cursor-pointer" onClick={()=>{navigate("/admin/add-order-shiprocket",{state:{item:text,status:"makeToOrder"}})}}> <PlusCircleOutlined style={{color:"#214345",fontSize:"24px"}} /></div>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Ordered Date"}/>),
                dataIndex: "createdAt",
                key: "createdAt",
                width: 300,
                align: "center",
                render: (_,text) => {
                  return(  <CustomText value={isoToIST(text?.createdAt)}/>  )
                }
              }
            ];

        
        if(isLoading) return <Loader/>;
    return(
        <>
         <CustomTable scroll={{x:2000}}  dataSource={makeOnlineOrders?.data} columns={columns}/>
         <CustomPagination pageNumber={page} total={makeOnlineOrders?.total} onchange={(e)=>{setPage(e)}}/>
        </>
    )
}
export default MakeToOrderTablePage;