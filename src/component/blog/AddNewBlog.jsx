import { useNavigate } from "react-router-dom";
import CustomText from "../common/CustomText";
import { CloseOutlined, LeftOutlined, UploadOutlined } from "@ant-design/icons";
import CustomInput from "../common/CustomInput";
import { Button, Col, Image, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import blogUpload from "../../assets/icons/blogUpload.png";
import CustomImageUpload from "../common/CustomImageUpload";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import CustomButton from "../common/CustomButton";
import CustomModal from "../common/CustomModal";
import BlogPreviewModel from "./BlogPreviewModel";
import { createBlogAsync } from "../../feature/blog/blogSlice";
const AddNewBlog=()=>{
    const [previewModel,setPreviewModel]=useState(false)
    const [imageUrl, setImageUrl] = useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {isMediaLoading}=useSelector(state=>state?.media)
    const {isLoading}=useSelector(state=>state?.blog)
    const token=Cookies.get("token");
    const [newBlogInput,setNewBlogInput]=useState({
        title:"",
        description:"",
        image:""
    })

    const handleUpload = async (e) => {
    const file = e.target.files[0];
      if (!file) return;
            try {
            const formData = new FormData();
            formData.append("productImages", file);
            const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
            if(res.message){
                toast.success(res?.message)
                setImageUrl(res?.images[0]);
                setNewBlogInput({...newBlogInput,image:res?.images[0]})
            }
            } catch (err) {
            console.error(err);
          }
    };


    const createBlogHandler=async()=>{
        if(!newBlogInput?.title || !newBlogInput?.description || !newBlogInput?.image) return toast.error("Please fill all field")
        try {
            const data={
                ...newBlogInput
            }
            const res=await dispatch(createBlogAsync({token,data})).unwrap();
            console.log(res);
            if(res.status=="success"){
            toast.success("Blog created successfully");
            navigate("/admin/blog")
            }
            
          
            
            
        } catch (error) {
            
        }

    }
   if(isLoading || isMediaLoading) return <Loader/>
    return(
        <>
         <div className="flex flex-col gap-5 p-[24px]  ">
            <div className="flex gap-2 items-center">
                <div className="cursor-pointer" onClick={()=>{navigate("/admin/inventary")}}>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={<LeftOutlined />}/>
                </div>
                <CustomText className={"!text-[#214344] !text-[20px]"} value={"Blog Management→ Add New Blog "}/>
            </div>
           <div className="form flex flex-col gap-10 w-[90%] mx-auto pt-[90px]">
            <div className="flex flex-col gap-4">
                <CustomText className={"!text-[#214344] !text-[16px] font-semibold"} value={"Blog Title"}/>
                <CustomInput placeholder={"Blog Title"} name={"title"} value={newBlogInput?.title} onchange={(e)=>{setNewBlogInput({...newBlogInput,title:e.target.value})}}  className={"rounded-full "}/>
            </div>
           <Row gutter={30}>
                <Col span={12}>
                <div className="flex flex-col gap-4 w-full">
                <CustomText className={"!text-[#214344] !text-[16px] font-semibold"} value={"Description"}/>
                <TextArea placeholder="Blog Description" className="!rounded-md !h-[500px] !w-full "  name={"description"} value={newBlogInput?.description} onChange={(e)=>{setNewBlogInput({...newBlogInput,description:e.target.value})}} />
            </div>
                </Col>
                <Col span={12}>
                <div className="flex flex-col gap-4 w-full">
                <CustomText className={"!text-[#214344] !text-[16px] font-semibold"} value={"Blog Image"}/>
                <div className="bg-[#fff] !rounded-md  !w-full !h-[500px] flex justify-center items-center">
               {!imageUrl? <CustomImageUpload imageUploadHandler={handleUpload}   label={<div className="flex flex-col gap-3 items-center cursor-pointer ">
                   <Image preview={false} className="!size-[30px]" src={blogUpload}/>
                <CustomText className={"!text-[#4C7399] !text-[24px] font-bold"} value={"Tap to upload Image"}/>
                <CustomText className={"!text-[#4C7399] text-[16px] "} value={"JPG, PNG up to 5 MB"}/>
                </div>}/>:<div onClick={()=>{setImageUrl(null)}} className="relative cursor-pointer">
                    <Image preview={false} className="!h-[400px] !w-full object-cover rounded-xl" src={imageUrl}/>
                    <div className="absolute -top-3 -right-3 rounded-full border-[2px] border-[#214344] "><CloseOutlined  style={{color:"#214344" ,fontSize:"24px", padding:"2px"}}/></div>
                    </div>}
                   
                </div>

                </div>
                
                </Col>
            </Row>

           </div>
           <div className="flex justify-center gap-5 pt-10">
            <CustomButton onclick={()=>{setPreviewModel(true)}} value={"Preview"} className={"!bg-[#214344] !text-[#fff] w-[250px]"}/>
            <Button onClick={()=>{createBlogHandler()}} className="rounded-full w-[250px] border-[2px] !border-[#214344] !bg-[#EFE6DC]">Submit</Button>
           </div>
                </div>
            <CustomModal closeIcon  footer={false} setOpen={setPreviewModel} open={previewModel} modalBody={<BlogPreviewModel setPreviewModel={setPreviewModel} newBlogInput={newBlogInput} />} width={"490px"}  align={"center"}/>

     
        </>
    )

}
export default AddNewBlog;