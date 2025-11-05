import { Col, Row } from "antd"
import InventaryCards from "./InventaryCard"

const InventaryCountCards=()=>{
    return(
        <>
        <Row gutter={[20]}>
            <Col span={4}><InventaryCards title={"Total No. of Products"} count={"12,345"}/></Col>
            <Col span={4}><InventaryCards title={"Units Sold"} count={"67,890"}/></Col>
            <Col span={4}><InventaryCards title={"No. of Out of Stock"} count={"5"}/></Col>
            <Col span={4}><InventaryCards title={"Total Inventory Value"} count={"45789"}/></Col>
            <Col span={4}><InventaryCards title={"Sell-Through Rate"} count={"85%"}/></Col>
          </Row>
        </>
    )
}
export default InventaryCountCards