import { Col, Row } from "antd";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import InventaryTopButton from "./InventaryTopButton";
import UnitSoldChart from "./UnitSoldChart";
import UnitSoldByCategary from "./UnitSoldByCategary";
import InventaryCards from "./InventaryCard";
import CustomSelect from "../common/CustomSelect.jsx";
import CustomInput from "../common/CustomInput.jsx";
import {PlusOutlined} from '@ant-design/icons';
import ChangeProductPrice from "./ChangeProductPrice.jsx";
import InventaryCountCards from "./InventaryCountCards.jsx";
import ProductList from "./ProductList.jsx";
import InventaryTable from "./InventaryTable.jsx";
const Inventary=()=>{
    return(
        <div className="flex flex-col gap-5 p-5">
          <InventaryTopButton/>
          <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-[700px]">
          <UnitSoldChart/>
          </div>
            </Col>
            <Col span={12}>
            <div className="w-[700px]">
          <UnitSoldByCategary/>
          </div>
            </Col>
          </Row>
          <InventaryCountCards/>
          <ChangeProductPrice/>
          <ProductList/>
          <InventaryTable/>
          
        </div>
    )
}
export default Inventary;