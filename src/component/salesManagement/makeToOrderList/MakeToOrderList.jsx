import { useNavigate } from "react-router-dom";
import CustomText from "../../common/CustomText";
import { LeftOutlined } from "@ant-design/icons";
import MakeToOrderTable from "./MakeToOrderTable";
import MakeToOrderFilter from "./MakeToOrderFilter";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getMakeToOrderAsync } from "../../../feature/sales/salesSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/UseDebounce";
import { makeToOrderSalesExport } from "../constants";
const MakeToOrderList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState([]);
  const debounce = useDebounce(search, 500);
  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState([]);

  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const getMakeToOrdeHandler = async () => {
    const trimSearch = search.trim();
    const data = {
      limit: 10,
      page: page,
      ...(search && { search: trimSearch }),
      ...(sort?.length > 0 && { [sort[0]]: sort[1] }),
      ...(filter?.length > 0 && { [filter[0]]: filter[1] }),
      ...(date?.length > 0 &&
        date[0] != "" && { startDate: date[0], endDate: date[1] }),
    };
    try {
      if (search && !trimSearch) return;
      const res = await dispatch(getMakeToOrderAsync({ token, data })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // exportMakeToOrderSales

  const exportMakeToOrderSales = async () => {
    const data = {
      ...(search && { search: trimSearch }),
      ...(sort?.length > 0 && { [sort[0]]: sort[1] }),
      ...(filter?.length > 0 && { [filter[0]]: filter[1] }),
      ...(date?.length > 0 &&
        date[0] != "" && { startDate: date[0], endDate: date[1] }),
    };
    makeToOrderSalesExport({ dispatch, token, data });
  };

  useEffect(() => {
    getMakeToOrdeHandler();
  }, [debounce, sort, filter, date]);

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
          value={"Sales Reports → Make to order List"}
        />
      </div>
      <div>
        <MakeToOrderFilter
          exportMakeToOrderSales={exportMakeToOrderSales}
          setDate={setDate}
          date={date}
          setFilter={setFilter}
          setSearch={setSearch}
          setSort={setSort}
          setPage={setPage} 
          filterKey={filter} 
          sortKey={sort}

        />
      </div>
      <div>
        <MakeToOrderTable setPage={setPage} page={page} />
      </div>
    </div>
  );
};
export default MakeToOrderList;
