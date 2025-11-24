
import { useState } from "react";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";

const CrmTable=({item})=>{
     const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Time Period"}/>
      ),
      dataIndex: "timePeriod",
      key: "timePeriod",
      width: 200,
      render: (text) =>  <CustomText className={"Text-[]"} value={text}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Visitors"}/>
      ),
      dataIndex: "visitors",
      key: "visitors",
      width: 200,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"New Orders"}/>

      ),
      dataIndex: "newOrders",
      key: "newOrders",
      width: 150,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Birthday"}/>

      ),
      dataIndex: "birthday",
      key: "birthday",
      width: 300,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary"}/>,
      dataIndex: "anniversary",
      key: "anniversary",
      width: 130,
      align:"center",
      render: (text) =>   <CustomText value={text}/>
    }
   
  ];



    return(
        <>
        <CustomTable  dataSource={item} columns={columns}/>

        </>
    )
}
export default CrmTable;