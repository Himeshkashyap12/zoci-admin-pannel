import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomerList } from "../../../feature/crm/crmSlice";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";
import {CopyOutlined, EyeOutlined } from "@ant-design/icons";
import {toast} from "react-toastify";
const CustomerListTable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {customerList,isLoading}=useSelector(state=>state?.crm);
console.log(customerList,"knjb");

        const getAllCustomerListHandler=async()=>{
          try {
          const res=await dispatch(getAllCustomerList({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }

         const copyTextHandler=async(text)=>{
          try {
              await navigator.clipboard.writeText(text);
              toast.success("Address copied successfully");
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          
        }
         useEffect(()=>{
                getAllCustomerListHandler();
                },[])
               
                
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
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Name"}/>
      ),
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_,text) =>  <div onClick={()=>{navigate(`/admin/crm-customer-list/${text?.id}`)}}><CustomText value={text?.name??"NA"}/></div>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"WhatsApp Number"}/>  ),
      dataIndex: "mobile",
      key: "mobile",
      width: 250,
      render: (text) =>  <CustomText value={text}/>
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
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"DOB"}/>,
      dataIndex: "dob",
      key: "dob",
      width: 200,
      align:"center",
      render: (text) =>   <CustomText value={text}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary"}/>),
      dataIndex: "anniversary",
      key: "anniversary",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Last Purchase Date "}/>),
      dataIndex: "lastPurchase",
      key: "lastPurchase",
      width: 250,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
     {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Total orders"}/>),
      dataIndex: "totalOrders",
      key: "totalOrders",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
     {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Total Spends"}/>),
      dataIndex: "totalSpends",
      key: "totalSpends",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={`Rs. ${text}`}/>
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
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={customerList?.data} columns={columns}/>

        </>
    )
}
export default CustomerListTable;