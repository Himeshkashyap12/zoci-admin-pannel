
import { Col, Empty, Row } from "antd";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredDataHandler, getBlogAsync } from "../../feature/blog/blogSlice";
import useInfiniteScrollObserver from "../../hooks/useCustomLoading";
import CustomText from "../common/CustomText";
import PaginationLoader from "../loader/PaginationLoader";
import BlogCard from "./BlogCard";
import BlogFilter from "./BlogFilter";
const Blog = () => {
      const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const [page,setPage]=useState(1)
      const {blog,isLoading}=useSelector(state=>state?.blog);
      const {isMediaLoading} =useSelector(state=>state?.media);
      const [hasMore,setHasMore]=useState(true)

 const getBlogData=async()=>{
    try {
      const data={page:page,limit:12};
      if(page==1){
        dispatch(filteredDataHandler())
      }
    const res=await dispatch(getBlogAsync({token,data})).unwrap();    
          const receivedCount = res?.blogs?.length ?? 0;
        if (receivedCount < 12) setHasMore(false);
    } catch (error) {
      // toast.error("Something went wrong. Please try again.");
    }
  }


  useEffect(() => {
    getBlogData();
  }, [page]);


  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((p) => p + 1);
  }, [isLoading, hasMore]);

  // sentinel ref
  const sentinelRef = useInfiniteScrollObserver(loadMore, { rootMargin: "50px" });


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
            {blog?.length==0 ?<div className="flex justify-center w-full"><Empty/></div>:blog?.map((item)=>{
                return(
                    <>
                    <Col xxl={6} xl={8} md={8} sm={12} xs={24}>
                           <BlogCard page={page}  item={item}/>
                    </Col>
                    </>
                )
            })}
        </Row>
       {isLoading && <PaginationLoader/>}
      <div ref={sentinelRef} style={{ height: 1 }} />

    </div>
    </div>
  );
};
export default Blog;

