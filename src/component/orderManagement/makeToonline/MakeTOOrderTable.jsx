import {  useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import {  useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { CopyOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { toast } from "react-toastify";
import CustomPagination from "../../common/CustomPagination.jsx"
const MakeToOrderTablePage=({page,setPage,selectedRowKeys,setSelectedRowKeys})=>{
      const {makeOnlineOrders,isLoading}=useSelector(state=>state?.order);
      const makeOnlineOrderData=makeOnlineOrders?.orders?.map((item)=>{
        return ( {...item,key:item?.orderId})
      });      
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
                dataIndex: "image",
                key: "image",
                align:"center",
                width: 200,
                render: (text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text}/></div></div>
              },
                {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Id"}/>  ),
                dataIndex: "orderId",
                key: "orderId",
                align:"center",
                width: 200,
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "sku",
                key: "sku",
                align:"center",
                width: 200,
                render: (text) =>   <CustomText value={text}/>
              }, 
              {
                title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>,
                dataIndex: "size",
                key: "size",
                width: 200,
                align:"center",
                render: (text) =>   <CustomText value={text}/>
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
                dataIndex: "mobile",
                key: "mobile",
                width: 250,
                align: "start",
                render: (text) => <CustomText value={text}/>
              },
              
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/> ),
                dataIndex: "address",
                key: "address",
                width: 350,
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.length<=20?text:text?.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "price",
                key: "price",
                width: 300,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Ordered Status"}/>),
                dataIndex: "status",
                key: "status",
                width: 250,
                align: "center",
                render: (_,text) => {
                  return(  <CustomText 
                     className={`font-semibold
                      ${text?.status=="Ordered" && "!text-[#214344]" }
                      ${text?.status=="Pending" && "!text-[#FFB23E]" }
                      ${text?.status=="Delivered" && "!text-[#5AA53C]" }
                      ${text?.status=="Cancelled" && "!text-[#f44336]" }
                      ${text?.status=="Confirmed" && "!text-[#5AA53C]" }
                     `}
                    value={text?.status}/>  )
                
                  }
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Ordered Date"}/>),
                dataIndex: "date",
                key: "date",
                width: 300,
                align: "center",
                render: (_,text) => {
                  return(  <CustomText value={text?.date}/>  )
                
                      }
              }
            ];

          const onSelectChange = newSelectedRowKeys => {
              console.log('selectedRowKeys changed: ', newSelectedRowKeys);
              setSelectedRowKeys(newSelectedRowKeys);
            };
          const rowSelection = {
              selectedRowKeys,
              onChange: onSelectChange,
            };
        if(isLoading) return <Loader/>;
    return(
        <>
              <CustomTable scroll={{x:1800}}  dataSource={makeOnlineOrderData} columns={columns}/>
         <CustomPagination pageNumber={page} total={makeOnlineOrders?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default MakeToOrderTablePage;