import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import Cookies from "js-cookie";
import { getManageOnlineOrderAsync } from "../../../feature/order/orderSlice";
import { CopyOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { toast } from "react-toastify";
import CustomSelect from "../../common/CustomSelect";
const MakeToOrderTablePage=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const [orderStatus,setOrderStatus]=useState("")
      const navigate=useNavigate();
       const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {makeOnlineOrders,isLoading}=useSelector(state=>state?.order);
            console.log(makeOnlineOrders,"makeOnlineOrders");
            

            const orderStatusOption=[
            { label:<CustomText className={"!text-[orange]"} value={"Ordered"}/>,value:"Ordered"},
            { label:<CustomText className={"!text-[#FFDB58]"} value={"Pending"}/>,value:"Pending"},
            { label:<CustomText className={"!text-[green]"} value={"Delivered"}/>,value:"Delivered"},
            { label:<CustomText className={"!text-[red]"} value={"Cancelled"}/>,value:"Cancelled"}
            ]
            const orderChangeHandler=(e)=>{
              console.log(e,"dsfbdh");
              
            }
        const getMakeToOnlineOrder=async()=>{
          try {
          const res=await dispatch(getManageOnlineOrderAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
        getMakeToOnlineOrder();
        },[])
        
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
                render: (text) => <CustomText  value={1}/>
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
                render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

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
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Status"}/>),
                dataIndex: "date",
                key: "date",
                width: 200,
                align: "center",
                render: (_,text) => {
                  console.log(text,"text");
                  
                  return(
                           
                           
                           <div className="flex flex-col justify-center "><CustomText value={text?.date}/>
                                <CustomSelect value={text?.status} placeholder="Set Order status" onchange={(e)=>{orderChangeHandler(e)}} options={orderStatusOption} />
                              </div>
                  )
                
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
        if(isLoading) return <Loader/>

    return(
        <>
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={makeOnlineOrders?.orders} columns={columns}/>

        </>
    )
}
export default MakeToOrderTablePage;