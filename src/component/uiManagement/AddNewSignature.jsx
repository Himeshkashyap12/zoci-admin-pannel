import { Button, Checkbox, Empty, Image } from "antd";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import CustomSearch from "../common/CustomSearch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { getAllProductAsync } from "../../feature/inventaryManagement/inventarySlice";
import { useDebounce } from "../../hooks/UseDebounce";
import Loader from "../loader/Loader";
import { addItemToCollectionAsync, getSignatureAsync } from "../../feature/uiManagement/UiManagementSlice";
import { toast } from "react-toastify";
const AddNewSignature=({setSignatureModel,collectionId,title})=>{
    const dispatch=useDispatch();
    const [search,setSearch]=useState("");
    const token=Cookies.get("token");
    const {products,isLoading}=useSelector(state=>state?.inventary);
    const debouncedText = useDebounce(search, 500);
    const [productId,setProductId]=useState([])
    const getProduct=async()=>{
      const data={...search  && {search:search.trim()}}
        try {
        const res=await dispatch(getAllProductAsync({token,data}))
        } catch (error) {
           toast.error("Something went wrong. Please try again.");   
        }   
    }

    const selectProductHandler=(id)=>{
      const idx=productId?.findIndex(idx=>id==idx);
      if(idx==-1){
        setProductId([...productId,id])
      }else{
        const data=[...productId];
        data.splice(idx,1);
        setProductId(data)
      }
      
    }
  
  const addNewSignatureHandler=async()=>{
         try {
          const data={productIds:productId}
          const res=await dispatch(addItemToCollectionAsync({token,id:collectionId,data})).unwrap();
          if(res?.success){
            setSignatureModel(false);
            toast.success(res.message);
          }
          
         } catch (error) {
        toast.error("Something went wrong. Please try again.");  
            setSignatureModel(false)
            
         }
  }    
        useEffect(()=>{
          if(title){
            setSearch(title)

          }
            getProduct();
        },[debouncedText])
    return(
        <>
            <div>
      <div className="flex justify-center cursor-pointer">
        <CustomText
          className={"text-[14px] font-bold "}
          value={"Add New Item"}
        />
      </div>
      <div className="flex justify-center py-5">
        <CustomSearch value={search}  onchange={(e)=>{setSearch(e.target.value)}} placeholder={"Search"}/>
      </div>
      {isLoading ? <Loader/>:(products?.length==0? <Empty/>:<div className="flex flex-col justify-between items-center h-[50vh] overflow-auto  px-[20px]">
                       {products?.products?.map((item,idx)=>{
                        return(
                        <div className="w-full flex justify-between items-center">
                          <div className="flex gap-[10px] items-center">

                            <div className="!w-[100px]"><Image preview={false} className="!h-[80px] !!w-[150px] rounded-xl object-contain" src={item?.images?.productImage}/></div>
                            <CustomText className={"text-[16px]  !text-[#214344] "} value={item?.title}/>

                        </div>
                        <div >
                            <Checkbox checked={productId?.includes(item?._id)?true:false} onChange={(e)=>{selectProductHandler(item?._id)}} />
                        </div>
                        </div>
                        )
                       })}
                       
                    </div>)}
      <div className="flex flex-col gap-5 pt-10">
        <div className="flex justify-center gap-4 pt-10">
          <CustomButton
          onclick={()=>{addNewSignatureHandler()}}
            className={"!text-[#fff] !bg-[#214344] w-[180px]"}
            value={"Yes, Add New Item"}
          />
          <Button
            onClick={()=>setSignatureModel(false)}
            className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]"
          >
            No, Cancel
          </Button>
        </div>
      </div>
    </div>
        </>
    )
}
export default AddNewSignature;