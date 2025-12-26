import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomImageUpload from "../../common/CustomImageUpload";
import CustomText from "../../common/CustomText";
import { Col, Image, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {  deleteCategoryAsync, getMenCategoryHandlerAsync } from "../../../feature/uiManagement/UiManagementSlice";
import ImageLoader from "../../loader/ImageLoader";
import CustomModal from "../../common/CustomModal";
import CreateCategory from "./CreateCategory";
import ConfirmationPopup from "../../common/ConfirmationPopup";
import { toast } from "react-toastify";
const MenCategory=()=>{
    const [categoryModel,setCategoryModel]=useState(false);
     const [deleteId,setDeleteId]=useState();
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const [editData,setEditData]=useState(null)
    const {menCategory,isLoading}=useSelector(state=>state?.ui);
    
    const getCategory=async()=>{
        try {
            const data={madeFor:"Men"}
            const res=await dispatch(getMenCategoryHandlerAsync({token,data})).unwrap();
            
            
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
                setCategoryModel(false);
                getCategory();
                setDeleteId(null)
               }
               
   
               
           } catch (error) {
               console.log(error);
               
           }
       }
   
       const deleteHandler=(id)=>{
        setEditData(null)
       setCategoryModel(true);
       setDeleteId(id)
       }
   const editHandler=(item)=>{
    setDeleteId(null);
     setEditData(item);
     setCategoryModel(true);
   }

        useEffect(()=>{
             getCategory();
        },[])
        if(isLoading) return <ImageLoader/>

    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Men Carousel"}/>
            <div>
                <Row>
                    <Col span={4}>
            <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full bg-[#fff]" onClick={()=>{setCategoryModel(true),setDeleteId(null),setEditData(null)}}>
               <PlusOutlined style={{color:"#214344",fontSize:"30px",font:"bold"}} />
            </div>

             
              </Col>
              {menCategory?.categories?.map((item)=>{
                return(
                    <>
                    <Col span={4}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full  bg-[#fff] ">
                        <div className="flex rounded-full relative ">
                            <div>
                          <Image preview={false} className="rounded-full object-cover" src={item?.images?.categoryImage}/>
                        </div>
                         <div className="flex gap-2  absolute justify-center items-center top-0 bottom-0 right-0 left-0">
                            <div className="cursor-pointer" onClick={()=>{deleteHandler(item?._id)}}><DeleteOutlined style={{fontSize:"18px",color:"#214344" ,font:"bold"}} /></div>
                            <div onClick={()=>{editHandler(item)}}  className="cursor-pointer"><EditOutlined  style={{fontSize:"18px",color:"#214344" ,font:"bold"}}/></div>
                         </div>
                       </div> 
                    </div>
                      <CustomText value={item?.title}/>
                      </div> 
                    </Col>

                    </>
                )
              }) 
              }
              </Row>
            </div>
            <CustomModal closeIcon  footer={false} setOpen={setCategoryModel} open={categoryModel} modalBody={deleteId?<ConfirmationPopup setDeleteId={setDeleteId} setDeleteConfirm={setCategoryModel} confirmationPopUpHandler={deleteCategoryHandler}/>:<CreateCategory setEditData={setEditData} editData={editData} setOpen={setCategoryModel}  madeFor={"Men"}/>} width={"800px"}  align={"center"}/>
        </div>
    )
}
export default MenCategory;