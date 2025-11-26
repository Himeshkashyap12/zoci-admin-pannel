import { Button } from "antd";
import CustomButton from "../common/CustomButton";
import CustomImageUpload from "../common/CustomImageUpload";
import CustomText from "../common/CustomText";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { createBulkProductAsync, getAllProductAsync } from "../../feature/inventaryManagement/inventarySlice";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
const CreateBulkProduct=({setproductListBulkModel})=>{
  const [csvFile,setCsvFile]=useState("");
  const dispatch=useDispatch();
  const {isCreateProductLoading}=useSelector(state=>state?.inventary)
  const token=Cookies.get("token")
    const handleUpload=(e)=>{
        const file=e.target.files[0]
        setCsvFile(file); 
    }
    const createBulkHandler=async()=>{
        try {
            const formData=new FormData();
            formData.append("file",csvFile)
            const res=await dispatch(createBulkProductAsync({token,formData})).unwrap();
                if(res.success){
                    toast.success(res.message);
                    setproductListBulkModel(false)
                    dispatch(getAllProductAsync({token}))
                    setCsvFile(null)
                }
            
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
            setproductListBulkModel(false)
            setCsvFile(null)

            
        }


    }
    return(
      
        <div className="flex  flex-col justify-center items-center gap-5">
          <CustomText className={"!text-[24px] font-semibold"} value={"Create Bulk products"}/>
          <CustomText className={"!text-[16px] !text-[#214344]"} value={"Please Upload a CSV file to create bulk products."}/>
           <CustomImageUpload imageUploadHandler={(e)=>{handleUpload(e)}} label={
            <div className="flex gap-2 items-center border-[2px] !border-[#214344] rounded-full px-10 py-5 bg-[#fff]">
                <UploadOutlined style={{fontSize:"24px" }} />
            <CustomText className={"!text-[16px]"} value={"Upload CSV"}/>
            </div>}

              />
           {csvFile && <CustomText className={"!text-[12px] !text-[#214344]"} value={"File successfully added Please upload"}/>}

              <div className="flex justify-center items-center gap-3">
                <CustomButton onclick={()=>{createBulkHandler()}} className={"!text-[#fff] rounded-full"} value={isCreateProductLoading?"...Loading":"Yes, Create Bulk"}/>
                 <Button onClick={()=>{setproductListBulkModel(false)}} className="rounded-full">No,Cancel</Button>
              </div>

        </div>
    )
}
export default CreateBulkProduct;