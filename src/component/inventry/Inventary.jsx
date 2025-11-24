import { Col, Row } from "antd";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import InventaryTopButton from "./InventaryTopButton";
import UnitSoldChart from "./UnitSoldChart";
import UnitSoldByCategary from "./UnitSoldByCategary";
import ChangeProductPrice from "./ChangeProductPrice.jsx";
import InventaryCountCards from "./InventaryCountCards.jsx";
import ProductList from "./ProductList.jsx";
import InventaryTable from "./InventaryTable.jsx";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {  getInventaryDashbordAsync } from "../../feature/inventaryManagement/inventarySlice.js";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader.jsx";

const Inventary=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const token=Cookies.get("token");  
  const dispatch=useDispatch();
  const {inventaryDashboard,isDashboardLoading}=useSelector(state=>state?.inventary);
  
  const getInventary=async()=>{
    try {
    const res=await dispatch(getInventaryDashbordAsync({token})).unwrap();
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(()=>{
     getInventary();
  },[])
  if(isDashboardLoading) return  <Loader/>
    return(
        <div className="flex flex-col gap-5 p-5">
          <InventaryTopButton totalVendor={inventaryDashboard?.vendor?.totalVendors}/>
          <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-[700px]">
          <UnitSoldChart unitSold={inventaryDashboard?.charts?.unitSold}/>
          </div>
            </Col>
            <Col span={12}>
            <div className="w-[700px]">
          <UnitSoldByCategary unitSoldByCategory={inventaryDashboard?.charts?.unitSoldByCategory}/>
          </div>
            </Col>
          </Row>
          <InventaryCountCards cardData={inventaryDashboard?.cards}/>
          {/* <ChangeProductPrice/> */}
          <ProductList selectedRowKeys={selectedRowKeys}/>
          <InventaryTable selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>
          
        </div>
    )
}
export default Inventary;