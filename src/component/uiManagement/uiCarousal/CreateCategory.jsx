


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
import { useEffect, useState } from "react";
import { createCategoryAsync, editCategoryAsync, getMenCategoryHandlerAsync, getWomenCategoryHandlerAsync } from "../../../feature/uiManagement/UiManagementSlice";
import { compareNewAndOldObject } from "../../../constants/constants";
const CreateCategory = ({ setOpen,madeFor,editData,setEditData}) => {    
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const navigate=useNavigate();
  const {isMediaLoading}=useSelector(state=>state?.media);
  const {isLoading}=useSelector(state=>state?.ui);
  const [category, setCategory] = useState({
            title: "",
            images:{categoryImage:""}
  });
 
 const CreateCategoryHandler=async()=>{
       try {
        if(!editData){
         const data={...category,madeFor:madeFor}
         const res=await dispatch(createCategoryAsync({token,data})).unwrap();
         if(res.success){
            setOpen(false);
            toast.success(res.message);
             const data={madeFor:madeFor}
             if(madeFor=="Men"){
            dispatch(getMenCategoryHandlerAsync({token,data}))
             }else{
            dispatch(getWomenCategoryHandlerAsync({token,data}))
             }
        }
        }else{
        const updatedData=compareNewAndOldObject({oldObj:editData,newObj:category})
         const res=await dispatch(editCategoryAsync({token,updatedData,id:editData?._id})).unwrap();
         if(res.success){
            setOpen(false);
            setEditData(null);
            toast.success(res.message);
             const data={madeFor:madeFor}
             if(madeFor=="Men"){
            dispatch(getMenCategoryHandlerAsync({token,data}))
             }else{
            dispatch(getWomenCategoryHandlerAsync({token,data}))
             }
        }
        }
      
       } catch (error) {
        console.log(error);
        setOpen(false);
        toast.error("Something Went Wrongx`!") 
       }
 }
 
const handleUpload = async (e) => {
    const file = e.target.files[0];
      if (!file) return;
            try {
            const formData = new FormData();
            formData.append("productImages", file);
            const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
            if(res.message){
                toast.success(res?.message)
                setCategory({...category,images:{categoryImage:res?.images[0]}});
                
               
            }
            } catch (err) {
            console.error(err);
          }
    };
       

    useEffect(()=>{
        if(editData){
        setCategory({
             title: editData?.title,
            images:{categoryImage:editData?.images?.categoryImage}
        })}else{
           setCategory({
            title: "",
            images:{categoryImage:""}
           }) 
        }
    },[editData])


  return (
    <div>
      <div className="flex justify-center">
        <CustomText
          className={"text-[14px] font-bold "}
          value={`Add ${madeFor} Category`}
        />
      </div>
      <div className="flex flex-col gap-5 pt-10">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[16px] font-semibold !text-[#214344]"}
                value={"Category Name"}
              />
              <CustomInput
              value={category?.title}
                onchange={(e)=>{setCategory({...category,title:e.target.value})}}
                placeholder={"Enter Category Name"}
                name={"title"}
                className={"h-[46px]"}
              />
            </div>
          </Col>
         
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[16px] font-semibold !text-[#214344]"}
                value={"Category Image"}
              />
               {isMediaLoading?<ImageLoader/>:<CustomImageUpload  imageUploadHandler={handleUpload} label={
             !category?.images?.categoryImage?  <div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                </div> :<div className="h-[200px] !w-[200px]"><Image className="!w-[100%] object-cover" preview={false} src={category?.images?.categoryImage}/>  </div>  
             }
              />}
             
            </div>
          </Col>
        </Row>

        <div className="flex justify-center gap-4 pt-10">
          <CustomButton
          onclick={()=>{CreateCategoryHandler()}}
            className={"!text-[#fff] !bg-[#214344] w-[180px]"}
            value={isLoading?"Loading...":`Yes, ${editData?"Edit":"Add"} New Collection`}
          />
          <Button
            onClick={() => {
              setOpen(false),setEditData(null);
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
export default CreateCategory;
