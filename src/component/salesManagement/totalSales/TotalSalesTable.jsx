import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import {useDispatch, useSelector} from "react-redux";
import { getTotalSalesAsync } from "../../../feature/sales/salesSlice";
import { Image } from "antd";
const TotalSalesTable=({totalSales})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
    
          const columns = [
                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="S No." />,
                                dataIndex: "sno",
                                key: "sno",
                                width: 80,
                                render: (_, __, index) => <CustomText value={index + 1} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Pic" />,
                                dataIndex: "image",
                                key: "image",
                                width: 120,
                                render: (text) => (<Image src={text} width={50} height={50} />),
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="SKU" />,
                                dataIndex: "SKU",
                                key: "SKU",
                                width: 120,
                                render: (text) => <CustomText value={text} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Exhibition / Event" />,
                                dataIndex: "exhibitionOrEvent",
                                key: "exhibitionOrEvent",
                                width: 180,
                                render: (text) => <CustomText value={text} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Customer Name" />,
                                dataIndex: "customerName",
                                key: "customerName",
                                width: 180,
                                render: (text) => <CustomText value={text} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Category" />,
                                dataIndex: "category",
                                key: "category",
                                width: 120,
                                align:"center",
                                render: (text) => <CustomText value={text} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Quantity" />,
                                dataIndex: "quantity",
                                key: "quantity",
                                width: 120,
                                align:"center",
                                render: (text) => <CustomText value={text} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Price" />,
                                dataIndex: "price",
                                key: "price",
                                width: 120,
                                align:"center",
                                render: (text) => <CustomText value={`Rs. ${text}`} />,
                              },

                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="Total Sales" />,
                                dataIndex: "total",
                                key: "total",
                                align:"center",
                                width: 150,
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
              <CustomTable scroll={{x:1800}} rowSelection={rowSelection}  dataSource={totalSales} columns={columns}/>

        </>
    )
}
export default TotalSalesTable;