import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import NetProfitFilter from "./NetProfitFilter";
import NetProfitTable from "./NetProfitTable";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getNetProfitAsync } from "../../../feature/sales/salesSlice";
import Loader from "../../loader/Loader";
import { useEffect } from "react";
const NetProfit = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { netProfit, isLoading } = useSelector((state) => state?.sales);
  console.log(netProfit,"netProfit");
  
  const getNetProfitHanler = async () => {
    try {
      const res = await dispatch(getNetProfitAsync({ token })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const totalNetProfit = [
    {
      title: "Total Revenue",
      value: `Rs. ${netProfit?.cards?.totalRevenue}`,
    },
    {
      title: "Event Expenses",
      value: `Rs. ${netProfit?.cards?.totalExpenditure}`,
    },
    {
      title: "Net Profit",
      value: `Rs. ${netProfit?.cards?.netProfit}`,
    },
  ];
  useEffect(() => {
    getNetProfitHanler();
  }, []);

  if (isLoading) return <Loader />;
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
          {totalNetProfit?.map((item) => {
            return (
              <Col span={8}>
                <SalesCard item={item} />
              </Col>
            );
          })}
        </Row>
      </div>
      <div>
        <NetProfitFilter />
      </div>
      <div>
        <NetProfitTable item={netProfit} />
      </div>
    </div>
  );
};
export default NetProfit;
