





import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import BlogFilter from "./BlogFilter";
import BlogCard from "./BlogCard";
import { Col, Row } from "antd";

const Blog = () => {
  const navigate = useNavigate();
 
  return (
    <div className="flex flex-col gap-5 p-[24px]">
      <div className="flex gap-2 items-center">
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Blog Management"}
        />
      </div>
     
      <div>
        {/* <BirthdayReminderFilter /> */}
        <BlogFilter/>
      </div>
      <div>
        <Row gutter={[20,20]}>
            {[1,2,3,4,5,6].map(()=>{
                return(
                    <>
                    <Col span={6}>
                           <BlogCard/>

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
