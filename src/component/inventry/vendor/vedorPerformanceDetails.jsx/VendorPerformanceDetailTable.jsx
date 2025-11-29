

import { useEffect, useState } from "react";
import { Avatar, Image, Space } from "antd";
import CustomText from "../../../common/CustomText";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProductAsync, getAllProductAsync } from "../../../feature/inventaryManagement/inventarySlice";
import Cookies from "js-cookie";
import deleteIcon from "../../../../assets/icons/deleteIcon.png"
import CustomModal from "../../../common/CustomModal";
import ConfirmationPopup from "../../../common/ConfirmationPopup";
import { toast } from "react-toastify";
import Loader from "../../../loader/Loader";
import CustomTable from "../../../common/CustomTable";

const VendorPerformanceDetailTable=({setSelectedRowKeys,selectedRowKeys,item})=>{
    console.log(item);
    
  const [deleteConfirm,setDeleteConfirm]=useState();
  const [deleteId,setDeleteId]=useState(null);
const {isLoading}=useSelector(state=>state?.inventary)
  
 
  const confirmationPopUpHandler=async()=>{
    try {
      const res=await dispatch(deleteProductAsync({token,id:deleteId})).unwrap();
      if(res?.success){
        getAllProducts()
      }
      debugger
      console.log(res);
      
      if(res.success){
        toast.success(res?.message);
        setDeleteConfirm(false)

      }else{
        toast.error(res?.message);
        setDeleteConfirm(false)


      }

      
      
    } catch (error) {
      console.log(error);
        toast.error(error?.message);

        setDeleteConfirm(false)

      
    }
     
  }



  
     const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 100,
      render: (_,record,idx) =>  <CustomText className={  " "} value={idx+1}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Image"}/>
      ),
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (text) => <div className="flex justify-center"> <Image className="!size-[50px]" src={text?.productImage}/></div>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"}/>

      ),
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/>

      ),
      dataIndex: "sku",
      key: "sku",
      width: 150,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>,
      dataIndex: "size",
      key: "size",
      width: 130,
      render: (text) =>   <CustomText value={text??"Na"}/>
    },
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>
      ),
      dataIndex: "price",
      key: "price",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={`Rs. ${text}`}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Available Qut."}/>),
      dataIndex: "quantity",
      key: "quantity",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Metal Type"}/>),
      dataIndex: "metalType",
      key: "metalType",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text??"NA"}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Vendor"}/>),
      dataIndex: "vendor",
      key: "vendor",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={text??"NA"}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Stock"}/>),
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
      width: 180,
      render: (text) =>  <CustomText value={text!=0?"In Stock":"Out Of Stock"}/>

     
    },
     {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>),
      dataIndex: "action",
      align: "center",
      key: "action",
      width: 130,
      render: (_, record) => (
        <Space size="middle">
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => {
              setDeleteConfirm(true),setDeleteId(record?._id);
            }}
          >
            <img src={deleteIcon} alt="deleteIcon"/>
          </div>
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={()=>{navigate("/admin/create-product",{state:record})}}
          >
            <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
          </div>
        </Space>
      ),
     
    },
  ];

 const selectTableRowHandler = productKey => {
    setSelectedRowKeys(productKey);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: selectTableRowHandler,
  };
  if(isLoading) return <Loader/>
    return(
        <>
        <CustomTable   scroll={{x:1700}} rowSelection={rowSelection}  dataSource={item} columns={columns}/>
            <CustomModal  footer={false} setOpen={setDeleteConfirm} open={deleteConfirm} modalBody={<ConfirmationPopup confirmationPopUpHandler={confirmationPopUpHandler} setDeleteConfirm={setDeleteConfirm} />} width={"552px"} align={"center"}/>
        
        </>
    )
}
export default VendorPerformanceDetailTable;