



import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Skeleton } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { compareNewAndOldObject } from "../../constants/constants";
import { specialChar } from "../../constants/regex";
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import { addEventSalesEventAsync, getSalesDashboardAsync, UpdateEventSalesEventAsync } from "../../feature/sales/salesSlice";
import CustomButton from "../common/CustomButton";
import CustomImageUpload from "../common/CustomImageUpload";
import CustomInput from "../common/CustomInput";
import CustomText from "../common/CustomText";
const AddEvent=({setOpen,editData})=>{
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const {isMediaLoading}=useSelector(state=>state?.media)
    const [eventInput, setEventInput] = useState({
               eventName:"",
               city:"",
               totalSales:null,
               image:"",
               totalExpansions:null
             });

   const eventInputTypeHandler=(e)=>{
      const {name,value}=e.target;
      if(specialChar.test(value)) return;
      setEventInput({...eventInput,[name]:value});
   }
   
   
  

const addEventHandler=async()=>{
    const eventTypeValidation=[eventInput?.eventName,eventInput?.city,eventInput?.totalSales,eventInput?.image]?.some((item)=>!item);
    if(eventTypeValidation) return toast.error("Please enter all field");
    
   try {

    if(!editData){

         const data={...eventInput}
    const res=await dispatch(addEventSalesEventAsync({data,token})).unwrap();
   if(res?.success){
    toast.success(res?.message);
    setOpen(false);
    dispatch(getSalesDashboardAsync({token}))
   }

    }else{

    const data=compareNewAndOldObject({oldObj:editData,newObj:eventInput});
    
    if(!data  || Object.keys(data)?.length === 0)   return toast.error("Please update at least one field before saving");;
    const res=await dispatch(UpdateEventSalesEventAsync({data,token,id:editData?._id})).unwrap();
   if(res?.success){
    toast.success(res?.message);
    setOpen(false);
    dispatch(getSalesDashboardAsync({token}))
   }
   }
   
    
   } catch (error) {
    console.log(error);
    
    toast.error("Something Went Wrong!")
    setOpen(false)

    
   }
    
}
  
// admin/total-expenditure
    const handleUpload = async (e) => {
        const file = e.target.files[0];
          if (!file) return;
                try {
                const formData = new FormData();
                formData.append("productImages", file);
                const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
                if(res.message){
                    toast.success(res?.message)
                    setEventInput({...eventInput,image:res?.images[0]});
                   
                }
                } catch (err) {
                console.error(err);
              }
        };
    
   useEffect(()=>{
        setEventInput(editData)
   },[editData])
      
    return(
        <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Add Event"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                       <div className="flex gap-1">
                       <CustomText className={"text-[16px] "} value={"Event Name"}/>
                       <CustomText value={"*"} className={"!text-red-600"}/>
                       </div>
                       <CustomInput name={"eventName"} onchange={(e)=>{eventInputTypeHandler(e)}} value={eventInput?.eventName} className={"h-[46px]"}/> 
                      </div>
                    </Col>
                    <Col span={12}>
                    <div className="flex flex-col gap-2">
                       <div className="flex gap-1">
                       <CustomText  className={"text-[16px] "} value={"Event City"}/>
                       <CustomText value={"*"} className={"!text-red-600"}/>
                       </div>
                       <CustomInput  name={"city"} onchange={(e)=>{eventInputTypeHandler(e)}} value={eventInput?.city} className={"h-[46px]"}/> 
                      </div>
                    </Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                       <div className="flex gap-1">
                       <CustomText className={"text-[16px] "} value={"Event Sales"}/>
                      <CustomText value={"*"} className={"!text-red-600"}/>
                       </div>
                       <CustomInput type={"number"}  name={"totalSales"} onchange={(e)=>{eventInputTypeHandler(e)}} value={eventInput?.totalSales} className={"h-[46px]"}/> 
                      </div>
                    </Col>
                      <Col span={12}>
                       <div className="flex flex-col gap-2">
                       <div className="flex gap-1">
                       <CustomText className={"text-[16px] "} value={"Total Expansions"}/>
                      <CustomText value={"*"} className={"!text-red-600"}/>
                       </div>
                       <CustomInput type={"number"}  name={"totalExpansions"} onchange={(e)=>{eventInputTypeHandler(e)}} value={eventInput?.totalExpansions} className={"h-[46px]"}/> 
                      </div>
                    </Col>
                </Row>
                <Row>
                  <Col span={24}>
                   <div className="flex flex-col gap-2">
                       <div className="flex gap-1">
                      <CustomText className={"text-[16px] "} value={"Event Pic"}/>
                       <CustomText value={"*"} className={"!text-red-600"}/>
                       </div>
                      <CustomImageUpload imageUploadHandler={(e)=>{handleUpload(e)}} label={
                        <>
                        {isMediaLoading?<Skeleton.Input  paragraph={{rows:0,titleHeight:"60px"}}/>: <div className="flex gap-2 items-center  ps-2  bg-[#fff] min-h-[46px] rounded-md">
                        {!eventInput?.image && <div className="flex justify-baseline gap-3"><UploadOutlined style={{fontSize:"24px" }} /> <CustomText className={"text-[20px] !text-[#214344]"} value={"Upload Pic"}/></div> }
                        {eventInput?.image && <Image className="!size-[100px] p-1 rounded-md object-fit" preview={false} src={eventInput?.image}/>}
                        </div>}
                        </>
                    }

              />
                      </div>
                      </Col>
                </Row>
               
                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton onclick={()=>{addEventHandler()}} className={"!text-[#fff] !bg-[#214344] w-[180px]"} value={"Yes, Add New Event"}/>
                    <Button onClick={()=>{setOpen(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]">No, Cancel</Button>

                </div>
            </div>
        </div>
    )
}
export default AddEvent;