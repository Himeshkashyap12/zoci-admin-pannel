import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { vendorPerformanceAnalysis } from "../../../feature/inventaryManagement/inventarySlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loader from "../../loader/Loader";
const VendorPerformanceTable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {vendorPerformance,isLoading}=useSelector(state=>state?.inventary);            
        const getVendorPerformance=async()=>{
          try {
          const res=await dispatch(vendorPerformanceAnalysis({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
        getVendorPerformance();
        },[])
    const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 100,
      render: (text) =>  <CustomText className={  " "} value={1}/>
    },
   
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Vendor"}/>

      ),
      dataIndex: "vendorName",
      key: "vendorName",
      width: 250,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU Quantity"}/>

      ),
      dataIndex: "skuQuantity",
      key: "skuQuantity",
      width: 150,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
  
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Quantity"}/>
      ),
      dataIndex: "productQuantity",
      key: "productQuantity",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={` ${text}`}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Average Rating"}/>),
      dataIndex: "averageRating",
      key: "averageRating",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Total Sales"}/>),
      dataIndex: "totalSales",
      key: "totalSales",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Revenue"}/>),
      dataIndex: "revenue",
      key: "revenue",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
  
     
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
              <CustomTable rowSelection={rowSelection}  dataSource={vendorPerformance?.data} columns={columns}/>

        </>
    )
}
export default VendorPerformanceTable;