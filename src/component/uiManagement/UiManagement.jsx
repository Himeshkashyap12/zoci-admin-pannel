import {useNavigate} from "react-router-dom";
import CustomText from "../common/CustomText.jsx";
import { useCallback, useEffect, useState } from "react";
import UiManagementButton from "./UiManagementButton.jsx";
import UiManagementFilter from "./UiManagementFilter.jsx";
import CollectionTable from "./CollectionTable.jsx";
import CarousalUi from "./uiCarousal/CarousalUi.jsx";
import Cookies from "js-cookie"
import { useDebounce } from "../../hooks/UseDebounce.jsx";
import { useDispatch, useSelector } from "react-redux";
import { collectionDataHandler, getCollectionAsync } from "../../feature/uiManagement/UiManagementSlice.js";
import useInfiniteScrollObserver from "../../hooks/useCustomLoading.jsx";
import Loader from "../loader/Loader.jsx";
const UiManagement=()=>{
    const [collection,setCollection]=useState(true);
    const [search,setSearch]=useState("");
   const debouncedText = useDebounce(search, 500);
   const token=Cookies.get("token");
   const dispatch=useDispatch();
   const [deleteStatus,setDeleteStatus]=useState(false)
   const [sortFilter,setSortFilter]=useState([]);
   const {isCollectionLoading}=useSelector(state=>state?.ui)
   const [hasMore,setHasMore]=useState(true);
   const [page,setPage]=useState(1);
   


    const getCollection=async()=>{ 
                try {
             const trimSearch=search?.trim();
             const data={
                ...(trimSearch && { search:trimSearch }),
                ...(sortFilter?.length>0 && { [sortFilter[0]]:sortFilter[1] }),
                  page:page,
                  limit:10
              }

            if (search && !trimSearch) {
              return; 
            }
            const res=await dispatch(getCollectionAsync({token,data})).unwrap();
            if(res.success){
               const receivedCount = res?.collections?.length ?? 0;
               if (receivedCount < 10) setHasMore(false);
            }
            
           setDeleteStatus(false)
            } catch (error) {
               console.log(error);   
            } 
        }
        useEffect(()=>{
                     getCollection();
                },[debouncedText,sortFilter,deleteStatus,page]); ;

                const loadMore = useCallback(() => {
                  if (isCollectionLoading || !hasMore) return;
                  setPage((p) => p + 1);
                }, [isCollectionLoading, hasMore]);

  // sentinel ref
  const sentinelRef = useInfiniteScrollObserver(loadMore, { rootMargin: "50px" });

    if(isCollectionLoading) return <Loader/>

    return(
        <>
      <div className="flex flex-col gap-5 p-[24px]">
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Ui Management"}
        />
        <UiManagementButton setCollection={setCollection} collection={collection}/>
        {collection && <UiManagementFilter setSortFilter={setSortFilter} search={search} setSearch={setSearch}/>}
       {collection? <CollectionTable sentinelRef={sentinelRef} setDeleteStatus={setDeleteStatus}/>:<CarousalUi/>}
      </div>
     
        </>
    )
}
export default UiManagement;