import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOfflineListAsync } from "../../../feature/sales/salesSlice";
import Cookies from "js-cookie"
import { Image } from "antd";
const OfflineSalesTable=()=>{
     const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {offlineOrder,isLoading}=useSelector(state=>state?.sales);
            console.log(offlineOrder,"offlineOrder");
            
        const getOfflineSalesList=async()=>{
          try {
          const res=await dispatch(getOfflineListAsync({token})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
        getOfflineSalesList();
        },[])
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
                title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Exhibition/ Event"}/>),
                dataIndex: "eventType",
                key: "eventType",
                width: 250,
                align: "center",
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Customer Name"}/>),
                dataIndex: "customerName",
                key: "customerName",
                width: 250,
                align: "start",
                render: (text) => <CustomText value={text}/>
              },
              
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Category"}/> ),
                dataIndex: "category",
                key: "category",
                width: 150,
                align:"center",
                render: (text) =>   <CustomText value={text}/>

              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Billing Place"}/>),
                dataIndex: "billingPlace",
                key: "billingPlace",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`${text}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Quantity"}/>),
                dataIndex: "quantity",
                key: "quantity",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`${text}`}/>
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
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Total sales"}/>),
                dataIndex: "totalSales",
                key: "totalSales",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text}`}/>
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
    return(
        <>
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={offlineOrder?.data} columns={columns}/>

        </>
    )
}
export default OfflineSalesTable;