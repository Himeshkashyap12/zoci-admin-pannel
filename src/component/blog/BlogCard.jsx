import { Avatar, Button, Image, Typography } from "antd"
import blog from "../../assets/blog/blog.jpg";
import blogIcon from "../../assets/blog/blogIcon2.png";
import { EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
const BlogCard=()=>{
    return(
        <>
         <div className="relative flex flex-col gap-2 bg-[#fff] rounded-2xl p-[8px]">
                <div className="">
                  <Image className="w-full h-full object-cover rounded-t-2xl" preview={false} src={blog} />
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <Typography.Text className="text-[#214344]  text-[24px] font-bold text-start">How to start initiating an startup in few How to start initiating an startup in few</Typography.Text>
                
                </div>
                <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <StarFilled  style={{color:"#F4C542",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={5.8}/>

                  </div>
                  
                   <div className="flex gap-2">
                    <EyeOutlined style={{color:"#4C7399",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={5100}/>

                  </div>
                   </div>
                   <div className="border-b-[1px] border-[#214344] "></div>
                   </div>
                   <div className="flex justify-between">
                    <div className="flex gap-2 items-center ">
                      <div className="!size-[20px]">
                  <Image className=" object-cover " preview={false} src={blogIcon} />
                  </div>
                    <CustomText className={"!text-[#000] !text-[16px] font-semibold"} value={"John Doe"}/>
                 
                    </div>
                    <div className="flex flex-col  items-center bg-[#214344] rounded-xl px-3 py-1">
                      <CustomText className={"!text-[14px] !text-[#fff]"} value={"05"}/>
                      <CustomText className={"!text-[8px] !text-[#fff]"} value={"Sep"}/>
                    </div>

                   </div>
               
                </div>
                

              </div>
        </>
    )
}
export default BlogCard;