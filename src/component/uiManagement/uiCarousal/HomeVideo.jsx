import { Image, Skeleton } from "antd";
import CustomText from "../../common/CustomText";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomModal from "../../common/CustomModal";
import AddVideoModel from "./AddVideoModel";
import { useState } from "react";
import ImageLoader from "../../loader/ImageLoader";
import PaginationLoader from "../../loader/PaginationLoader";

const HomeVideo=({homeVideos})=>{
    const [videoLoading,setVideoLoading]=useState(true)
    const [VideoModel,setVideoModel]=useState(false);
    const bannerVideo=homeVideos?.data?.filter((item)=> item?.title=="BannerVideo")    
    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Home Page Video Slider"}/>
            <div className=" !h-[200px] !w-[100%] ">
                      {videoLoading && (
                        <div className="!bg-[#fff]">
                            <Skeleton.Node active={true} className="!w-[100%]  !h-[200px]" />
                            </div>  
                        )}
                        <video
                         onLoadStart={() => {setVideoLoading(true)}}
                         onLoadedData={() =>{ setVideoLoading(false)}}
                        className="h-full w-full object-cover rounded-2xl"  src={bannerVideo?.[0]?.videoUrl} muted autoPlay  />
             </div>
             <div className="absolute right-5 top-16" >
                <div className="flex gap-4">
                  {/* <div className="cursor-pointer" onClick={()=>{setVideoModel(true)}}>  <PlusOutlined style={{fontSize:"20px",font:"900"}} /></div> */}
                   {/* <div> <DeleteOutlined style={{fontSize:"20px",font:"bold"}} /></div> */}
                   <div onClick={()=>{setVideoModel(true)}}> <EditOutlined style={{fontSize:"20px",font:"bold"}} /></div>
                </div>
             </div>
         <CustomModal closeIcon   footer={false} setOpen={setVideoModel} open={VideoModel} modalBody={<AddVideoModel bannerVideo={bannerVideo} setOpen={setVideoModel} open={VideoModel}/> } width={"800px"}  align={"center"}/>


        </div>
        
    )
}
export default HomeVideo;