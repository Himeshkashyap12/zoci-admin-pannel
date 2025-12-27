import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInShipRocketAsync } from "../../../feature/order/orderSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import CreateOrderAtShipRocket from "./CreateOrderAtShipRocket";
const AddOrderToShipRocket = () => {
  const navigate = useNavigate();
  const disptch = useDispatch();
  const shiprocketToken = Cookies.get("shipRocketToken");
  const loginShipRocket = async () => {
    try {
      const data = {
        email: import.meta.env.VITE_SHIPROCKET_EMAIL,
        password: import.meta.env.VITE_SHIPROCKET_PASSWORD,
      };
      const res = await disptch(logInShipRocketAsync({ data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!shiprocketToken) {
      loginShipRocket();
    }
  }, []);
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/order");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Order Management → Manage Online Orders"}
        />
      </div>
      <div>
        <CreateOrderAtShipRocket/>
      </div>
    </div>
  );
};
export default AddOrderToShipRocket;
