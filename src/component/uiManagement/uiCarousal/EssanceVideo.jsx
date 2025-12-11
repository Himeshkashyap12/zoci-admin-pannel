import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import { Col, Image, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {  deleteCategoryAsync, deleteHomeVideoAsync, getHomeVideosAsync, getMenCategoryHandlerAsync } from "../../../feature/uiManagement/UiManagementSlice";
import ImageLoader from "../../loader/ImageLoader";
import CustomModal from "../../common/CustomModal";
import CreateCategory from "./CreateCategory";
import ConfirmationPopup from "../../common/ConfirmationPopup";
import { toast } from "react-toastify";
import AddVideoModel from "./AddVideoModel";
import PaginationLoader from "../../loader/PaginationLoader";
const EssanceVideo=()=>{
    const [essanceModel,setEssanceModel]=useState(false);
       const [videoLoading,setVideoLoading]=useState(false); 
     const [deleteId,setDeleteId]=useState(null);
     const [deleted,setDeleted]=useState(false);
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const [editData,setEditData]=useState({})
    const [edit,setEdit]=useState(false)
    const {homeVideos,isLoading} =useSelector(state=>state?.ui);
    const essanceVideo=homeVideos?.data?.filter(item=>item?.title!="BannerVideo")
    
    const getEssanceVideos=async()=>{
        try {
            
            const res=await dispatch(getHomeVideosAsync({token})).unwrap();
            
            
        } catch (error) {
            console.log(error);
            
            
        }
    }
    const deleteEssanceHandler=async()=>{
           try {
               const res=await dispatch(deleteHomeVideoAsync({token,id:deleteId})).unwrap();
               
                toast.success("Essance Video deleted succefully");
                getEssanceVideos();
                setEssanceModel(false)
                 setDeleted(false)
               
           } catch (error) {
               console.log(error);
               
           }
       }
   
       const deleteHandler=(id)=>{
       setEssanceModel(true);
       setDeleted(true)
       setDeleteId(id)
       }
   const editHandler=(item)=>{
     setEditData(item);
     setEssanceModel(true);
     setEdit(true)
   }

        useEffect(()=>{
             getEssanceVideos();
        },[])
        if(isLoading) return <ImageLoader/>

    return(
        <div className="flex flex-col gap-3 relative">
            <CustomText className={"!text-[#214344] font-[400] !text-[20px]"} value={"Essance Videos"}/>
            <div>
                <Row>
                    <Col span={4}>
            <div className="flex justify-center items-center h-[150px] w-[150px]  rounded-full bg-[#fff]" onClick={()=>{setEssanceModel(true)}}>
               <PlusOutlined style={{color:"#214344",fontSize:"30px",font:"bold"}} />
            </div>

             
              </Col>
              {essanceVideo?.map((item)=>{
                return(
                    <>
                    <Col span={4}>
                    <div className="flex flex-col gap-2 justify-center items-center">
                    <div className="flex justify-center items-center rounded-full   bg-[#fff] ">
                        <div className="flex  relative h-[150px] w-[150px] ">
                            <div>
                                 {videoLoading && (
                        <div className="!bg-[#fff]">
                            <PaginationLoader /> 
                            </div>  
                        )}
                          <video
                         onLoadStart={() => {setVideoLoading(true)}}
                         onLoadedData={() =>{ setVideoLoading(false)}}
                        className="h-full w-full object-cover rounded-full"  src={item?.videoUrl} muted autoPlay  />
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
            <CustomModal closeIcon  footer={false} setOpen={setEssanceModel} open={essanceModel} modalBody={deleted?<ConfirmationPopup setDeleted={setDeleted} setDeleteConfirm={setEssanceModel} confirmationPopUpHandler={deleteEssanceHandler}/>:<AddVideoModel edit={edit} setEdit={setEdit} setDeleted={setDeleted} setDeleteId={setDeleteId} essance={true} bannerVideo={[editData]}   setOpen={setEssanceModel} open={essanceModel} editData={editData}/> } width={"800px"}  align={"center"}/>


        </div>
    )
}
export default EssanceVideo;