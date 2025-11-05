


import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import SalesCard from "../SalesCard";
import { Col, Row } from "antd";
import OnlineSalesFilter from "./OnlineSalesFilter";
import OnlineSalesTable from "./OnlineSalesTable";

const OnlineSaleList = () => {
  const navigate = useNavigate();
 
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
        <OnlineSalesFilter />
      </div>
      <div>
        <OnlineSalesTable />
      </div>
    </div>
  );
};
export default OnlineSaleList;
