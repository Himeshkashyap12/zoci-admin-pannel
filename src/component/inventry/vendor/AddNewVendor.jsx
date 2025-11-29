import { Button, Col, Row } from "antd";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import CustomButton from "../../common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {toast} from "react-toastify";
import Cookies from "js-cookie"
import { createVendorAsync, vendorPerformanceAnalysis } from "../../../feature/inventaryManagement/inventarySlice";
import Loader from "../../loader/Loader";
const AddNewVendor=({setOpen})=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token");
  const [venderInput,setVenderInput]=useState({
          companyName: "",
          vendorName: "",
          address: "",
          gst: "",
          phoneNumber: ""
        })
        const {isLoading} =useSelector(state=>state?.inventary)
        
  const vendorInputHandler=(e)=>{
       const {name,value}=e.target;
       setVenderInput({...venderInput,[name]:value})
  }
   const createVendorHandler=async()=>{
       if(!venderInput?.companyName || !venderInput?.gst || !venderInput?.companyName || !venderInput?.gst || !venderInput?.companyName ){
        return toast.error("Please fill all field")
       }
      try {
        const data={...venderInput}
        const res=await dispatch(createVendorAsync({token,data})).unwrap();
        if(res?.status){
          setOpen(false);
          toast.success(res.message);
          dispatch(vendorPerformanceAnalysis({token}));
          setVenderInput({
          companyName: "",
          vendorName: "",
          address: "",
          gst: "",
          phoneNumber: ""
        });
        }
        console.log(res);
        
      } catch (err) {
        console.log(err);
        
        toast.error("Something went wrong")
       
        
      }
       
      

    
   }
  
// if(isLoading) return <Loader/>
    return(
        <div >
            <div className="flex justify-center">
            <CustomText className={"text-[14px] font-bold "} value={"Add New Vendor"}/>
            </div>
            <div className="flex flex-col gap-5 pt-10">
                <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Company Name"}/>
                       <CustomInput placeholder={"Enter Company Name"} name={"companyName"} onchange={(e)=>{vendorInputHandler(e)}} value={venderInput?.companyName}  className={"h-[46px]"}/>
                       
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"GST"}/>
                     <CustomInput placeholder={"Enter GST Number"} name={"gst"} onchange={(e)=>{vendorInputHandler(e)}} value={venderInput?.gst}  className={"h-[46px]"}/>
                    </div>
                    </Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={12}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Vendor Name"}/>
                        <CustomInput placeholder={"Enter Vendor Name"} name={"vendorName"} onchange={(e)=>{vendorInputHandler(e)}} value={venderInput?.vendorName}  className={"h-[46px]"}/>
                      </div>
                    </Col>
                    <Col span={12}>
                     <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Phone Number"}/>
                       <CustomInput placeholder={"Enter Phone Number"} name={"phoneNumber"} onchange={(e)=>{vendorInputHandler(e)}} value={venderInput?.phoneNumber}  className={"h-[46px]"}/>            
                      </div></Col>
                </Row>
                 <Row gutter={[20,20]}>
                    <Col span={24}>
                      <div className="flex flex-col gap-2">
                      <CustomText className={"text-[16px] "} value={"Address"}/>
                        <CustomInput placeholder={"Enter Address"} name={"address"} onchange={(e)=>{vendorInputHandler(e)}} value={venderInput?.address}  className={"h-[46px]"}/>
                      </div>
                    </Col>
                   
                </Row>
                <div className="flex justify-center gap-4 pt-10">
                    <CustomButton onclick={()=>{createVendorHandler()}} className={"!text-[#fff] !bg-[#214344] w-[180px]"} value={isLoading?"Loading...":"Yes, Add New Vendor"}/>
                    <Button onClick={()=>{setOpen(false)}} className="!border-[2px] !border-[#214344] rounded-full  w-[180px] text-[14px]">No, Cancel</Button>
                </div>
            </div>
        </div>
    )
}
export default AddNewVendor;