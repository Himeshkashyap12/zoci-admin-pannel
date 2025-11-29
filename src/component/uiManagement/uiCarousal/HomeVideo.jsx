import { Image } from "antd";
import CustomText from "../../common/CustomText";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const HomeVideo=()=>{
    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Home Page Video Slider"}/>
            <div className=" !h-[200px] !w-[100%] ">
                        <video className="h-full w-full object-cover rounded-2xl"  src={"https://zoci-data.s3.ap-south-1.amazonaws.com/common/zoci+Sequence+01_1.mp4"} muted autoPlay  />
             </div>
             <div className="absolute right-5 top-16" >
                <div className="flex gap-4">
                  <div>  <PlusOutlined style={{fontSize:"20px",font:"900"}} /></div>
                   <div> <DeleteOutlined style={{fontSize:"20px",font:"bold"}} /></div>
                   <div> <EditOutlined style={{fontSize:"20px",font:"bold"}} /></div>
                </div>
             </div>
        </div>
    )
}
export default HomeVideo;