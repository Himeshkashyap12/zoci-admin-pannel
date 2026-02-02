import { Col, Image, Row } from "antd";
import filter from "../../assets/inventary/filter.png"
import sort from "../../assets/inventary/sort.png"
import CustomText from "../common/CustomText";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredDataHandler, getBlogAsync } from "../../feature/blog/blogSlice";
import { useDebounce } from "../../hooks/UseDebounce";
import Cookies from "js-cookie"
import useInfiniteScrollObserver from "../../hooks/useCustomLoading";
import CustomMultipleFilter from "../common/CustumMultipleFilter";
import { blogSort } from "./blogfilterData";
import "./blog.css"
import { toast } from "react-toastify";
const BlogFilter=()=>{
     const navigate=useNavigate();
     const  [search,setSearch]=useState("");
     const  [sort,setSort]=useState([]);     
      const token=Cookies.get("token"); 
      const {blog,isLoading}=useSelector(state=>state?.blog);
      const [isFilter,setIsFilter]=useState(false)
      const dispatch=useDispatch();
      const debouncedText = useDebounce(search, 500)

 const getBlogData=async()=>{
    try {
      const trimSearch=search.trim();
      const data={
        ...(trimSearch && { search:trimSearch }),
        ...(sort.length>0 && { [sort[0]]:sort[1] }),
          page:1,
          limit:12
      }

      if (search && !trimSearch) {
        return; 
      }
      dispatch(filteredDataHandler());
    const res=await dispatch(getBlogAsync({token,data})).unwrap();    
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
 if ((debouncedText || !search) &&  isFilter) {
  getBlogData();
 }
}, [debouncedText,sort]);





    return(
        <div className="blog">
         <Row justify={"space-between"} gutter={[40]}>
                 <Col span={8}>
                  <div className="w-[70%]">
                   <CustomInput search name={"search"} value={search} onchange={(e)=>{setSearch(e.target.value),setIsFilter(true)}} placeholder={"Search Blog"} />
                   </div>
                 </Col>
                 <Col span={16}>
                 <div className="flex gap-5 justify-end">  
                 <CustomButton onclick={()=>{navigate("/admin/add-new-blog")}} className={"!text-[#fff]"} value={"Add New Blog"}/>  
                  <CustomButton value={<div className="flex items-center gap-2">
                    <Image preview={false} className="!size-[16px]" src={filter}/>
                   <CustomMultipleFilter placeholder={"Sort"} onchange={(value)=>{setSort(value),setIsFilter(true)}} option={blogSort}/>

                       </div>}/>
                 
                 
                  </div>
              </Col>
            </Row>
        </div>
    )
}
export default BlogFilter;