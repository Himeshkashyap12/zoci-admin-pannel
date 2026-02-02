import { CopyOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { isoToIST } from "../../../constants/constants";
import { getMakeToOrderAsync, updateOrderStatusAsync } from "../../../feature/order/orderSlice";
import CustomModal from "../../common/CustomModal";
import CustomPagination from "../../common/CustomPagination";
import CustomSelect from "../../common/CustomSelect";
import CustomStatusChangeConfirmationPopUp from "../../common/CustomStatusChangeConfirmationPopUp";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
const MakeToOrderTablePage=({setPage,page})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {makeToOrder,isLoading}=useSelector(state=>state?.order);
      const token=Cookies.get("token");
      const [orderStatusModel,setOrderStatusModel]=useState(false);
      const [orderStatus,setOrderStatus]=useState("");
      const [orderItem,setOrderItem]=useState(null)
       const dispatch=useDispatch();
      
      const navigate=useNavigate();
         const copyTextHandler=async(text)=>{
                  try {
                      await navigator.clipboard.writeText(text);
                      toast.success("Address copied successfully");
                    } catch (err) {
                      console.error('Failed to copy text: ', err);
                    }
           }
            const orderStatusOptions = [
                    { label: "Ordered", value: "Ordered" },
                    { label: "Processing", value: "Processing" },
                    { label: "WIP Delivery", value: "WIP Delivery" },
                    { label: "Delivered", value: "Delivered" },
                    { label: "Returned", value: "Returned" },
                    { label: "Exchanged", value: "Exchanged" },
                    { label: "Cancelled", value: "Cancelled" }
            ];

        const orderStatusHandler=async()=>{
          try {
            const data={advancePayment:orderItem?.advancePayment,orderStatus:orderStatus}
            const res=await dispatch(updateOrderStatusAsync({token,id:orderItem?._id,data})).unwrap();
           if(res?.success){
            toast.success(res?.message);
            const data={page:page,limit:10}
            dispatch(getMakeToOrderAsync({token,data}));
            setOrderStatusModel(false);
           }
            
          } catch (error) {
            toast.error("Something went wrong. Please try again.");  
            setOrderStatusModel(false)
            
          }
        }

        const orderStatusConfirmation=(e,item)=>{
          setOrderStatusModel(true);
          setOrderItem(item);
          setOrderStatus(e);
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
                width: 150,
                render: (_,text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text?.items[0]?.image}/></div></div>
              },
                {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Id"}/>  ),
                dataIndex: "orderId",
                key: "orderId",
                align:"center",
                width: 200,
                render: (_,text) =>  <CustomText value={text?.orderId}/>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "sku",
                key: "sku",
                align:"center",
                width: 200,
                render: (_,text) =>   <CustomText value={text?.items[0]?.sku??"-"}/>

              },
              
              {
                title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Exhibition/ Event/ Online"}/>,
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
                width: 350,
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

              },
                {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Contact No."}/>),
                dataIndex: "customerMobile",
                key: "customerMobile",
                width: 180,
                align: "center",
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
                width: 200,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },
               {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Due payment"}/>),
                dataIndex: "duePayment",
                key: "duePayment",
                width: 180,
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
                render:(_,text)=>{
                  return(
                   <CustomSelect value={text?.orderStatus} onchange={(e)=>{orderStatusConfirmation(e,text)}} options={orderStatusOptions} className="!rounded-full w-full" />
                  )
                }
              },
               {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Add to shiprocket"}/>),
                dataIndex: "items",
                key: "items",
                width: 250,
                align: "center",
                render: (_,text) =><div className="cursor-pointer" onClick={()=>{text?.orderStatus=="Ordered" ? navigate("/admin/add-order-shiprocket",{state:{item:text,status:"makeOnlineOrder"}}):toast.error("You are not elligible to create order at shiprocket")}}><PlusCircleOutlined style={{color:"#214345",fontSize:"24px"}} /></div>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Date"}/>),
                dataIndex: "items",
                key: "items",
                width: 250,
                align: "center",
                render: (_,text) => <CustomText value={` ${isoToIST(text.createdAt)}`}/>
              },
            ];
      
            if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:2500}}  dataSource={makeToOrder?.data} columns={columns}/>
              <CustomPagination pageNumber={page} total={makeToOrder?.total} onchange={(e)=>{setPage(e)}}/>
            <CustomModal closeIcon  footer={false} setOpen={setOrderStatusModel} open={orderStatusModel} modalBody={<CustomStatusChangeConfirmationPopUp  confirmationPopUpHandler={orderStatusHandler} setUpdateConfirm={setOrderStatusModel} /> } width={"800px"}  align={"center"}/>

        </>
    )
}
export default MakeToOrderTablePage;