import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { getBirthdayAnniversaryReminderAsync } from "../../../feature/crm/crmSlice";
import { CopyOutlined } from "@ant-design/icons";
import { isoToIST } from "../../../constants/constants";
import Loader from "../../loader/Loader";
const AnniversaryRemindertable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {birthdayAnniversaryReminder,isLoading}=useSelector(state=>state?.crm);
      console.log(birthdayAnniversaryReminder,"hvhv");
      
     const copyTextHandler=async(text)=>{
          try {
              await navigator.clipboard.writeText(text);
              toast.success("Address copied successfully");
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          
        }
        const getCrmAnniversaryReminderHandler=async()=>{
          try {
            const data={type:"anniversary"}
          const res=await dispatch(getBirthdayAnniversaryReminderAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }

        
         useEffect(()=>{
                getCrmAnniversaryReminderHandler();
                },[])
               
     const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 50,
      render: (text) =>  <CustomText  value={1}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Name"}/>
      ),
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) =>  <CustomText value={text}/>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"WhatsApp Number"}/>

      ),
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/>

      ),
      dataIndex: "address",
      key: "address",
      width: 250,
      render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>

    },
    {
      title: <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary Date"}/>,
      dataIndex: "birthdayDate",
      key: "birthdayDate",
      width: 130,
      render: (text) =>   <CustomText value={isoToIST(text)}/>
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
              <CustomTable rowSelection={rowSelection}  dataSource={birthdayAnniversaryReminder?.data} columns={columns}/>

        </>
    )
}
export default AnniversaryRemindertable;