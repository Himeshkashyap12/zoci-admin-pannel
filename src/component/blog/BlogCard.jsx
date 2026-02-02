import { Image, Typography } from "antd"
import blogIcon from "../../assets/blog/blogIcon2.png";
import { CloseOutlined, EditOutlined, EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import { blogDateConverter } from "../../constants/constants";
import CustomModal from "../common/CustomModal";
import { useState } from "react";
import ConfirmationPopup from "../common/ConfirmationPopup";
import { deleteBlogAsync, filteredDataHandler, getBlogAsync } from "../../feature/blog/blogSlice";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
const BlogCard=({item,page})=>{ 
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const navigate=useNavigate();
  const [blogModel,setBlogModel]=useState(false);
   const deleteConfirmBlogHandler=async()=>{
          try {
              const res=await dispatch(deleteBlogAsync({token,id:item?.id})).unwrap();
                  toast.success(res?.message);
                  setBlogModel(false);
                  const data={limit:12,page:page};
                  if(page==1){
                    dispatch(filteredDataHandler());
                  }
                  dispatch(getBlogAsync({token,data}))
          } catch (error) {
             
              toast.error("Something went wrong. Please try again.");
                  setBlogModel(false)
              
          }
       }
       const editHandler=()=>{
           navigate('/admin/add-new-blog', { state: item });
       }
    return(
        <>
         <div className="relative flex flex-col gap-2 bg-[#fff] rounded-2xl p-[8px] cursor-pointer">
                <div className="flex justify-center" onClick={()=>{navigate(`/admin/blog/${item?.id}`)}} > 
                  <Image  className="!max-w-[1200px] !h-[200px] object-cover  rounded-t-xl"
                                preview={false}
                                 src={item?.image} />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    <Typography.Text className="text-[#214344]  !text-[16px] font-bold text-start">{item?.title}</Typography.Text>
                
                </div>
                <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2">
                    <StarFilled  style={{color:"#F4C542",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={item?.rating}/>

                  </div>
                  
                   <div className="flex gap-2">
                    <EyeOutlined style={{color:"#4C7399",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={item?.views}/>
                  </div>
                   <div className="flex gap-2 cursor-pointer" onClick={()=>{editHandler()}} >
                     <EditOutlined style={{fontSize:"18px" ,color:"#4C7399"}} />
                  </div>
                   </div>
                   <div className="border-b-[1px] border-[#214344] "></div>
                   </div>
                   <div className="flex justify-between">
                    <div className="flex gap-2 items-center ">
                      <div className="!size-[20px]">
                   <Image className=" object-cover " preview={false} src={blogIcon} />
                  </div>
                    <CustomText className={"!text-[#000] !text-[16px] font-semibold"} value={item?.author}/>  
                 
                    </div>
                    <div className="flex flex-col  items-center bg-[#214344] rounded-xl px-3 py-1">
                      <CustomText className={"!text-[14px] !text-[#fff]"} value={blogDateConverter(item?.date)[0]}/>
                      <CustomText className={"!text-[8px] !text-[#fff]"} value={blogDateConverter(item?.date)[1]}/>
                    </div>

                   </div>
               
                </div>
                <div onClick={()=>{setBlogModel(true)}}  className="absolute right-2">
                  <CloseOutlined  style={{color:"#214344" ,fontSize:"24px", padding:"2px"}}/>
                </div>
                
            <CustomModal closeIcon  footer={false} setOpen={setBlogModel} open={blogModel} modalBody={<ConfirmationPopup  confirmationPopUpHandler={deleteConfirmBlogHandler} setDeleteConfirm={setBlogModel} /> } width={"800px"}  align={"center"}/>

              </div>
        </>
    )
}
export default BlogCard;