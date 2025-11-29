
import { useEffect, useState } from "react";
import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie"
import { getSalesTimeAsync } from "../../feature/sales/salesSlice";
const SalesReportTable=()=>{
   const dispatch=useDispatch();
   const token=Cookies.get("token");
   const {salesTime}=useSelector(state=>state?.sales)


    const columns = [
    {
      title: (
        <CustomText
          value="Time Period"
          className="!text-[14px] !text-white font-semibold"
        />
      ),
      dataIndex: "range",
      key: "range",
      render: (value) => (
        <CustomText
          value={value }
        />
      ),
    },

    {
      title: (
        <CustomText
          value="Revenue"
          className="!text-[14px] !text-white font-semibold"
        />
      ),
      dataIndex: "revenue",
      key: "revenue",
      render: (value) => <CustomText value={`Rs. ${value}`} />,
    },

    {
      title: (
        <CustomText
          value="Expenditure"
          className="!text-[14px] !text-white font-semibold"
        />
      ),
      dataIndex: "expenditure",
      key: "expenditure",
      render: (value) => <CustomText value={`Rs. ${value}`} />,
    },

    {
      title: (
        <CustomText
          value="Net Profit/Loss"
          className="!text-[14px] !text-white font-semibold"
        />
      ),
      dataIndex: "net",
      key: "net",
      render: (value) => <CustomText value={`Rs. ${value.toLocaleString()}`} />,
    },

    {
      title: (
        <CustomText
          value="Profit Margin (%)"
          className="!text-[14px] !text-white font-semibold"
        />
      ),
      dataIndex: "profitMargin",
      key: "profitMargin",
      render: (value) => (
        <CustomText value={`${parseFloat(value).toFixed(2)}%`} />
      ),
    },
  ];


    return(
        <>
        <CustomTable  dataSource={salesTime?.data} columns={columns}/>

        </>
    )
}
export default SalesReportTable;