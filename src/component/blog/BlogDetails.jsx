


import { Button, Col, Image, Input, Row, Typography } from "antd";
import {  useNavigate, useParams } from "react-router";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailsAsync } from "../../feature/blog/blogSlice";
import { isoToIST } from "../../constants/constants";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import Loader from "../loader/Loader";
const BlogDetails = () => {
    const navigate=useNavigate()
    const {id}=useParams();
    const token=Cookies.get("token");
    const dispatch=useDispatch(); 
    const {blogDetails,isLoading}=useSelector(state=>state?.blog);
    const getBlogDetails=async()=>{
            try {
             const res=await dispatch(getBlogDetailsAsync({token,id})).unwrap();
                } catch (error) {
                  toast.error("Something went wrong. Please try again.");  
                }
            }
        
      useEffect(()=>{
        getBlogDetails();
      },[id]);
 
  
  if(isLoading) return <Loader/>
  return (
    <div className="  w-full">
         <div className=" flex p-5 gap-3   bg-[#EEE5DB] ">
             <div
          className="cursor-pointer"
          onClick={() => {
            navigate("/admin/blog");
          }}
        >
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={<LeftOutlined />}
          />
        </div>
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Blog → Blog Details"}
        />
      </div>
      <Row>
        <Col span={24}>
         
         
      <div className="p-5">
            <Row gutter={[40, 40]}>
              <Col xxl={18} xl={18} sm={24} xs={24}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-5 rounded-xl">
                    <div className="flex flex-col gap-2">
                        <Typography.Text className="text-[16px] font-[300] text-[#6B7280]">{isoToIST(blogDetails?.createdAt)}</Typography.Text>
                        <Typography.Text className="text-[20px] font-[400] text-[#6B7280]">Delight your customers with this!</Typography.Text>
                    </div>
                    <div className="flex justify-center">
                      <Image
                         className="!max-w-[1200px] !h-[500px] object-cover  rounded-t-xl"
                                preview={false}
                                src={blogDetails?.image}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                     <Typography.Text className="text-[30px] font-bold text-[#214344]">{blogDetails?.title}</Typography.Text>
                     <Typography.Text className="text-[16px]  text-[#6B7280]">{blogDetails?.description}</Typography.Text>

                  </div>
                </div>
              </Col>
              <Col xxl={6} xl={6} sm={24} xs={24}>
                <div className="flex flex-col gap-5">
                  {/* <PopularPost /> */}
                  {/* <Follow /> */}
                </div>
              </Col>
            </Row>
          </div>
          <div className="bg-[#fff] md:px-20 px-5  py-10">
           <div className=" flex flex-col gap-3">
            <Typography.Text className="text-[16px] font-bold text-[#214344]">Comments</Typography.Text>
            <Typography.Text className="text-[12px] font-[300] text-[#214344]">{blogDetails?.comments?.length} Comments</Typography.Text>
            <div className="border-[1px] border-b-[#214344] "></div>
          {blogDetails?.comments?.map((item)=>{
            return(
               <div className="flex max-sm:flex-col gap-4">
                <div className="w-[5%]">
                <div className="size-[70px] ">
                    {/* <Image preview={false}  src={comment} className="rounded-full  "/> */}
                    <div className="bg-[#EEE5DB] size-[60px] flex justify-center items-center rounded-full">
                      <Typography.Text className="!text-[#214344] text-[16px] font-bold">{(item?.name?.slice(0,1)).toUpperCase()}</Typography.Text>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-2 w-[95%]">
                    <div className="flex flex-wrap justify-between">
                        <Typography.Text className="text-[16px] font-bold text-[#214344]">{item?.name}</Typography.Text>
                        <Typography.Text >{isoToIST(item?.createdAt)}</Typography.Text>
                    </div>
                    <div>
                        <Typography.Text className="text-[14px]  text-[#555555]">
                           {item?.comment}
                        </Typography.Text>
                    </div>
                </div>
            </div>

            )
          }) }
           
           
            
           </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default BlogDetails;
