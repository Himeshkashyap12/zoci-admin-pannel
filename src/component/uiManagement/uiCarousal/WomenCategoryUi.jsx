

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomImageUpload from "../../common/CustomImageUpload";
import CustomText from "../../common/CustomText";
import { Col, Image, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {  deleteCategoryAsync, getWomenCategoryHandlerAsync } from "../../../feature/uiManagement/UiManagementSlice";
import Loader from "../../loader/Loader";
import ImageLoader from "../../loader/ImageLoader";
import CustomModal from "../../common/CustomModal";
import CreateCategory from "./CreateCategory";
import ConfirmationPopup from "../../common/ConfirmationPopup";
import { toast } from "react-toastify";
const WoMenCategory=()=>{
    const [categoryModel,setCategoryModel]=useState(false);
    const [deleteId,setDeleteId]=useState();
     const dispatch=useDispatch();
    const token=Cookies.get("token");
    const {womenCategory,isLoading}=useSelector(state=>state?.ui);
    const [editData,setEditData]=useState({})
    
    const getCategory=async()=>{
        try {
            const data={madeFor:"Women"}
            const res=await dispatch(getWomenCategoryHandlerAsync({token,data})).unwrap();
            
        } catch (error) {
            console.log(error);
            
        }
    }

 const deleteCategoryHandler=async()=>{
        try {
            const res=await dispatch(deleteCategoryAsync({token,id:deleteId})).unwrap();
            if(res.success){

            
             toast.success("Category deleted succefully");
             getCategory();
             setCategoryModel(false)
             setDeleteId(null)

            } 
        } catch (error) {
            console.log(error);
            
        }
    }
    const editHandler=async(item)=>{
       setEditData(item);
       setCategoryModel(true);
       
    }

    const deleteHandler=(id)=>{
    setCategoryModel(true);
    setDeleteId(id)
    }
        useEffect(()=>{
             getCategory();
        },[]);
        if(isLoading) return <ImageLoader/>
    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Women Carousel"}/>
            <div>
                <Row>
                    <Col span={4}>
               
            <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full bg-[#fff]" onClick={()=>{setCategoryModel(true),setEditData(null)}}>
               <PlusOutlined style={{color:"#214344",fontSize:"30px",font:"bold"}} />
            </div>
              </Col>
              {womenCategory?.categories?.map((item)=>{
                return(
                    <>
                    <Col span={4}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex justify-center items-center h-[150px] w-[150px]     ">
                        <div className="flex  rounded-full relative ">
                            <div className="rounded-full ">
                          <Image preview={false} className="rounded-full " src={item?.images?.categoryImage}/>
                        </div>
                         <div className="flex gap-2  absolute justify-center items-center top-0 bottom-0 right-0 left-0">
                           <div  className="cursor-pointer" onClick={()=>{deleteHandler(item?._id)}}> <DeleteOutlined style={{fontSize:"18px",color:"#214344" ,font:"bold"}} /></div>
                           <div onClick={()=>{editHandler(item)}}  className="cursor-pointer"> <EditOutlined  style={{fontSize:"18px",color:"#214344" ,font:"bold"}}/></div>
                         </div>
                       </div> 
                    </div>
                      <CustomText className={"!text-[#214344]"} value={item?.title}/>
                      </div> 
                    </Col>

                    </>
                )
              })
                
              }
              </Row>
            </div>
            <CustomModal closeIcon  footer={false} setOpen={setCategoryModel} open={categoryModel} modalBody={deleteId?<ConfirmationPopup setDeleteId={setDeleteId} setDeleteConfirm={setCategoryModel} confirmationPopUpHandler={deleteCategoryHandler}/>:<CreateCategory setEditData={setEditData} editData={editData} setOpen={setCategoryModel}  madeFor={"Women"}/>} width={"800px"}  align={"center"}/>

        </div>
    )
}
export default WoMenCategory;