import { useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { isoToIST } from "../../../constants/constants";

const TotalOrderTable=({item})=>{
  console.log(item);
  
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
  const columns = [
  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="S No."
      />
    ),
    dataIndex: "sno",
    key: "sno",
    width: 80,
    render: (_, __, index) => <CustomText value={index + 1} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Pic"
      />
    ),
    dataIndex: "pic",
    key: "pic",
    align:"center",
    width: 120,
    render: (text) => <Image src={text} width={50} height={50} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="SKU"
      />
    ),
    dataIndex: "sku",
    key: "sku",
    width: 120,
    align:"center",
    render: (text) => <CustomText value={text} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Exhibition / Event /online"
      />
    ),
    dataIndex: "source",
    key: "source",
    width: 250,
    align:"center",
    render: (text) => <CustomText value={text} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Customer Name"
      />
    ),
    dataIndex: "customerName",
    key: "customerName",
    width: 180,
    render: (text) => <CustomText value={text} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Date"
      />
    ),
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    align: "center",
    render: (text) => (
      <CustomText value={isoToIST(text)} />
    ),
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Quantity"
      />
    ),
    dataIndex: "quantity",
    key: "quantity",
    width: 120,
    align: "center",
    render: (text) => <CustomText value={text} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Price"
      />
    ),
    dataIndex: "price",
    key: "price",
    width: 120,
    align: "center",
    render: (text) => <CustomText value={`Rs. ${text}`} />,
  },

  {
    title: (
      <CustomText
        className="!text-[14px] !text-[#fff] font-semibold"
        value="Total Sales"
      />
    ),
    dataIndex: "totalSales",
    key: "totalSales",
    width: 150,
    align: "center",
    render: (text) => <CustomText value={`Rs. ${text}`} />,
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
    return(
        <>
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={item?.data} columns={columns}/>

        </>
    )
}
export default TotalOrderTable;