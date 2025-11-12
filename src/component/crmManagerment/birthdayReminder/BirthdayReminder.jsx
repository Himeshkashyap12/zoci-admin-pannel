





import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import BirthdayReminderFilter from "./BirthdayReminderFilter";
import BirthdayReminderTable from "./BirthdayReminderTable";

const BirthdayReminder = () => {
  const navigate = useNavigate();
 
  return (
    <div className="flex flex-col gap-5 p-[24px]">
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
          value={"CRM → Birthday Reminders"}
        />
      </div>
     
      <div>
        <BirthdayReminderFilter />
      </div>
      <div>
        <BirthdayReminderTable />
      </div>
    </div>
  );
};
export default BirthdayReminder;
