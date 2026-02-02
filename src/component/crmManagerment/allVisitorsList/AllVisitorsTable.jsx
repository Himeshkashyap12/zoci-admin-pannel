import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getAllVisitorsAsync } from "../../../feature/crm/crmSlice";
import {EyeOutlined } from "@ant-design/icons";
import Loader from "../../loader/Loader";
import { isoToIST } from "../../../constants/constants";
import CustomPagination from "../../common/CustomPagination";
const AllVisitorsTable=({page,setPage})=>{
  const navigate=useNavigate();
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const {allvisitors,isLoading}=useSelector(state=>state?.crm);

     
        const columns = [
            {
          title: (
            <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
          ),
          dataIndex: "title",
          key: "title",
          width: 100,
          render: (_,text,idx) => <CustomText  value={idx+1}/>
        },
        
        {
          title: (
            <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Name"}/>
          ),
          dataIndex: "name",
          key: "name",
          width: 200,
          render: (text) =>  <CustomText value={text??"-"}/>
        },
          {
          title: (
            <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"WhatsApp Number"}/>  ),
          dataIndex: "mobile",
          key: "mobile",
          width: 250,
          render: (text) =>  <CustomText value={text}/>
        },
        {
          title: (
          <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Date"}/> ),
          dataIndex: "createdAt",
          key: "createdAt",
          width: 200,
          render: (text) =>  <CustomText value={isoToIST(text)}/>
        },
        {
          title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Bag"}/>,
          dataIndex: "bag",
          key: "bag",
          width: 130,
          align:"center",
          render: (text) =>   <CustomText value={text?.length}/>
        },
        {
          title: (
                    <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Wishlist"}/>
          ),
          dataIndex: "wishlist",
          key: "wishlist",
          width: 200,
          align: "center",
          render: (text) =>  <CustomText value={text?.length}/>
        },
        
      
         {
          title: (
                    <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Item in Wishlist"}/>
          ),
          dataIndex: "wishlist",
          key: "wishlist",
          width: 300,
          align: "start",
           render: (text) => ( text?.length==0?"-": text?.map((item,idx)=>{     
              return `${item}${text.length-1==idx?"":", "}`
          }))
        },
        {
          title: (
                    <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Item in Bag"}/>
          ),
          dataIndex: "bag",
          key: "bag",
          width: 300,
          align: "start",
          render: (text) =>  ( text?.length==0?"-":text?.map((item,idx)=>{
              return `${item}${text.length-1==idx?"":", "}`
          }  ))
        },
        {
          title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>),
          dataIndex: "metalType",
          key: "metalType",
          width: 200,
          align: "center",
          render: (_,text) => <div className="cursor-pointer" onClick={()=>{navigate(`/admin/crm-all-visitors-list/${text?._id}`)}}><EyeOutlined style={{fontSize:"20px"}} /></div>
        }
      ];
       
  if(isLoading) return <Loader/>
  
    return(
        <>
              <CustomTable scroll={{x:1800}} dataSource={allvisitors?.data} columns={columns}/>
        <CustomPagination pageNumber={page} total={allvisitors?.total} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default AllVisitorsTable;