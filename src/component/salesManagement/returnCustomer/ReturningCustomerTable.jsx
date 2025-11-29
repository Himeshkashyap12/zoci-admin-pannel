import { useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const ReturningCustomerTable=({returningCustomers})=>{
       const [selectedRowKeys, setSelectedRowKeys] = useState([]);
       const navigate=useNavigate();
                const columns = [
                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="SNo."
                    />
                  ),
                  dataIndex: "sNo",
                  key: "sNo",
                  width: 80,
                  render: (_, __, index) => <CustomText value={index + 1} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Last Order ID"
                    />
                  ),
                  dataIndex: "lastOrderId",
                  key: "lastOrderId",
                  width: 200,
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
                  width: 200,
                  render: (text) => <CustomText value={text} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Contact Number"
                    />
                  ),
                  dataIndex: "contactNumber",
                  key: "contactNumber",
                  width: 150,
                  align:"center",
                  render: (text) => <CustomText value={text} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Exhibition /Event/Online"
                    />
                  ),
                  dataIndex: "exhibitionEventOnline",
                  key: "exhibitionEventOnline",
                  width: 200,
                  align:"center",
                  render: (text) => <CustomText value={text} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Last Purchase Date"
                    />
                  ),
                  dataIndex: "lastPurchaseDate",
                  key: "lastPurchaseDate",
                  width: 150,
                  align: "center",
                  render: (date) => (
                    <CustomText value={new Date(date).toISOString().split("T")[0]} />
                  ),
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Total Orders"
                    />
                  ),
                  dataIndex: "totalOrders",
                  key: "totalOrders",
                  width: 120,
                  align: "center",
                  render: (text) => <CustomText value={text} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="Total Spends"
                    />
                  ),
                  dataIndex: "totalSpends",
                  key: "totalSpends",
                  width: 150,
                  align: "center",
                  render: (text) => <CustomText value={`Rs. ${text}`} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-[#fff] font-semibold"
                      value="History"
                    />
                  ),
                  dataIndex: "historyKey",
                  key: "historyKey",
                  width: 120,
                  align: "center",
                  render: (_,text) => {
                    return(
                      <div className="cursor-pointer" onClick={()=>{navigate(`/admin/returning-customer/${text?.historyKey}`)}}>
                      <EyeOutlined style={{ fontSize: 18 }} />
                    </div>
                    )   
                  },
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
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={returningCustomers?.data} columns={columns}/>

        </>
    )
}
export default ReturningCustomerTable;