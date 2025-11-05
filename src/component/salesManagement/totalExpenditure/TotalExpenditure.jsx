
import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import TotalExpenditureFilter from "./TotalExpenditureFilter";
import TotalExpenditureTable from "./TotalExpenditureTable";

const TotalExpenditure = () => {
  const navigate = useNavigate();
  const totalSales=[
     {
    title: "Exhibition Expenses",
    value: "Rs. 45789",
  },
   {
    title: "Event Expenses",
    value: "Rs. 45789",
  },
   {
    title: "Online/Operational Expenses",
    value: "Rs. 1,00,000",
  },
  ]
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

           {totalSales?.map((item)=>{
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
        <TotalExpenditureTable />
      </div>
    </div>
  );
};
export default TotalExpenditure;
 