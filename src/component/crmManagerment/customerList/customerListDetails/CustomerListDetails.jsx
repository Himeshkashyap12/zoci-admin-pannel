
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../../common/CustomText";
import CrmCustomerDetails from "../../CrmCustomerDetails";
import CustomerListDetailTable from "./CustomerListDetailTable";

const CustomerListDetails = () => {
  const navigate = useNavigate();
 
  return (
    <div className="flex flex-col gap-10 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/crm");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={`CRM → Customer List→ ${"customer-name"}`}
        />
      </div>
     
      <div>
        <CrmCustomerDetails/>
      </div>
      <div className="pt-10">
        <CustomerListDetailTable/>
      </div>
    </div>
  );
};
export default CustomerListDetails;
