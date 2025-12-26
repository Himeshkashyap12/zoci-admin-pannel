import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import { Image} from "antd";
import CustomModal from "../common/CustomModal";
import AddNewCollection from "./AddNewCollection";
import {useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { collectionDataHandler, deleteCollectionAsync, getCollectionAsync } from "../../feature/uiManagement/UiManagementSlice";
import deleteIcon from "../../assets/icons/deleteIcon.png"
import { toast } from "react-toastify";
import ConfirmationPopup from "../common/ConfirmationPopup";
import ImageLoader from "../loader/ImageLoader";

const UiCollection=({setCollectionId,collectionId,setDeleteStatus,sentinelRef})=>{
    const [collectionModel,setCollectionModel]=useState(false);
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {collection,isCollectionLoading}=useSelector(state=>state?.ui);
    const [editItem,setItemEdit]=useState();
    const [deletedId,setDeletedId]=useState(null)
            const editCollectionHandler=(item)=>{
                setDeletedId(null)
                 setItemEdit(item);
                 setCollectionModel(true)
            }
            const deleteCollectionHandler=async()=>{
                try {
                    const res=await dispatch(deleteCollectionAsync({token,collectionId:deletedId})).unwrap();
                    if(res.success){
                        toast.success(res?.message);
                        dispatch(collectionDataHandler())
                        dispatch(getCollectionAsync({token})).unwrap()
                        setCollectionModel(false);
                        setDeleteStatus(true);
                    }
                } catch (error) {
                    console.log(error);
                    setCollectionModel(false);
                    toast.error("Something Went Wrong!")
            }
        }
     if(isCollectionLoading) return <ImageLoader/>      
    return(
        <div className="bg-[#EFE6DC]">
        <div className="flex gap-2 px-[20px] bg-[#fff] py-[20px] cursor-pointer" onClick={()=>{setCollectionModel(true),setItemEdit(null),setDeletedId(null)}}>
            <PlusOutlined style={{fontSize:"18px" }}/>
            <CustomText className={"text-[16px] font-semibold !text-[#214344] "} value={"Add Collection"}/>
        </div>
        <div className="flex flex-col gap-1 h-[40vh] overflow-auto bg-[#fff]">
            {collection?.map((item)=>{
                return(
                    <>
                   <div onClick={()=>{setCollectionId(item?._id)}} className={`flex justify-between items-center p-3 rounded-xl  mx-[20px] ${collectionId==item?._id && "!bg-[#EAEAEA]"}`}>
                        <div className="flex gap-[10px] items-center">
                            <div className="!w-[100px]"><Image preview={false} className="!h-[80px] !!w-[150px] rounded-xl object-contain" src={item?.thumbnail}/></div>
                            <CustomText className={"text-[16px]  !text-[#214344] "} value={item?.name}/>

                        </div>
                         <>
                          <div className="flex items-center gap-2">
                             <div
                                    className="h-[20px] w-[20px] cursor-pointer"
                                    onClick={()=>{setDeletedId(item?._id),setCollectionModel(true)}}
                                >
                                    <Image preview={false} src={deleteIcon} alt="deleteIcon"/>
                                </div>
                                <div
                                onClick={()=>{editCollectionHandler(item)}}
                                    className="h-[20px] w-[20px] cursor-pointer"
                                >
                                    <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
                            </div>
                        </div>
                         </>
                    </div>
                    </>
                )
            })}



           <div>
            <div ref={sentinelRef} style={{ height: 1 }} />
           </div>
        </div>
            <CustomModal closeIcon  footer={false} setOpen={setCollectionModel} open={collectionModel} modalBody={deletedId?<ConfirmationPopup setDeleteId={setDeletedId} setDeleteConfirm={setCollectionModel} confirmationPopUpHandler={deleteCollectionHandler}/>:<AddNewCollection  open={collectionModel} setOpen={setCollectionModel} editItem={editItem}/>} width={"700px"}  align={"center"}/>

        </div>
        
    )
}
export default UiCollection;