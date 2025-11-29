import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import uiManagement from "../../assets/uiiManagement/card.png"
import { Image, Popover } from "antd";
import CustomModal from "../common/CustomModal";
import AddNewCollection from "./AddNewCollection";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionAsync } from "../../feature/uiManagement/UiManagementSlice";

const UiCollection=({setCollectionId,collectionId})=>{
    const [collectionModel,setCollectionModel]=useState();
    const [addCollection,setAddCollection]=useState(false)
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {collection}=useSelector(state=>state?.ui);
    const [editItem,setItemEdit]=useState();
    console.log(collectionId);
    
            const getCollection=async()=>{ 
                try {
            const res=await dispatch(getCollectionAsync({token})).unwrap();
                
            } catch (error) {
                
            }
                
            }


            const editCollectionHandler=(item)=>{
                 setItemEdit(item);
                 setCollectionModel(true)
            }
    useEffect(()=>{

         getCollection();
    },[addCollection])
    return(
        <div className="bg-[#EFE6DC]">
        <div className="flex gap-2 px-[20px] bg-[#fff] py-[20px] cursor-pointer" onClick={()=>{setCollectionModel(true)}}>
            <PlusOutlined style={{fontSize:"18px" }}/>
            <CustomText className={"text-[16px] font-semibold !text-[#214344] "} value={"Add Collection"}/>
        </div>
        <div className="flex flex-col gap-1 h-[40vh] overflow-auto bg-[#fff]">
            {collection?.collections?.map((item)=>{
                console.log(item,"item");
                
                return(
                    <>
                    <div onClick={()=>{setCollectionId(item?._id)}} className={`flex justify-between items-center p-1 rounded-xl  mx-[20px] ${collectionId==item?._id && "!bg-[#EAEAEA]"}`}>
                        <div className="flex gap-[10px] items-center">
                            <div className="!w-[100px]"><Image preview={false} className="!h-[80px] !!w-[150px] rounded-xl object-contain" src={item?.thumbnail}/></div>
                            <CustomText className={"text-[16px]  !text-[#214344] "} value={item?.name}/>

                        </div>
                         <>
                        <Popover placement="left" content={<div onClick={()=>{editCollectionHandler(item)}} className="cursor-pointer z-0">Edit Collection </div>} trigger="click">
                            <MoreOutlined style={{fontSize:"24px"}} />

                         </Popover>
                         </>
                    </div>
                    </>
                )
            })}
           <div>

           </div>
        </div>
            <CustomModal closeIcon  footer={false} setOpen={setCollectionModel} open={collectionModel} modalBody={<AddNewCollection setAddCollection={setAddCollection} open={collectionModel} setOpen={setCollectionModel} editItem={editItem}/>} width={"700px"}  align={"center"}/>

        </div>
        
    )
}
export default UiCollection;