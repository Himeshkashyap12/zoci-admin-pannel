import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
import { Image } from "antd";
import { useSelector } from "react-redux";
import CustomPagination from "../../common/CustomPagination";
const OnlineSalesTable=({onlineSales,setPage,page})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {isLoading}=useSelector(state=>state?.sales);
     
     const columns = [
                  {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
                ),
                dataIndex: "title",
                key: "title",
                width: 100,
                render: (text) => <CustomText  value={1}/>
              },
              
              {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Pic"}/>
                ),
                dataIndex: "pic",
                key: "pic",
                align:"center",
                width: 200,
                render: (text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text}/></div></div>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "sku",
                key: "sku",
                align:"center",
                width: 200,
                render: (text) =>   <CustomText value={text}/>

              },
              {
                title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Customer Name"}/>),
                dataIndex: "customerName",
                key: "customerName",
                width: 250,
                align: "start",
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Category"}/>),
                dataIndex: "category",
                key: "category",
                width: 250,
                align: "start",
                render: (text) => <CustomText value={text}/>
              },
              
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Quantity"}/> ),
                dataIndex: "quantity",
                key: "quantity",
                width: 150,
                align:"center",
                render: (text) =>   <CustomText value={text}/>

              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "price",
                key: "price",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Total Sales"}/>),
                dataIndex: "totalSales",
                key: "totalSales",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
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
              <CustomTable scroll={{x:1200}} rowSelection={rowSelection}   dataSource={onlineSales?.data} columns={columns}/>
              <CustomPagination total={onlineSales?.pagination?.total} pageNumber={page}   onchange={(e)=>{setPage(e)}}/>
              
        </>
    )
}
export default OnlineSalesTable;