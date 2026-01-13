import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isoToISTDateOnly } from "../../../constants/constants";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
const AnniversaryRemindertable=()=>{
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
      render: (text) =>  <div className="flex justify-between items-center" > <CustomText value={`${text?.slice(0,100)} ${text?.length>100 ? "...":""}`}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>
    },
    {
      title: <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary Date"}/>,
      dataIndex: "birthdayDate",
      key: "birthdayDate",
      width: 130,
      align:"center",
      render: (text) =>   <CustomText value={isoToISTDateOnly(text)}/>
    }
  ];
    if(isLoading) return <Loader/>;
    return(
        <>
              <CustomTable   dataSource={birthdayAnniversaryReminder?.data} columns={columns}/>

        </>
    )
}
export default AnniversaryRemindertable;