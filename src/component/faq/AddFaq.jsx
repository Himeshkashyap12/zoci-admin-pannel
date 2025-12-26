import { Button, Col, Row, Skeleton } from "antd"
import CustomText from "../common/CustomText"
import TextArea from "antd/es/input/TextArea"
import CustomButton from "../common/CustomButton"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { createFaqAsync, editFaqAsync, fetchFaqAsync } from "../../feature/faq/faqSlice"
import { toast } from "react-toastify"
import { specialChar } from "../../constants/regex"
import { compareNewAndOldObject } from "../../constants/constants"
const AddFaq=({setFaqModel,editItem})=>{    
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const {isCreateFaqLoading}=useSelector(state=>state?.faq)
    const [faqInput,setFaqInput]=useState({
        question:"",
        answer:""
    });
    const faqInputHandler=(e)=>{
        const {name,value}=e.target;
        setFaqInput({...faqInput,[name]:value})
    }


    const createFaqHandler=async()=>{
        if(!faqInput?.question || !faqInput?.answer) return toast.error("Please enter all fields")

            if(!editItem){
          try {
            const data={...faqInput,isActive:true}
            const res=await dispatch(createFaqAsync({token,data})).unwrap();
            if(res.success){
                toast.success(res.message);
                setFaqModel(false);
                dispatch(fetchFaqAsync({token}))
            }
           } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
            setFaqModel(false)
            
           }
            }else{
            try {
                const updatedData=compareNewAndOldObject({oldObj:editItem,newObj:faqInput});
                if(Object.keys(updatedData)?.length===0) return;
            const res=await dispatch(editFaqAsync({token,updatedData,id:editItem?._id})).unwrap();
            if(res.success){
                toast.success(res.message);
                setFaqModel(false);
                dispatch(fetchFaqAsync({token}))
            }
           } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong")
            setFaqModel(false)
            
           }
            }
        
    }

    useEffect(()=>{
   if(editItem){
    setFaqInput({
         question:editItem?.question,
        answer:editItem?.answer
    })
   }else{
    setFaqInput({
       question:"" ,
       answer:""
    })
   }
    },[editItem])
    return(
        <>
          <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Add New FAQ"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
              <Row gutter={[20,20]}>
                    <Col span={24}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Question"}/>
                        {isCreateFaqLoading?<Skeleton.Input style={{ width: 700,height:50 }}   active paragraph={{rows:4}}/>: <TextArea name={"question"} value={faqInput?.question} onChange={(e)=>{faqInputHandler(e)}}  className={"h-[46px]"}/>}
                       
                      </div>
                    </Col>
                    <Col span={24}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Answer"}/>
                       {isCreateFaqLoading?<Skeleton.Input  style={{ width: 700,height:50 }}   active paragraph={{rows:4}}/>: <TextArea name={"answer"} value={faqInput?.answer} onChange={(e)=>{faqInputHandler(e)}}   className={"h-[46px]"}/>}
                       
                      </div></Col>
                  </Row>

                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton onclick={()=>{createFaqHandler()}}  className={"!text-[#fff] !bg-[#214344] w-[180px] cursor-pointer"} value={isCreateFaqLoading?"...Loading":`Yes,${!editItem?"Add":"Edit"} New  FAQ`}/>
                    <Button onClick={()=>{setFaqModel(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px] cursor-pointer">No, Cancel</Button>

                </div>
            </div>
        </div>
        </>
    )
}
export default AddFaq;