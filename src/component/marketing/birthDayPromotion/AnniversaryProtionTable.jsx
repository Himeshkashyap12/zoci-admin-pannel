import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnniversaryAsync } from "../../../feature/marketing/marketingSlice";
import Cookies from "js-cookie"
import Loader from "../../loader/Loader";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { isoToIST } from "../../../constants/constants";
const AnniversaryPromotionalTable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {anniversary,isLoading}=useSelector(state=>state?.marketing);
            console.log(anniversary,"anniversay");
        const getAnniversayPromotion=async()=>{
          try {
            
          const res=await dispatch(getAllAnniversaryAsync({token})).unwrap();
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
        getAnniversayPromotion();
        },[])
     const columns = [
                {
              title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
              ),
              dataIndex: "title",
              key: "title",
              width: 100,
              render: (text) =>  <CustomText  value={1}/>
            },
            
            {
              title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Name"}/>
              ),
              dataIndex: "firstname",
              key: "firstname",
              width: 200,
              render: (_,text) =>  <div onClick={()=>{navigate("")}}><CustomText value={`${text?.firstname} ${text?.lastname}`}/></div>
            },
              {
              title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"WhatsApp Number"}/>

              ),
              dataIndex: "mobile",
              key: "mobile",
              align:"start",
              width: 200,
              render: (text) =>  <CustomText value={text}/>
            },
            {
              title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/>

              ),
              dataIndex: "address",
              key: "address",
              width: 350,
              render: (_,text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.address[0]?.address.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text?.address[0]?.address)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>
            },
            {
              title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary Date"}/>,
              dataIndex: "anniversary",
              key: "anniversary",
              width: 250,
              align:"center",
              render: (_,text) =>   <CustomText value={isoToIST(text?.anniversary?.date)}/>
            },
             {
              title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Spouse Name"}/>,
              dataIndex: "anniversary",
              key: "anniversary",
              width: 250,
              align:"center",
              render: (_,text) =>   <CustomText value={text?.anniversary?.spouseName}/>
            },
             {
              title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Spouse’s  Number"}/>,
              dataIndex: "anniversary",
              key: "anniversary",
              width: 250,
              align:"center",
              render: (_,text) =>   <CustomText value={text?.anniversary?.spouseNumber}/>
            },
            
            
          
          ];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
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
        <CustomTable rowSelection={rowSelection} scroll={{x:1500}}  dataSource={anniversary?.users} columns={columns}/>
        </>
    )
}
export default AnniversaryPromotionalTable;