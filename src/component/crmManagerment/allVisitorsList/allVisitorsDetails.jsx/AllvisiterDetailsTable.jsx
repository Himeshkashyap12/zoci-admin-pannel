
import { useState } from "react";
import CustomTable from "../../../common/CustomTable";
import CustomText from "../../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { isoToIST } from "../../../../constants/constants";
import CustomPagination from "../../../common/CustomPagination";
import Loader from "../../../loader/Loader";
import { useSelector } from "react-redux";

const AllVisitorsDetailsTable=({item,setPage})=>{
  
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {isLoading}=useSelector(state=>state?.crm);

      const navigate=useNavigate();
   const columns = [
  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"S.No."} />,
    dataIndex: "sno",
    key: "sno",
    width: 80,
    render: (_, __, index) => <CustomText value={`${index + 1}.`} />
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Pic"} />,
    dataIndex: "productImage",
    key: "productImage",
    width: 200,
    align:"center",
    render: (text) => <div className="flex justify-center"><Image src={text } alt="product" className="!w-[40px] !h-[40px] object-cover" /></div>
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"} />,
    dataIndex: "productName",
    key: "productName",
    width: 250,
    render: (name, row) => (
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/admin/crm-all-visitors-list/${row.id}`)}
      >
        <CustomText value={name} />
      </div>
    )
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"} />,
    dataIndex: "sku",
    key: "sku",
    width: 200,
    align:"center",
    render: (sku) => <CustomText value={sku} />
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Date"} />,
    dataIndex: "date",
    key: "date",
    width: 200,
    render: (date) => <div className="flex justify-center"><CustomText value={isoToIST(date)} /></div>
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Bag / Wishlist / Recently viewed"} />,
    dataIndex: "source",
    key: "source",
    width: 250,
    render: (text) => <div className="flex justify-center"><CustomText value={text} /></div>
  },

  {
    title: <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Price"} />,
    dataIndex: "price",
    key: "price",
    width: 120,
    render: (price) => <CustomText value={`Rs. ${price}`} />
  },
];
if(isLoading) return <Loader/>

    return(
        <div className="flex flex-col gap-5">
              <CustomTable  scroll={{x:1300}}   dataSource={item} columns={columns}/>
             <CustomPagination onchange={(e)=>{setPage(e)}} setPage={setPage}/>
        </div>
    )
}
export default AllVisitorsDetailsTable;