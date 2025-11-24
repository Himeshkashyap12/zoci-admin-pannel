import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { getAllBirthdayPromotion } from "../../../feature/marketing/marketingSlice";
import Loader from "../../loader/Loader";
import { CopyOutlined } from "@ant-design/icons";
import {toast} from "react-toastify"
import { isoToIST } from "../../../constants/constants";
const BirthdayPromotionTable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {birthday,isLoading}=useSelector(state=>state?.marketing);
            console.log(birthday,"promotion");
            
        const getBirthdayPromotion=async()=>{
          try {
            
          const res=await dispatch(getAllBirthdayPromotion({token})).unwrap();
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
        getBirthdayPromotion();
        },[])
            const columns = [
                {
              title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
              ),
              dataIndex: "title",
              key: "title",
              width: 70,
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
              width: 250,
              render: (text) =>  <CustomText value={text}/>
            },
            {
              title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Address"}/>

              ),
              dataIndex: "address",
              key: "address",
              width: 300,
              render: (_,text) =>  <div className="flex justify-between items-center" > <CustomText value={text?.address[0]?.address.slice(0,30)+"..."}/><div className="!bg-[#214344] flex justify-center items-center p-2 rounded-full" onClick={()=>{copyTextHandler(text?.address[0]?.address)}}><CopyOutlined style={{fontSize:"16px" ,color:"#F0D5A0"}} /></div></div>
            },
            {
              title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Birthday Date"}/>,
              dataIndex: "birthday",
              key: "birthday",
              width: 250,
              align:"center",
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
        <CustomTable rowSelection={rowSelection} scroll={{x:600}}  dataSource={birthday?.users} columns={columns}/>
        </>
    )
}
export default BirthdayPromotionTable;