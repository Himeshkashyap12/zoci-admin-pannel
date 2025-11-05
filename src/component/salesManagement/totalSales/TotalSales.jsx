import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import ToTalSalesFilter from "./TotalSalesFilter";
import TotalSalesTable from "./TotalSalesTable";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";

const TotalSales = () => {
  const navigate = useNavigate();
  const totalSales=[
     {
    title: "Exhibition Sales",
    value: "Rs. 45789",
  },
   {
    title: "Event Sales",
    value: "Rs. 45789",
  },
   {
    title: "Online Sales",
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
          value={"Sales Reports → Total Sales"}
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
        <ToTalSalesFilter />
      </div>
      <div>
        <TotalSalesTable />
      </div>
    </div>
  );
};
export default TotalSales;
