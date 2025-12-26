import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getBirthdayAnniversaryReminderAsync } from "../../../feature/crm/crmSlice";
import { isoToIST } from "../../../constants/constants";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
const BirthdayReminderTable=({page,setPage})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {birthdayAnniversaryReminder,isLoading}=useSelector(state=>state?.crm);
     
      
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
      width: 50,
      align:"center",
      render: (_,item,idx) =>  <CustomText  value={idx+1}/>
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
      title: <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Birthday Date"}/>,
      dataIndex: "birthdayDate",
      key: "birthdayDate",
      width: 130,
      render: (text) =>   <CustomText value={isoToIST(text)}/>
    }
   
  ];
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable   dataSource={birthdayAnniversaryReminder?.data} columns={columns}/>
        <CustomPagination pageNumber={page} total={birthdayAnniversaryReminder?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default BirthdayReminderTable;