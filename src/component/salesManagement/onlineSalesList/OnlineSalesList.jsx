


import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import OnlineSalesFilter from "./OnlineSalesFilter";
import OnlineSalesTable from "./OnlineSalesTable";
import { useDispatch, useSelector } from "react-redux";
import { getOnlineSalesList } from "../../../feature/sales/salesSlice";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useDebounce } from "../../../hooks/UseDebounce";
const OnlineSaleList = () => {
      const navigate = useNavigate();
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
       const [page,setPage]=useState(1);
       const [search,setSearch]=useState("");
       const debounce=useDebounce(search,500);
       const [filter,setFilter]=useState([])
       const [sort,setSort]=useState([])
      const {onlineSales}=useSelector(state=>state?.sales);
            
        const getOnlineSalesListHandler=async()=>{
          const trimSearch=search.trim();
          const data={
            limit:10,
            page:page,
            ...(search && {search:trimSearch} ),
            ...(sort?.length>0 && {[sort[0]]:sort[1]} ),
            ...(filter?.length>0 && {[filter[0]]:filter[1]} ),

          }

          try {
            if(search && !trimSearch) return ;
          const res=await dispatch(getOnlineSalesList({token,data})).unwrap();
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(()=>{
        getOnlineSalesListHandler();
        },[page,filter,sort,debounce])
 
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/sales");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Sales Reports → Online  Sales List"}
        />
      </div>
     
      <div>
        <OnlineSalesFilter setSearch={setSearch} setFilter={setFilter} setSort={setSort} />
      </div>
      <div>
        <OnlineSalesTable onlineSales={onlineSales} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
export default OnlineSaleList;
