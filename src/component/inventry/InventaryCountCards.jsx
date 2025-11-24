import { Col, Row } from "antd"
import InventaryCards from "./InventaryCard"

const InventaryCountCards=({cardData})=>{
    
    return(
        <>
        <Row gutter={[20]}>
            <Col span={4}><InventaryCards title={"Total No. of Products"} count={cardData?.totalProducts}/></Col>
            <Col span={4}><InventaryCards title={"Units Sold"} count={cardData?.unitsSold}/></Col>
            <Col span={4}><InventaryCards title={"No. of Out of Stock"} count={cardData?.outOfStock}/></Col>
            <Col span={4}><InventaryCards title={"Total Inventory Value"} count={`Rs. ${cardData?.totalInventoryValue}`}/></Col>
            <Col span={4}><InventaryCards title={"Sell-Through Rate"} count={`${cardData?.sellThroughRate} %`}/></Col>
          </Row>
        </>
    )
}
export default InventaryCountCards