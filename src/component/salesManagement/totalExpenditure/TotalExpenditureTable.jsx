import { useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { isoToIST } from "../../../constants/constants";
import CustomPagination from "../../common/CustomPagination";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";

const TotalExpenditureTable=({item,setPage ,page})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
       const {isLoading}=useSelector(state=>state?.sales);            

     const columns = [
  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="SNo." />,
    dataIndex: "sno",
    key: "sno",
    width: 80,
    align:"center",
    render: (_, __, index) => <CustomText value={index + 1} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Expense Type" />,
    dataIndex: "subCategory",
    key: "subCategory",
    width: 180,
    align:"center",
    render: (text) => <CustomText value={text} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Category" />,
    dataIndex: "category",
    key: "category",
    width: 150,
    align:"center",
    render: (text) => <CustomText value={text} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Quantity" />,
    dataIndex: "quantity",
    key: "quantity",
    width: 120,
    align:"center",
    render: (text) => <CustomText value={text || "NA"} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Description" />,
    dataIndex: "description",
    key: "description",
    width: 300,
    render: (text) => <CustomText value={text} />,
  },

 

 

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Total Amount" />,
    dataIndex: "totalAmount",
    key: "totalAmount",
    width: 150,
    render: (text) => <CustomText value={`Rs. ${text.toLocaleString()}`} />,
  },
   {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Date" />,
    dataIndex: "date",
    key: "date",
    width: 150,
    render: (text) => (
      <CustomText value={isoToIST(text)} />
    ),
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
              <CustomTable scroll={{x:1200}}   dataSource={item?.data} columns={columns}/>
              <CustomPagination total={item?.pagination?.total} pageNumber={page} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default TotalExpenditureTable;