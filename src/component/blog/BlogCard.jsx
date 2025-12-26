import { Avatar, Button, Image, Typography } from "antd"
import blog from "../../assets/blog/blog.jpg";
import blogIcon from "../../assets/blog/blogIcon2.png";
import { EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import { blogDateConverter } from "../../constants/constants";
const BlogCard=({item})=>{  
    return(
        <>
         <div className="relative flex flex-col gap-2 bg-[#fff] rounded-2xl p-[8px]">
                <div className="flex justify-center">
                  <Image className="!w-full !h-[200px] object-cover justify-center rounded-t-2xl" preview={false} src={item?.image} />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    <Typography.Text className="text-[#214344]  !text-[16px] font-bold text-start">{item?.title}</Typography.Text>
                
                </div>
                <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <StarFilled  style={{color:"#F4C542",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={item?.rating}/>

                  </div>
                  
                   <div className="flex gap-2">
                    <EyeOutlined style={{color:"#4C7399",fontSize:"24px"}} />
                    <CustomText className={"!text-[#4C7399] font-bold"} value={item?.views}/>

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
                

              </div>
        </>
    )
}
export default BlogCard;