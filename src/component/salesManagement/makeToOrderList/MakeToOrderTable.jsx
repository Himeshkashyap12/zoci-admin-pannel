import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getMakeToOrderAsync } from "../../../feature/sales/salesSlice";
import { Image } from "antd";
import { isoToIST } from "../../../constants/constants";
import CustomPagination from "../../common/CustomPagination";
const MakeToOrderTable=({page,setPage})=>{
      const {makeToOrder,isLoading}=useSelector(state=>state?.sales);      
     const columns = [
                  {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
                ),
                dataIndex: "title",
                align:"center",
                key: "title",
                width: 100,
                render: (_,text_,idx) => <CustomText  value={idx+1}/>
              },
              
              {
                title: (
                  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Pic"}/>
                ),
                dataIndex: "items",
                key: "items",
                align:"center",
                width: 200,
                render: (text) => <div className="flex justify-center"> <div className="size-[70px] "><Image className="h-full w-full object-cover" src={text[0]?.image}/></div></div>
              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Order Id"}/> ),
                dataIndex: "orderId",
                key: "orderId",
                align:"center",
                width: 200,
                render: (text) =>   <CustomText value={text}/>

              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/> ),
                dataIndex: "items",
                key: "items",
                align:"center",
                width: 200,
                render: (text) =>   <CustomText value={text[0]?.sku}/>

              },
              {
                title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Exhibition /Event/Online"}/>),
                dataIndex: "eventType",
                key: "eventType",
                width: 300,
                align: "center",
                render: (text) =>  <CustomText value={text}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Contact No."}/>),
                dataIndex: "customerMobile",
                key: "customerMobile",
                width: 250,
                align: "start",
                render: (text) => <CustomText value={text}/>
              },
              
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/> ),
                dataIndex: "items",
                key: "items",
                width: 150,
                align:"center",
                render: (text) =>   <CustomText value={text[0]?.size}/>

              },
              {
                title: (
                <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Date"}/> ),
                dataIndex: "orderDate",
                key: "orderDate",
                width: 250,
                align:"center",
                render: (text) =>   <CustomText value={isoToIST(text)}/>

              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>),
                dataIndex: "items",
                key: "items",
                width: 250,
                align: "center",
                render: (text) => <CustomText value={`Rs. ${text[0]?.price}`}/>
              },
              {
                title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Order Status"}/>),
                dataIndex: "orderStatus",
                key: "orderStatus",
                width: 250,
                align: "center",
                render: (text) => <CustomText className={`${text=="Processing" && "!text-[#C99315]" || text=="Ordered" && "!text-[#088738]"}`} value={`${text}`}/>
              }
             
            ];





    if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:1800}}   dataSource={makeToOrder?.data} columns={columns}/>
               <CustomPagination
              total={makeToOrder?.pagination?.total}
              pageNumber={page}
              onchange={(e)=>{setPage(e)}}
                
            />
        </>
    )
}
export default MakeToOrderTable;