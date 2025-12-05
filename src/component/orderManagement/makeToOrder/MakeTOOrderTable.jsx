import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { getMakeToOrderAsync } from "../../../feature/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { Image } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import CustomSelect from "../../common/CustomSelect";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
const MakeToOrderTablePage=({setPage,page})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {makeToOrder,isLoading}=useSelector(state=>state?.order);
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
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>),
                dataIndex: "title",
                key: "title",
                width: 100,
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
                render: (_,text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text?.items[0]?.image}/></div></div>
              },
                {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Id"}/>  ),
                dataIndex: "orderId",
                key: "orderId",
                align:"center",
                width: 250,
                render: (_,text) =>  <CustomText value={text?.orderId}/>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "sku",
                key: "sku",
                align:"center",
                width: 200,
                render: (_,text) =>   <CustomText value={text?.items[0]?.sku}/>

              },
              
              {
                title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Exhibition /Event/Online"}/>,
                dataIndex: "eventType",
                key: "eventType",
                width: 300,
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
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/> ),
                dataIndex: "customerAddress",
                key: "customerAddress",
                width: 250,
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

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
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>),
                dataIndex: "items",
                key: "items",
                width: 150,
                align: "center",
                render: (_,text) => <CustomText value={text?.items[0]?.size}/>
              },
               {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Adv Payment"}/>),
                dataIndex: "advancePayment",
                key: "advancePayment",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },
               {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Due payment"}/>),
                dataIndex: "duePayment",
                key: "duePayment",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },



              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "items",
                key: "items",
                width: 250,
                align: "center",
                render: (_,text) => <CustomText value={`Rs. ${text?.items[0]?.price}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Status"}/>),
                dataIndex: "orderStatus",
                key: "orderStatus",
                width: 200,
                align: "center",
                render: (_,text) =>  (<CustomText 
                     className={`font-semibold
                      ${text?.orderStatus=="Ordered" && "!text-[#214344]" }
                      ${text?.orderStatus=="Processing" && "!text-[#FFB23E]" }
                      ${text?.orderStatus=="Delivered" && "!text-[#5AA53C]" }
                      ${text?.orderStatus=="Cancelled" && "!text-[#f44336]" }
                      ${text?.orderStatus=="Exchanged" && "!text-[#5AA53C]" }
                      ${text?.orderStatus=="Returned" && "!text-[#f44336]" }
                      ${text?.orderStatus=="WIP Delivery" && "!text-[#5AA53C]" }
                     
                     
                     `}
                    value={text?.orderStatus}/> )
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
            if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:2500}} rowSelection={rowSelection}  dataSource={makeToOrder?.data} columns={columns}/>
              <CustomPagination pageNumber={page} total={makeToOrder?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default MakeToOrderTablePage;