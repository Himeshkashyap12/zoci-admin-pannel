
import { useEffect, useState } from "react";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { getMarketingDashboardAsync } from "../../feature/marketing/marketingSlice";
const MarketingToolsTable=({marketingDashboard})=>{
     
  
     const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Time Period"}/>
      ),
      dataIndex: "range",
      key: "range",
      width: 200,
      render: (text) =>  <CustomText className={""} value={text}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Active Promotion"}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text) =>  <CustomText value={"Product Name"}/>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Redemption"}/>

      ),
      dataIndex: "redemptionsInRange",
      key: "redemptionsInRange",
      width: 150,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Birthday"}/>

      ),
      dataIndex: "birthdaysCount",
      key: "birthdaysCount",
      width: 300,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Anniversary"}/>,
      dataIndex: "anniversariesCount",
      key: "anniversariesCount",
      width: 130,
      render: (text) =>   <CustomText value={text}/>
    }
  ];



    return(
        <>
        <CustomTable  dataSource={marketingDashboard} columns={columns}/>

        </>
    )
}
export default MarketingToolsTable;