import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAsync, getInventaryDashbordAsync } from "../../feature/inventaryManagement/inventarySlice.js";
import Loader from "../loader/Loader.jsx";
import { dataExportInExcelHandler } from "./constants.jsx";
import InventaryCountCards from "./InventaryCountCards.jsx";
import InventaryTable from "./InventaryTable.jsx";
import InventaryTopButton from "./InventaryTopButton";
import ProductList from "./ProductList.jsx";
import UnitSoldByCategary from "./UnitSoldByCategary";
import UnitSoldChart from "./UnitSoldChart";
import { useDebounce } from "../../hooks/UseDebounce.jsx";

const Inventary=()=>{
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const token=Cookies.get("token");
  const [search,setSearch]=useState("");
  const [filterKey,setFilter]=useState([])
  const [sortKey,setSort]=useState([]);
  const [page,setPage]=useState(1)
  const debouncedText = useDebounce(search, 500);  
  const dispatch=useDispatch();
  const {inventaryDashboard,isDashboardLoading}=useSelector(state=>state?.inventary);
  
  const getInventary=async()=>{
    try {
    const res=await dispatch(getInventaryDashbordAsync({token})).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

const exportProductHandler = async () => {
    const data = { productIds: selectedRowKeys };
    dataExportInExcelHandler({dispatch,token,data})
};


 const getAllProducts=async()=>{
  const trimSearch=search.trim();
  const data={
    page:page,
       ...(trimSearch && { search:trimSearch }),
       ...(sortKey?.length>0 && { sort:sortKey[0] }),
       ...(filterKey?.length>0 && { [filterKey[0]]:filterKey[1] }),
  }
  if (search && !trimSearch) {
    return; 
  }
    try {
    const res=await dispatch(getAllProductAsync({token,data})).unwrap();
    } catch (error) {
      console.log(error);

    }
  }
  
  useEffect(() => {
   getAllProducts();
}, [debouncedText,filterKey,sortKey,page]);
  useEffect(()=>{
     getInventary();
  },[])
  if(isDashboardLoading) return  <Loader/>
    return(
        <div className="flex flex-col gap-5 p-5">
          <InventaryTopButton totalVendor={inventaryDashboard?.vendor?.totalVendors}/>
          <Row gutter={[20,20]}>
            <Col span={12} >
            <div className=" !w-auto">
          <UnitSoldChart unitSold={inventaryDashboard?.charts?.unitSold}/>
          </div>
            </Col>
            <Col span={12}>
            <div className=" !w-auto">
          <UnitSoldByCategary unitSoldByCategory={inventaryDashboard?.charts?.unitSoldByCategory}/>
          </div>
            </Col>
          </Row>
          <InventaryCountCards cardData={inventaryDashboard?.cards}/>
          <ProductList setPage={setPage} filterKey={filterKey} sortKey={sortKey} setFilter={setFilter} setSearch={setSearch} setSort={setSort} exportProductHandler={exportProductHandler}/>
          <InventaryTable setPage={setPage} page={page} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>
          
        </div>
    )
}
export default Inventary;