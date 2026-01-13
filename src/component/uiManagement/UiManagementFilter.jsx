import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import "./ui.css";
import { uiFilterData } from "./uiFilterData";
const UiManagementFilter = ({ search, setSearch, setSortFilter }) => {
  return (
    <div className="ui">
      <Row justify={"space-between"} gutter={[40]}>
        <Col span={8}>
          <div className="w-[70%]">
            <CustomInput
              search
              onchange={(e) => {
                setSearch(e.target.value);
              }}
              name={"search"}
              value={search}
              placeholder={"Search Collection"}
            />
          </div>
        </Col>

        <Col span={16}>
          <div className="flex gap-5 justify-end">
            <CustomButton
              value={
                <div className="flex items-center gap-2">
                  <Image
                    preview={false}
                    className="!size-[16px]"
                    src={filter}
                  />
                  <CustomMultipleFilter
                    placeholder={"Sort"}
                    onchange={(value) => {
                      setSortFilter(value);
                    }}
                    option={uiFilterData}
                  />
                </div>
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default UiManagementFilter;
