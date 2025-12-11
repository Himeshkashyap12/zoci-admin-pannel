import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import {useDispatch, useSelector} from "react-redux";
import { getTotalSalesAsync } from "../../../feature/sales/salesSlice";
import { Image } from "antd";
import CustomPagination from "../../common/CustomPagination";
import Loader from "../../loader/Loader";
const TotalSalesTable=({totalSales,page,setPage})=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {isLoading}=useSelector(state=>state?.sales)
      const navigate=useNavigate();
          const columns = [
                              {
                                title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value="S No." />,
                                dataIndex: "sno",
                                key: "sno",
                                width: 80,
                                align:"center",
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
              if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:1800}}   dataSource={totalSales?.data} columns={columns}/>
              <CustomPagination total={totalSales?.pagination?.total} pageNumber={page} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default TotalSalesTable;