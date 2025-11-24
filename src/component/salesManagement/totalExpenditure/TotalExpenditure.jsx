
import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import TotalExpenditureFilter from "./TotalExpenditureFilter";
import TotalExpenditureTable from "./TotalExpenditureTable";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { getTotalExpenditureAsync } from "../../../feature/sales/salesSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
const TotalExpenditure = () => {
  const navigate = useNavigate();
  const token=Cookies.get("token");
    const dispatch=useDispatch();
      const {totalExpenditure,isLoading}=useSelector(state=>state?.sales);            
            const totalExpenditureHandler=async()=>{
              try {
              const res=await dispatch(getTotalExpenditureAsync({token})).unwrap();
              } catch (error) {
                console.log(error);
              }
            }
          const totalExpenditureCards=[
            {
            title: "Exhibition Expenses",
            value: `Rs. ${totalExpenditure?.totals?.exhibitionExpenses}`,
          },
          {
            title: "Event Expenses",
            value: `Rs. ${totalExpenditure?.totals?.eventExpenses}`,
          },
          {
            title: "Online/Operational Expenses",
            value: `Rs. ${totalExpenditure?.totals?.onlineExpenses}`,
          },
          ]

    useEffect(()=>{
                totalExpenditureHandler();
              },[]);

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
          value={"Sales Reports → Total Expenditure"}
        />
      </div>
      <div>
        <Row gutter={[10]}>

           {totalExpenditureCards?.map((item)=>{
            return(
                <Col span={8}>
             <SalesCard item={item}/>
            </Col>
            )
           }) }
       
        </Row>
      </div>
      <div>
        <TotalExpenditureFilter />
      </div>
      <div>
        <TotalExpenditureTable item={totalExpenditure?.data} />
      </div>
    </div>
  );
};
export default TotalExpenditure;
 