import { Button, Col, Image, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CustomText from "../common/CustomText";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { createCollectionAsync } from "../../feature/uiManagement/UiManagementSlice";
import Loader from "../loader/Loader";
import CustomImageUpload from "../common/CustomImageUpload";
import { UploadOutlined } from "@ant-design/icons";
import blogUpload from "../../assets/icons/blogUpload.png"
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import { toast } from "react-toastify";
const AddNewCollection = ({ setOpen }) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const {isMediaLoading}=useSelector(state=>state?.media)
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });
  const {isLoading}=useSelector(state=>state?.ui)
  const collectionHandler = (e) => {
    const { name, value, files, type } = e.target;

  };
const handleUpload = async (e) => {
    const file = e.target.files[0];
      if (!file) return;
            try {
            const formData = new FormData();
            formData.append("productImages", file);
            const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
            if(res.message){
                toast.success(res?.message)
                setCollection({...collection,thumbnail:res?.images[0]});
               
            }
            } catch (err) {
            console.error(err);
          }
    };


   if(isLoading) return <Loader/>

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
               {isMediaLoading?<Loader imageLoader/>:<CustomImageUpload  imageUploadHandler={handleUpload} label={
             !collection?.thumbnail?  <div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                </div> :<div className="h-[200px] !w-[200px]"><Image className="!w-[100%] object-cover" preview={false} src={collection?.thumbnail}/>  </div>  
             }
              />}
             
            </div>
          </Col>
        </Row>

        <div className="flex justify-center gap-4 pt-10">
          <CustomButton
          onclick={()=>{createNewCollectionHandler()}}
            className={"!text-[#fff] !bg-[#214344] w-[180px]"}
            value={"Yes, Add New Vendor"}
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
