import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import BlogFilter from "./BlogFilter";
import BlogCard from "./BlogCard";
import { Col, Row } from "antd";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogAsync } from "../../feature/blog/blogSlice";
import Loader from "../loader/Loader";
const Blog = () => {
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const {blog,isLoading}=useSelector(state=>state?.blog);
      const {isMediaLoading} =useSelector(state=>state?.media)
      console.log(blog,"bestSeller");
  
  const getBlogData=async()=>{
    try {
    const res=await dispatch(getBlogAsync({token})).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
   getBlogData();
  },[])

  if(isMediaLoading) return <Loader/>
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Blog Management"}
        />
      </div>
     
      <div>
        <BlogFilter/>
      </div>
      <div>
        <Row gutter={[20,20]}>
            {blog?.blogs?.map((item)=>{
                return(
                    <>
                    <Col span={6}>
                           <BlogCard item={item}/>

                    </Col>

                    </>
                )
            })}
        </Row>
        {/* <BirthdayReminderTable /> */}
      </div>
    </div>
  );
};
export default Blog;
