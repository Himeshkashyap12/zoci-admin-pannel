import { Button, Col, Image, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import CustomImageUpload from "../../common/CustomImageUpload";
import blogUpload from "../../../assets/icons/blogUpload.png"
import { getImageUrlAsync } from "../../../feature/media/mediaSlice";
import { toast } from "react-toastify";
import ImageLoader from "../../loader/ImageLoader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getHomeVideosAsync, updateHomeVideoAsync } from "../../../feature/uiManagement/UiManagementSlice";
const AddVideoModel = ({ setOpen,bannerVideo}) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const {isLoading}=useSelector(state=>state?.ui);
  const [uploadeFle,setUploadFile]=useState(null);
  const [previewfile,setPreviewFile]=useState(null);
const handleUpload = async (e) => {
     const file = e.target.files[0];
     setUploadFile(file)
     const videoUrl = URL.createObjectURL(file);
     setPreviewFile(videoUrl)
     };
    const uploadVideoHandler=async()=>{
       try {
        const formData=new FormData();
        console.log(uploadeFle);
        
        formData.append("video",uploadeFle);
        const res= await dispatch(updateHomeVideoAsync({token,id:bannerVideo?.[0]?._id,formData})).unwrap();
        if(res?.success){
          toast.success(res.message);
          dispatch(getHomeVideosAsync({token}))
          setOpen(false);
          
        }
        console.log(res,"dsfbdshb");
                
      } catch (error) {
        console.log(error);
        
      }

    }
       

    

  return (
    <div>
      <div className="flex justify-center">
        <CustomText
          className={"text-[14px] font-bold "}
          value={`Add  New Carousel Item`}
        />
      </div>
      <div className="flex flex-col gap-5 pt-10">
        <Row gutter={[20, 20]}>
          <Col span={24}>
           
          </Col>
         
          <Col span={24}>
            <div className="flex flex-col gap-2">
              {/* <CustomText
                className={"text-[16px] font-semibold !text-[#214344]"}
                value={"Category Image"}
              /> */}
               {isLoading?<ImageLoader/>:<CustomImageUpload  imageUploadHandler={handleUpload} label={
             bannerVideo?.lenght>0?  <div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                </div> :<div className="h-[200px] !w-[200px]">
                  
                        <video className="h-full w-full object-cover rounded-2xl"  src={previewfile??bannerVideo?.[0]?.videoUrl} muted autoPlay  />
                  
                  </div>  
             }
              />}
             
            </div>
          </Col>
        </Row>

        <div className="flex justify-center gap-4 pt-10">
          <CustomButton
          onclick={()=>{uploadVideoHandler()}}
            className={"!text-[#fff] !bg-[#214344] w-[180px]"}
            value={isLoading?"Loading...":"Yes, Add New Collection"}
          />
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]"
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddVideoModel;
