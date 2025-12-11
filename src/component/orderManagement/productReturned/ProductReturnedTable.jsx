
import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { getOrderProductReturnedAdnExchange } from "../../../feature/order/orderSlice";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { Image } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import CustomSelect from "../../common/CustomSelect";
import {toast} from "react-toastify";
import { isoToIST } from "../../../constants/constants";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
const ProductReturnedTable=({page,setPage})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {productReturnedAndExchange,isLoading}=useSelector(state=>state?.order)
      console.log(productReturnedAndExchange);
      
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
                render: (_,text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text?.pic}/></div></div>
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
                dataIndex: "sku",
                key: "sku",
                align:"center",
                width: 200,
                render: (text) =>   <CustomText value={text}/>

              },
              {
                title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Customer Name"}/>),
                dataIndex: "customerName",
                key: "customerName",
                width: 250,
                align: "start",
                render: (text) =>  <CustomText className={"!text-[14px] font-bold"} value={text}/>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/> ),
                dataIndex: "address",
                key: "address",
                width: 350,
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text<=20?text:text?.slice(0,20)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

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
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "price",
                key: "price",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Reason"}/>),
                dataIndex: "reason",
                key: "reason",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={text?text:"NA"}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Returned Date"}/>),
                dataIndex: "date",
                key: "date",
                width: 300,
                align: "center",
                render: (_,text) => <CustomText value={isoToIST(text?.date)}/>
                                   
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Status"}/>),
                dataIndex: "orderStatus",
                key: "orderStatus",
                width: 200,
                align: "center",
                render: (_,text) => <CustomText   className={"!text-[#f44336]"} value={text?.orderStatus}/> }
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
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={productReturnedAndExchange?.data} columns={columns}/>
              <CustomPagination pageNumber={page} total={productReturnedAndExchange?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default ProductReturnedTable;