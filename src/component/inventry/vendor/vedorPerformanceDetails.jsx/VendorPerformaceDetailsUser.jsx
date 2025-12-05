import { Col, Row } from "antd";
import VendorPerformanceUserColoumn from "./VendorPerformanceUserColoumn";
import CustomButton from "../../../common/CustomButton";

const VendorPerformanceDetailUsers=({item})=>{    
    return(
        <Row>
            <Col span={12}>
                <div>
                    <VendorPerformanceUserColoumn name={"Vendor Name:" } value={item?.name}/>
                    <VendorPerformanceUserColoumn name={"Company Name:" } value={item?.companyName}/>
                    <VendorPerformanceUserColoumn name={"GST No. :" } value={item?.gstNumber}/>
                    <VendorPerformanceUserColoumn name={"Phone No." } value={item?.phoneNumber}/>
                </div>
            </Col>
        </Row>
    )
}
export default VendorPerformanceDetailUsers;