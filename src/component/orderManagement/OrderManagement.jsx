import { Col, Row } from "antd";
import OrderTopButton from "./OrderTopButton";
import OnlineOrderChart from "./OrderChart";
import ProductChart from "./ProductChart";

const OrderManagement=()=>{
    return(
       <div className="flex flex-col gap-5 p-5">
          <OrderTopButton/>
           <Row gutter={[20,20]}>
            <Col span={12}>
            <div className="w-[700px]">
          <OnlineOrderChart/>
          </div>
            </Col>
            <Col span={12}>
            <div className="w-[700px]">
          <ProductChart/>
          </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <div className=" !h-[400px]">

            <OnlineOrderChart/>
            </div>
            </Col>
          </Row>
         
          
        </div>
    )
}
export default OrderManagement;