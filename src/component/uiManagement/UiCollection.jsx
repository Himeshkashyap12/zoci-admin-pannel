import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import uiManagement from "../../assets/uiiManagement/card.png"
import { Image, Popover } from "antd";
import CustomModal from "../common/CustomModal";
import AddNewCollection from "./AddNewCollection";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionAsync } from "../../feature/uiManagement/UiManagementSlice";
import useInfiniteScrollObserver from "../../hooks/useCustomLoading";

const UiCollection=({setCollectionId,collectionId})=>{
    const [collectionModel,setCollectionModel]=useState();
    const [addCollection,setAddCollection]=useState(false)
    const token=Cookies.get("token");
    const dispatch=useDispatch();
    const {collection,isLoading}=useSelector(state=>state?.ui);
    const [editItem,setItemEdit]=useState();
    const [page,setPage]=useState(1);
      const [hasMore,setHasMore]=useState(true)

    console.log(collection,"ljkj");
    
            const getCollection=async()=>{ 
                try {
               const data={page:page,limit:10};
            const res=await dispatch(getCollectionAsync({token,data})).unwrap();
           
           const receivedCount = res?.collections?.length ?? 0;
            if (receivedCount < 10) setHasMore(false);

            
                
            } catch (error) {
               console.log(error);
                
            }
                
            }


            const editCollectionHandler=(item)=>{
                 setItemEdit(item);
                 setCollectionModel(true)
            }


             const loadMore = useCallback(() => {
            
                if (isLoading || !hasMore) return;
                    setPage((p) => p + 1);
                }, [isLoading, hasMore]);


 const sentinelRef = useInfiniteScrollObserver(loadMore, { rootMargin: "50px" });
            useEffect(()=>{
                getCollection();
            },[addCollection,page]);

    return(
        <div className="bg-[#EFE6DC]">
        <div className="flex gap-2 px-[20px] bg-[#fff] py-[20px] cursor-pointer" onClick={()=>{setCollectionModel(true)}}>
            <PlusOutlined style={{fontSize:"18px" }}/>
            <CustomText className={"text-[16px] font-semibold !text-[#214344] "} value={"Add Collection"}/>
        </div>
        <div className="flex flex-col gap-1 h-[40vh] overflow-auto bg-[#fff]">
            {collection?.map((item)=>{
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

            <div ref={sentinelRef} style={{ height: 1 }} />

           <div>

           </div>
        </div>
            <CustomModal closeIcon  footer={false} setOpen={setCollectionModel} open={collectionModel} modalBody={<AddNewCollection setAddCollection={setAddCollection} open={collectionModel} setOpen={setCollectionModel} editItem={editItem}/>} width={"700px"}  align={"center"}/>

        </div>
        
    )
}
export default UiCollection;