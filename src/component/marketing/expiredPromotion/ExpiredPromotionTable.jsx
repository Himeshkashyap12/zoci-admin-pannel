

import { useEffect } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import {useDispatch, useSelector} from "react-redux"
import { getAllPromotionAsync } from "../../../feature/marketing/marketingSlice";
import Cookies from "js-cookie";
import { isoToIST } from "../../../constants/constants";
import { Image, Space } from "antd";
import deleteIcon from ".././../../assets/icons/deleteIcon.png"
import { EditOutlined } from "@ant-design/icons";
import Loader from "../../loader/Loader";

const ExpiredPromotionTable=()=>{
   const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {promotion,isLoading}=useSelector(state=>state?.marketing);
            console.log(promotion,"promotion");
            
        const getActivePromotion=async()=>{
          try {
            const data={isActive:false}
          const res=await dispatch(getAllPromotionAsync({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }



        useEffect(()=>{
        getActivePromotion();
        },[])
     const columns = [
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Promocode"}/>
      ),
      dataIndex: "code",
      key: "code",
      width: 200,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Type"}/>

      ),
      dataIndex: "type",
      key: "type",
      align:"center",
      width: 200,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Value"}/>

      ),
      dataIndex: "value",
      key: "value",
      width: 150,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Usage Limit"}/>,
      dataIndex: "usageLimit",
      key: "usageLimit",
      width: 150,
      align:"center",
      render: (text) =>   <CustomText value={text}/>
    },
    {
      title: (
          <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Used Count"}/>
      ),
      dataIndex: "usageCount",
      key: "usageCount",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Range"}/>),
      dataIndex: "maxOrderValue",
      key: "maxOrderValue",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text??"NA"}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Category"}/>),
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Expiry Date"}/>),
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={isoToIST(text)}/>
    },
     {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Status"}/>),
      dataIndex: "isActive",
      key: "isActive",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText className={"!text-[red] !text-[14px]"} value={"Expired"}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Banner"}/>),
      dataIndex: "banner",
      key: "banner",
      width: 200,
      align: "center",
      render: (text) =>  <Image preview={false} src={text}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>),
      dataIndex: "action",
      align: "center",
      key: "action",
      width: 130,
      render: (_, record) => (
        <Space size="middle">
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            // onClick={() => {
            //   setDeleteConfirm(true),setDeleteId(record?._id);
            // }}
          >
            <img src={deleteIcon} alt="deleteIcon"/>
          </div>
          <div
            className="h-[20px] w-[20px] cursor-pointer"
          >
            <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
          </div>
        </Space>
      ),
     
     
    },
  ];

  if(isLoading) return <Loader/>
    return(
        <>
        <CustomTable scroll={{x:1700}}  dataSource={promotion?.promos} columns={columns}/>
        </>
    )
}
export default ExpiredPromotionTable;