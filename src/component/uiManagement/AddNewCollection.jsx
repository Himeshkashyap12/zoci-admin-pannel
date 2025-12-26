import { Button, Col, Image, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { collectionDataHandler, createCollectionAsync, getCollectionAsync, updateColllectionAsync } from "../../feature/uiManagement/UiManagementSlice";
import CustomImageUpload from "../common/CustomImageUpload";
import blogUpload from "../../assets/icons/blogUpload.png"
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import { toast } from "react-toastify";
import ImageLoader from "../loader/ImageLoader";
import { compareNewAndOldObject } from "../../constants/constants";
const AddNewCollection = ({ setOpen,editItem }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const {isMediaLoading}=useSelector(state=>state?.media)
      const [collection, setCollection] = useState({
                  name: "",
                  description: "",
                  thumbnail: "",
                  bannerImage:""
      });
      
        const {isLoading}=useSelector(state=>state?.ui)
        const collectionHandler = (e) => {
          const {name,value}=e.target;
        setCollection({...collection,[name]:value})
        };

  const createCollectionHandler=async()=>{
     try {
      if(!editItem){
         const data={...collection}
      const res=await dispatch(createCollectionAsync({token,data})).unwrap();
      if(res.success){
        dispatch(collectionDataHandler())
        dispatch(getCollectionAsync({token}))
        toast.success(res.message);
        setOpen(false);
        setCollection({
            name: "",
            description: "",
            thumbnail: "",
            bannerImage:""
        });

      }

      }else{
         
    const updatedData=compareNewAndOldObject({oldObj:editItem,newObj:collection})
         const data={...updatedData}
      const res=await dispatch(updateColllectionAsync({token,data,id:editItem?._id})).unwrap();
      if(res.success){
        dispatch(collectionDataHandler())
        dispatch(getCollectionAsync({token}))
        toast.success(res.message);
        setOpen(false);
        setCollection({
           name: "",
            description: "",
            thumbnail: "",
            bannerImage:""
        })
      }
      }
     
    } catch (error) {
      console.log(error);
      setOpen(false);
      toast.error("Something went wrong")
      
    }
  }
    const handleUpload = async (e) => {      
    const file = e.target.files[0];
          if (!file) return;
                try {
                  const WIDTH = 657;
                  const HEIGHT = 438;
                  const img = new window.Image();
                   img.src = URL.createObjectURL(file);
                    img.onload = async() => {
                  const { naturalWidth: width, naturalHeight: height } = img;
                  
                  if (width == WIDTH || height ==HEIGHT) {
                      const formData = new FormData();
                formData.append("productImages", file);
                const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
                if(res.message){
                    toast.success(res?.message)
                    setCollection({...collection,thumbnail:res?.images[0]}); 
                } 
                  } else {
                    toast.error(`Image dimensions must be at least ${WIDTH}x${HEIGHT}px. Current dimensions: ${width}x${height}px.`);
                    e.target.value = null; // Clear the input
                  }
                  URL.revokeObjectURL(img.src); // Clean up the local URL
                };
                } catch (err) {
                console.error(err);
              }
        };
         const handleBannerImageUpload = async (e) => {      
        const file = e.target.files[0];
          if (!file) return;
                try {
                  const WIDTH = 1440;
                  const HEIGHT = 234;
                  const img = new window.Image();
                   img.src = URL.createObjectURL(file);
                    img.onload = async() => {
                  const { naturalWidth: width, naturalHeight: height } = img;
                  
                  if (width == WIDTH || height ==HEIGHT) {
                      const formData = new FormData();
                formData.append("productImages", file);
                const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
                if(res.message){
                    toast.success(res?.message)
                    setCollection({...collection,bannerImage:res?.images[0]}); 
                } 
                  } else {
                    toast.error(`Image dimensions must be at least ${WIDTH}x${HEIGHT}px. Current dimensions: ${width}x${height}px.`);
                    e.target.value = null; // Clear the input
                  }
                  URL.revokeObjectURL(img.src); // Clean up the local URL
                };

                
                } catch (err) {
                console.error(err);
              }
        };
            useEffect(()=>{
              if(editItem){
                setCollection(
                  {
                    name: editItem?.name,
                    description:editItem?.description,
                    thumbnail: editItem?.thumbnail,
                    bannerImage:editItem?.bannerImage
                  }
                )

              }else{
                setCollection(
                  {
                    name: "",
                    description:"",
                    thumbnail:"",
                    bannerImage:""
                  }
                )
              }
            },[editItem])


  return (
    <div>
      <div className="flex justify-center">
        <CustomText
          className={"text-[14px] font-bold "}
          value={"Add New Collection"}
        />
      </div>
      <div className="flex flex-col gap-5 pt-10">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[16px] "}
                value={"Collection Name"}
              />
              <CustomInput
                onchange={(e) => {
                  collectionHandler(e);
                }}
                value={collection?.name}
                placeholder={"Enter Collection Name"}
                name={"name"}
                className={"h-[46px]"}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText className={"text-[16px] "} value={"Description"} />
              <TextArea
                name="description"
                onChange={(e) => {
                  collectionHandler(e);
                }}
                value={collection?.description}
                placeholder="Enter Description"
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[16px] "}
                value={"Collection Image"}
              />
               {isMediaLoading?<ImageLoader/>:<CustomImageUpload  imageUploadHandler={handleUpload} label={
             !collection?.thumbnail?  <div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"Image Size should be 700px * 438px"}/>
              
                </div> :<div className="h-[200px] !w-[200px]"><Image className="!w-[100%] object-cover" preview={false} src={collection?.thumbnail}/>  </div>  
             }
              />}
             
            </div>
          </Col>
           <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[16px] "}
                value={"Banner Image"}
              />
               {isMediaLoading?<ImageLoader/>:<CustomImageUpload  imageUploadHandler={handleBannerImageUpload} label={
             !collection?.bannerImage?  <div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"Image Size should be 1440px * 238px"}/>
                </div> :<div className="h-[200px] !w-[200px]"><Image className="!w-[100%] object-cover" preview={false} src={collection?.bannerImage}/>  </div>  

             }
              />}
             
            </div>
          </Col>
        </Row>

        <div className="flex justify-center gap-4 pt-10">
          <CustomButton
          onclick={()=>{createCollectionHandler()}}
            className={"!text-[#fff] !bg-[#214344] w-[180px]"}
            value={isLoading?"Loading...":`Yes, ${editItem?"Edit":"Add"} New Collection`}
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
export default AddNewCollection;
