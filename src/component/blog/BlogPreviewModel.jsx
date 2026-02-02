

import { CloseCircleOutlined } from "@ant-design/icons";
import { Image, Typography } from "antd";
import blogIcon from "../../assets/blog/blogIcon2.png";
import CustomText from "../common/CustomText";
const BlogPreviewModel=({newBlogInput,setPreviewModel})=>{
  const date = new Date();
  
    return(
        <>
         <div className="relative flex flex-col gap-2 bg-[#fff] rounded-2xl p-[8px]">
                <div className="">
                  <Image className="w-full h-full object-cover rounded-t-2xl" preview={false} src={newBlogInput?.image} />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-5">
                    <Typography.Text className="!text-[#000]  !text-[24px] font-bold text-start">{newBlogInput?.title.slice(0,1)?.toUpperCase()+newBlogInput?.title?.slice(1)}</Typography.Text>
                   <div className="max-h-[200px] overflow-auto">
                    <Typography.Text className="!text-[#4C7399]  !text-[16px]  text-start">{newBlogInput?.description}</Typography.Text>
                </div>
                </div>
               
                   <div className="flex justify-between">
                    <div className="flex gap-2 items-center ">
                      <div className="!size-[20px]">
                  <Image className=" object-cover " preview={false} src={blogIcon} />
                  </div>
                    <CustomText className={"!text-[#000] !text-[16px] font-semibold"} value={"Admin"}/>
                 
                    </div>
                    <div className="flex flex-col  items-center bg-[#214344] rounded-xl px-2 py-1">
                      <CustomText className={"!text-[14px] font-semibold !text-[#fff]"} value={date.toLocaleString('en-US', { month: 'short' })}/>
                      <CustomText className={"!text-[14px] !text-[#fff]"} value={date?.getDate()}/>
                    </div>

                   </div>
               
                </div>
                <div className="absolute -top-4 -right-3 cursor-pointer" onClick={()=>{setPreviewModel(false)}}>
                    <CloseCircleOutlined style={{fontSize:"40px",color:"#214344"}} />

                </div>
                

              </div>
        </>
    )
}
export default BlogPreviewModel;