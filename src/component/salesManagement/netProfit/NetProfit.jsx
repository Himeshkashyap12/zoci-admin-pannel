// const NetProfit=()=>{
//     return(
//         <>
//         NetProfit
//         </>
//     )
// }
// export default NetProfit


import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import NetProfitFilter from "./NetProfitFilter";
import NetProfitTable from "./NetProfitTablle";

const NetProfit = () => {
  const navigate = useNavigate();
  const totalSales=[
     {
    title: "Total Revenue",
    value: "Rs. 45789",
  },
   {
    title: "Event Expenses",
    value: "Rs. 45789",
  },
   {
    title: "Net Profit",
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
          value={"Sales Reports → Net Profit"}
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
        <NetProfitFilter />
      </div>
      <div>
        <NetProfitTable />
      </div>
    </div>
  );
};
export default NetProfit;
