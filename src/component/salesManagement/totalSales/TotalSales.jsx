import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import ToTalSalesFilter from "./TotalSalesFilter";
import TotalSalesTable from "./TotalSalesTable";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getTotalSalesAsync } from "../../../feature/sales/salesSlice";
import { useEffect } from "react";
import Loader from "../../loader/Loader";
const TotalSales = () => {
  const navigate = useNavigate();
     const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {totalSales,isLoading}=useSelector(state=>state?.sales);
            
            const getTotalSalesHandler=async()=>{
              try {
              const res=await dispatch(getTotalSalesAsync({token})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
            const totalSalesCard=[
              {
              title: "Exhibition Sales",
              value: `Rs. ${totalSales?.totals?.exhibitionSales}`,
            },
            {
              title: "Event Sales",
              value: `Rs. ${totalSales?.totals?.eventSales}`,
            },
            {
              title: "Online Sales",
              value: `Rs. ${totalSales?.totals?.onlineSales}`,
            },
            ]
            useEffect(()=>{
              getTotalSalesHandler();
            },[])
  if(isLoading) return <Loader/>
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
          value={"Sales Reports → Total Sales"}
        />
      </div>
      <div>
        <Row gutter={[10]}>

           {totalSalesCard?.map((item)=>{
            return(
                <Col span={8}>
             <SalesCard item={item}/>
            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <ToTalSalesFilter  />
      </div>
      <div>
        <TotalSalesTable  totalSales={totalSales?.data}/>
      </div>
    </div>
  );
};
export default TotalSales;
