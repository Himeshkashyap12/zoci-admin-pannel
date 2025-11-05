





import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import OfflineSalesFilter from "./OfflineSalesFilter";
import OfflineSalesTable from "./OfflineSalesTable";

const OfflineSalesList = () => {
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
          value={"Sales Reports → Offline Sales List"}
        />
      </div>
     
      <div>
        <OfflineSalesFilter />
      </div>
      <div>
        <OfflineSalesTable />
      </div>
    </div>
  );
};
export default OfflineSalesList;
