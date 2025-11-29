import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomImageUpload from "../../common/CustomImageUpload";
import CustomText from "../../common/CustomText";
import { Col, Image, Row } from "antd";

const MenCategory=()=>{
    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Men Carousel"}/>
            <div>
                <Row>
                    <Col span={4}>
                <CustomImageUpload imageUploadHandler={(e)=>{handleUpload(e)}} label={
            <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full bg-[#fff]">
               <PlusOutlined style={{color:"#214344",fontSize:"30px",font:"bold"}} />
            </div>}

              />
              </Col>
              {[1,2,3].map(()=>{
                return(
                    <>
                    <Col span={4}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full  bg-[#fff] ">
                        <div className="flex rounded-full relative ">
                            <div>
                          <Image preview={false} className="rounded-full p-1" src={"https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764065859079_2aad464d0c6fb8d29024853eda2cd2381eac9827.png"}/>
                        </div>
                         <div className="flex gap-2  absolute justify-center items-center top-0 bottom-0 right-0 left-0">
                            <DeleteOutlined style={{fontSize:"18px",color:"#214344" ,font:"bold"}} />
                            <EditOutlined  style={{fontSize:"18px",color:"#214344" ,font:"bold"}}/>
                         </div>
                       </div> 
                    </div>
                      <CustomText value={"Ring"}/>
                      </div> 
                    </Col>

                    </>
                )
              })
                
              }
              </Row>
            </div>
        </div>
    )
}
export default MenCategory;