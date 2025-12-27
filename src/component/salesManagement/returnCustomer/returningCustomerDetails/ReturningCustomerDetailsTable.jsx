

import { useState } from "react";
import CustomTable from "../../../common/CustomTable";
import CustomText from "../../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Image } from "antd";
import CustomPagination from "../../../common/CustomPagination";
import Loader from "../../../loader/Loader";

const ReturningCustomerDetailsTable=({page,setPage})=>{
    const {returningCustomerDetails,isLoading}=useSelector(state=>state?.sales);           
       const [selectedRowKeys, setSelectedRowKeys] = useState([]);
       const navigate=useNavigate();
               const columns = [
                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"SNo."}
                    />
                  ),
                  dataIndex: "sNo",
                  key: "sNo",
                  width: 80,
                  render: (text) => <CustomText value={`${text}.`} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Product image"}
                    />
                  ),
                  dataIndex: "productImage",
                  key: "productImage",
                  width: 150,
                  render: (img) =>
                    img ? (
                      <Image
                        src={img}
                        alt="product"
                        style={{ width: 60, height: 60, objectFit: "contain" }}
                      />
                    ) : (
                      <CustomText value="No Image" />
                    ),
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Order ID"}
                    />
                  ),
                  dataIndex: "orderId",
                  key: "orderId",
                  width: 180,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Product Name"}
                    />
                  ),
                  dataIndex: "productName",
                  key: "productName",
                  width: 150,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"SKU"}
                    />
                  ),
                  dataIndex: "sku",
                  key: "sku",
                  width: 100,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Size"}
                    />
                  ),
                  dataIndex: "size",
                  key: "size",
                  width: 80,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Exhibition /Event/Online"}
                    />
                  ),
                  dataIndex: "exhibitionEventOnline",
                  key: "exhibitionEventOnline",
                  width: 200,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Date"}
                    />
                  ),
                  dataIndex: "date",
                  key: "date",
                  width: 120,
                  render: (text) => <CustomText value={text || "-"} />,
                },

                {
                  title: (
                    <CustomText
                      className="!text-[14px] !text-white font-semibold"
                      value={"Price"}
                    />
                  ),
                  dataIndex: "price",
                  key: "price",
                  width: 120,
                  render: (value) => (
                    <CustomText value={`₹${value?.toLocaleString() || "0"}`} />
                  ),
                },
              ];



 const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:1800}}   dataSource={returningCustomerDetails?.data?.rows} columns={columns}/>
              <CustomPagination total={returningCustomerDetails?.data?.totalRecords} pageNumber={page} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default ReturningCustomerDetailsTable;