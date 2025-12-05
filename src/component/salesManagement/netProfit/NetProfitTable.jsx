import { useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { isoToIST } from "../../../constants/constants";
import CustomPagination from "../../common/CustomPagination";

const NetProfitTable=({item,setPage,page})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
   const columns = [
  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="SNo." />,
    dataIndex: "sno",
    key: "sno",
    width: 80,
    render: (_, __, index) => <CustomText value={index + 1} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Discription" />,
    dataIndex: "description",
    key: "description",
    width: 250, 
    render: (text) => <CustomText value={text} />,
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Date" />,
    dataIndex: "date",
    key: "date",
    width: 150,
    align:"center",
    render: (text) => (
      <CustomText value={isoToIST(text)} />
    ),
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Debit" />,
    dataIndex: "debit",
    key: "debit",
    width: 150,
    align:"center",
    render: (value) => (
      <CustomText
        className="!text-[#EF4444]"
        value={`Rs. ${value}` }
      />
    ),
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Credit" />,
    dataIndex: "credit",
    key: "credit",
    width: 150,
    align:"center",
    render: (value) => (
      <CustomText
       className="!text-[#088738]"
        value={`Rs. ${value}`}
      />
    ),
  },
  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Total Debit" />,
    dataIndex: "totalDebit",
    key: "totalDebit",
    width: 150,
    align:"center",
    render: (value) => (
      <CustomText value={`Rs. ${value}`} />
    ),
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Total Credit" />,
    dataIndex: "totalCredit",
    key: "totalCredit",
    width: 150,
    align:"center",
    render: (value) => (
      <CustomText value={`Rs. ${value}`} />
    ),
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
              <CustomTable rowSelection={rowSelection}  dataSource={item?.data} columns={columns}/>
              <CustomPagination  total={item?.pagination?.total} pageNumber={page} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default NetProfitTable;