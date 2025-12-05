

import { Button, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CustomImageUpload from "../common/CustomImageUpload";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import CustomText from "../common/CustomText";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import CustomDate from "../common/CustomDate";
import CustomSelect from "../common/CustomSelect";
import { CreateNewPromotionAsync, getAllPromotionAsync, updateNewPromotionAsync } from "../../feature/marketing/marketingSlice";
import Loader from "../loader/Loader";
import { compareNewAndOldObject, isoTODate } from "../../constants/constants";
const CreateNewPromotion=({setOpen,edititem,edit})=>{
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const navigate=useNavigate();
  const {isMediaLoading}=useSelector(state=>state?.media)
  const {isLoading}=useSelector(state=>state?.marketing)
  console.log(edititem?._id,"fgfd");
  
    const [promotion, setPromotion] = useState({   
          code: "",
          type: "",
          value: "" ,
          minOrderValue:"" ,
          maxOrderValue:"" ,
          category: "",
          expiryDate: "2025-12-31",
          usageLimit: "",
          banner: "",
          productSKU:"",

    });

    const promotionHandler=(e,status)=>{
      console.log(status);
      
      if(status){
       setPromotion({...promotion,[status]:e})
      }else{
      const {name,value}=e.target;

      setPromotion({...promotion,[name]:value})

      }
      
    }
    const dateHandler=(date)=>{
      setPromotion({...promotion,expiryDate:isoTODate(date.toISOString())});
      
    }

    const categoryOption=[
       {label:"Custom",value:"Custom"},
       {label:"Customer",value:"Customer"},
       {label:"Birthday",value:"Birthday"},
       {label:"Anniversary",value:"Anniversary"},
    ]


const typeOption=[
  {label:"flat",value:"Flat"},
  {label:"percentage",value:"Percentage"},

]
  
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
                    setPromotion({...promotion,banner:res?.images[0]});
                   
                }
                } catch (err) {
                console.error(err);
              }
        };
    

        const addpromotionHandler=async()=>{
          
            try {
              if(!edit){
                const data={...promotion}
              const res=await dispatch(CreateNewPromotionAsync({token,data})).unwrap();  
              console.log(res);
               if(res.status=="success"){
                toast.success(res.message);
                setOpen(false);
                dispatch(getAllPromotionAsync({token}));
                setPromotion({
                   code: "",
                    type: "",
                    value: "" ,
                    minOrderValue:"" ,
                    maxOrderValue:"" ,
                    category: "",
                    expiryDate: "2025-12-31",
                    usageLimit: "",
                    banner: ""
                })
              }else{
                toast.error(res.response?.data?.message);
                setPromotion({
                   code: "",
                    type: "",
                    value: "" ,
                    minOrderValue:"" ,
                    maxOrderValue:"" ,
                    category: "",
                    expiryDate: "2025-12-31",
                    usageLimit: "",
                    banner: ""
                })
                setOpen(false)
              }

              }else{
                const data=compareNewAndOldObject({oldObj:edititem,newObj:promotion})
               
              const res=await dispatch(updateNewPromotionAsync({token,data,id:edititem?._id})).unwrap();  
              console.log(res);
               if(res.status=="success"){
                toast.success(res.message);
                setOpen(false);
                dispatch(getAllPromotionAsync({token}));
                setPromotion({
                   code: "",
                    type: "",
                    value: "" ,
                    minOrderValue:"" ,
                    maxOrderValue:"" ,
                    category: "",
                    expiryDate: "2025-12-31",
                    usageLimit: "",
                    banner: ""
                })
              }else{
                toast.error(res.response?.data?.message);
                setPromotion({
                   code: "",
                    type: "",
                    value: "" ,
                    minOrderValue:"" ,
                    maxOrderValue:"" ,
                    category: "",
                    expiryDate: "2025-12-31",
                    usageLimit: "",
                    banner: ""
                })
                setOpen(false)
              }
              }
              
                          
             
              
              
            } catch (error) {
               console.log(error); 
                toast.error("Something went wrong!")
            }
        }
        useEffect(()=>{
              if(edit){
                console.log(edititem);
                
                setPromotion(edititem)
              }
                },[edititem])
        if(isMediaLoading || isLoading ) return <Loader/>
    return(
        <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Create New Promotions"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Promo code"}/>
                       <CustomInput name={"code"}  onchange={(e)=>{promotionHandler(e)}} value={promotion?.code} className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Expiry  Date"}/>
                      <CustomDate  onchange={(date)=>dateHandler(date)} className={"h-[46px]"} />
                       
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Type"}/>
                        <CustomSelect className="!h-[46px]"  name={"type"} onchange={(e)=>{promotionHandler(e,"type")}}  value={promotion?.type}  options={typeOption} />
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Value"}/>
                       <CustomInput type={"number"}  name={"value"} onchange={(e)=>{promotionHandler(e)}} value={promotion?.value} className={"h-[46px]"}/>
                      </div></Col>
                </Row>
               
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Usage Limit"}/>
                       <CustomInput type={"number"} name={"usageLimit"} onchange={(e)=>{promotionHandler(e)}} value={promotion?.usageLimit} className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                      <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Product  SKU"}/>
                       <CustomInput name={"productSKU"} onchange={(e)=>{promotionHandler(e)}} value={promotion?.productSKU} className={"h-[46px]"}/>
                      </div>
                      </Col>
                </Row>
              
              <Row gutter={[20,20]}>
                  <Col span={12}>
                  <div className="flex flex-col gap-3">
                  <CustomText value={"Category"}/>
                  <CustomSelect className="!h-[46px]" name="category" onchange={(e)=>{promotionHandler(e,"category")}} value={promotion?.category} placeholder="Category" options={categoryOption} /> 
                    </div>
                  </Col>
                   <Col span={12}>
                  <div className="flex flex-col gap-3">
                   
                    <CustomText value={"Range"}/>
                     <div className="flex gap-3">
                    <CustomInput type={"number"}  className={"h-[46px]"} name={"minOrderValue"} value={promotion?.minOrderValue} onchange={(e)=>{promotionHandler(e)}} placeholder={"Min Value"}/>
                    <CustomInput  type={"number"} className={"h-[46px]"} name={"maxOrderValue"} value={promotion?.maxOrderValue} onchange={(e)=>{promotionHandler(e)}} placeholder={"Max Value"}/>
                   </div>
                    </div>
                  </Col>
                </Row>
                 <Row gutter={[20,20]}>
                  <Col span={12}>
                  <div className="flex flex-col gap-3">
                  <CustomText value={"Banner (If Any) "}/>
                     <CustomImageUpload imageUploadHandler={(e)=>{handleUpload(e)}}  label={
                     <div className="flex gap-2 items-center  h-[46px] p-[20px]  bg-[#fff]">
                        {!promotion?.banner && (<UploadOutlined style={{fontSize:"24px" }} />)}
                      <CustomText  className={"!text-[16px]"} value={(isMediaLoading&& "Loading...")|| promotion?.banner?"File Uploaded":"Upload attachement"}/>
                      </div>}
                      
              />
              <div>
                   {promotion?.banner &&  <Image  className="!size-[100px] rounded-md" src={promotion?.banner}/>}
                    </div>

                    </div>
                  </Col>
                   <Col span={12}>
                  <div className="flex flex-col gap-3">
                  <CustomText value={"Mobile Number"}/>
                    <CustomInput type={"number"} className={"h-[46px]"} name={"customerMobile"} value={promotion?.customerMobile} onchange={(e)=>{promotionHandler(e)}} placeholder={"Enter Customer Mobile"}/>
                    </div>
                  </Col>
                </Row>
                

                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton onclick={()=>{addpromotionHandler()}} className={"!text-[#fff] !bg-[#214344] w-[180px]"} value={`Yes, ${edit?"Edit":"Add New"}  Expense`}/>
                    <Button onClick={()=>{setOpen(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]">No, Cancel</Button>

                </div>
            </div>
        </div>
    )
}
export default CreateNewPromotion;