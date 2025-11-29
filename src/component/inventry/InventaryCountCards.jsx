import { Col, Row } from "antd"
import InventaryCards from "./InventaryCard"

const InventaryCountCards=({cardData})=>{
    
    return(
        <>
        <Row gutter={[20,20]}>
            <Col xxl={4} xl={6} md={12} sm={24} xs={24}><InventaryCards title={"Total No. of Products"} count={cardData?.totalProducts}/></Col>
            <Col  xxl={4} xl={6} md={12} sm={24} xs={24}><InventaryCards title={"Units Sold"} count={cardData?.unitsSold}/></Col>
            <Col  xxl={4} xl={6} md={12} sm={24} xs={24}><InventaryCards title={"No. of Out of Stock"} count={cardData?.outOfStock}/></Col>
            <Col  xxl={4} xl={6} md={12} sm={24} xs={24}><InventaryCards title={"Total Inventory Value"} count={`Rs. ${cardData?.totalInventoryValue}`}/></Col>
            <Col  xxl={4} xl={6} md={12} sm={24} xs={24}><InventaryCards title={"Sell-Through Rate"} count={`${cardData?.sellThroughRate} %`}/></Col>
          </Row>
        </>
    )
}
export default InventaryCountCards