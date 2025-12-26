
import { Button, Col, Row, Skeleton } from "antd";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { useState } from "react";
import CustomRadio from "../../common/CustomRadio";
import TextArea from "antd/es/input/TextArea";
import CustomDate from "../../common/CustomDate";
import CustomImageUpload from "../../common/CustomImageUpload";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrlAsync } from "../../../feature/media/mediaSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { createExpenseAsync, getTotalExpenditureAsync } from "../../../feature/sales/salesSlice";
import {useNavigate} from "react-router-dom";
import { isoTODate } from "../../../constants/constants";
import { gstRegex, specialChar } from "../../../constants/regex";
const AddExpense=({setOpen})=>{
  const dispatch=useDispatch();
  const token=Cookies.get("token");
  const navigate=useNavigate();
  const [gstErrorMessage,setGstErrorMessage]=useState("")
  const {isMediaLoading}=useSelector(state=>state?.media)
    const [expense, setExpense] = useState({
                category: "",
                subCategory: "",
                date: new Date().toISOString().slice(0, 10),
                value: "",
                quantity: "",
                gstApplicable: true,
                gstPercent: "",
                comment: "",
                file: ""
    });

    const expenseHandler=(e)=>{
      const {name,value}=e.target;
      if(specialChar?.test(value)) return ;
      if(name=="gstPercent"){
        if(value?.length>15) return ;
         const gstValue = value.toUpperCase();
      if (gstValue.length === 15 && !gstRegex.test(gstValue)) {
       setGstErrorMessage("Wrong GST number")
       return;
     }else{
       setGstErrorMessage("");

     }
      
    }
  
      setExpense({...expense,[name]:value})
  }
    const dateHandler=(date)=>{
      setExpense({...expense,date:isoTODate(date.toISOString())});
      
    
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
                    setExpense({...expense,file:res?.images[0]});
                   
                }
                } catch (err) {
                console.error(err);
              }
        };
    

        const addexpenseHandler=async()=>{
          if(!gstErrorMessage=="") return toast.error("Wrong Gst Number!")
            try {
              const data={...expense}
              const res=await dispatch(createExpenseAsync({token,data})).unwrap();
              if(res.success){
                toast.success(res.message);
                setOpen(false);
                dispatch(getTotalExpenditureAsync({token}))
                navigate("/admin/total-expenditure")

              }
              
              
            } catch (error) {
               
                toast.error("Something went wrong!")
              
            }
        }
    return(
        <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Add New Expense"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                       <CustomText className={"text-[16px] "} value={"Expenditure Category"}/>
                       <CustomInput name={"category"} onchange={(e)=>{expenseHandler(e)}} value={expense?.category} className={"h-[46px]"}/> 
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Date"}/>
                      <CustomDate  onchange={(date)=>dateHandler(date)} className={"h-[46px]"} />
                       
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Expenditure Sub Category"}/>
                       <CustomInput  name={"subCategory"} onchange={(e)=>{expenseHandler(e)}} value={expense?.subCategory} className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Attach file (If any)"}/>
                      <CustomImageUpload imageUploadHandler={(e)=>{handleUpload(e)}} label={
                        <>
            {isMediaLoading?<Skeleton.Input  paragraph={{rows:0,titleHeight:"60px"}}/>: <div className="flex gap-2 items-center  h-[46px] p-[20px]  bg-[#fff]">
               {!expense?.file && <UploadOutlined style={{fontSize:"24px" }} />}
            <CustomText className={"!text-[16px]"} value={(isMediaLoading&& "Loading...")|| expense?.file?"File Uploaded":"Upload attachement"}/>
            </div>}
            </>
          }

              />
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Expenditure value"}/>
                       <CustomInput type={"number"} name={"value"} onchange={(e)=>{expenseHandler(e)}} value={expense?.value} className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                      <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Quantity"}/>
                       <CustomInput type={"number"} name={"quantity"} onchange={(e)=>{expenseHandler(e)}} value={expense?.quantity} className={"h-[46px]"}/>
                      </div>
                      </Col>
                </Row>
                <div className="flex justify-center">
                  <CustomRadio className={"h-[46px]"} name={"gstApplicable"} value={expense?.gstApplicable} defaultValue={true} onchange={(e)=>{expenseHandler(e)}}  options={[{label:"With GST%",value:true},{label:"Without GST%",value:false}]} />
  
                </div>
                {expense?.gstApplicable && <Row>
                  <Col span={24}>
                  <div className="flex flex-col gap-3">
                  <CustomText value={"GST in %"}/>
                    <CustomInput   className={`h-[46px] ${gstErrorMessage && expense?.gstPercent!="" && " !border-[1px] !border-[red]"}`} name={"gstPercent"} value={expense?.gstPercent} 
                    
                    onchange={(e)=>{expenseHandler(e)}} placeholder={"Enter GST"}
                    
                    />
                   {gstErrorMessage && expense?.gstPercent!="" &&  <CustomText className={"!text-[12px] !text-[red]"} value={gstErrorMessage}/>}
                    </div>
                  </Col>
                </Row>}
                 <Row>
                  <Col span={24}>
                  <div className="flex flex-col gap-3">
                  <CustomText value={"Comment"}/>
                   <TextArea name={"comment"} value={expense?.comment} onChange={(e)=>{expenseHandler(e)}}  placeholder="Enter Comment"/>
                    </div>
                  </Col>
                </Row>
                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton onclick={()=>{addexpenseHandler()}} className={"!text-[#fff] !bg-[#214344] w-[180px]"} value={"Yes, Add New Expense"}/>
                    <Button onClick={()=>{setOpen(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]">No, Cancel</Button>

                </div>
            </div>
        </div>
    )
}
export default AddExpense;