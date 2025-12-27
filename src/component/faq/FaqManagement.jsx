import { EditOutlined, MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { deleteFaqAsync, fetchFaqAsync } from "../../feature/faq/faqSlice";
import CustomAccordian from "../common/CustomAccordian";
import CustomText from "../common/CustomText";
import CustomInput from "../common/CustomInput";
import CustomButton from "../common/CustomButton";
import deleteIcon from "../../assets/icons/deleteIcon.png"
import CustomModal from "../common/CustomModal";
import AddFaq from "./AddFaq";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import ConfirmationPopup from "../common/ConfirmationPopup";

const FaqManagement = () => {
    const [faqModel,setFaqModel]=useState(false);
    const [key,setKey]=useState();    
   const dispatch=useDispatch();
   const token=Cookies.get("token");
   const [search,setSearch]=useState("");
   const [deleteId,setDeleteId]=useState(null);
   const [editItem,setEditItem]=useState(null)
   const {faq,isLoading}=useSelector(state=>state?.faq);
   const panelStyle = {
    marginBottom: 16,
    borderRadius: "16px",
    background: "#fff",
    };
    const getFaq=async()=>{
      try {
        const res=await dispatch(fetchFaqAsync({token})).unwrap();
      } catch (error) {
          console.log(error);  
      }
    }
    useEffect(()=>{
      getFaq();
    },[])
    const faqSearchData=faq?.filter((item)=>{
      return(
         item?.question?.toUpperCase()?.includes(search?.toUpperCase()) || item?.answer?.toUpperCase()?.includes(search?.toUpperCase())
      )
    })
     const deleteConfirmFaqHandler=async()=>{
        try {
            const res=await dispatch(deleteFaqAsync({token,id:deleteId})).unwrap();
            if(res?.success){
                toast.success(res?.message);
                setFaqModel(false);
                getFaq()
            }
        } catch (error) {
            console.log(error);
            toast?.error("Something Went Wrong !")
                setFaqModel(false)
            
        }
     }
    


     const deleteFaqHandler=(item)=>{
        setDeleteId(item?._id);
        setEditItem(null);
        setFaqModel(true)

     }

     const editFaqHamdler=(item)=>{
         setEditItem(item);
         setFaqModel(true);
         setDeleteId(null);
     }
    const faqData=faqSearchData?.map((item,idx)=>{
      return(
            {
                  key: idx,
                  label: (
                    <div className="flex justify-between" ><CustomText className="font-semibold text-[16px] text-[#214344]" value={item?.question}/>
                    <div className=" right-12 flex gap-3 items-center">
                         <div
                                className="h-[20px] w-[20px] cursor-pointer"
                                onClick={() => {deleteFaqHandler(item);
                                
                                }}
                            >
                                <img src={deleteIcon} alt="deleteIcon"/>
                            </div>
                            <div
                                className="h-[20px] w-[20px] cursor-pointer"
                                onClick={() => {editFaqHamdler(item)}}
                                
                            >
                                <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
                            </div>

                    </div>
                    </div>
                  ),
                  children: (
                    <CustomText className=" text-[14px] text-[#214344] font-[300]" value={item?.answer}/>
                  ),
                  style: panelStyle,
            }
      )
    })

 
if(isLoading) return <Loader/>
  return (
    <>
      <div className="flex flex-col p-5">
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"FAQ's Management"}
        />
          <div className="flex flex-col gap-10 items-center w-[100%] mx-auto justify-center pt-5">
           <div className="flex justify-between items-center w-full">
            <div className=" w-[400px]">
              <CustomInput
                onchange={(e)=>{setSearch(e.target.value)}}
                placeholder="Search your FAQ'S"
                className="text-[#214344]   !h-[40px]"
                value={search}
                search
              />
            </div>
              <div><CustomButton onclick={()=>{setFaqModel(true),setDeleteId(null),setEditItem(null)}} className={"!text-[#fff]"} value={"Add FAQ's"}/></div>
              </div>
            <div className="w-full flex flex-col gap-10">
              <CustomAccordian
              setKey={setKey}
                expandIcon={({ isActive }) =>{
                  return(
                    <>
                    
                    { isActive ? (
                    <MinusOutlined
                      style={{
                        fontSize: "16px",
                        font: "bold",
                        color: "#214344",
                      }}
                    />
                  ) : (
                    <PlusOutlined
                      style={{
                        fontSize: "16px",
                        font: "bold",
                        color: "#214344",
                      }}
                    />
                  )}
                    </>
                  )  
                }
                 
                }
                items={faqData}
              />
            </div>
          </div>
      </div>

            <CustomModal closeIcon  footer={false} setOpen={setFaqModel} open={faqModel} modalBody={deleteId?<ConfirmationPopup setDeleteId={setDeleteId} confirmationPopUpHandler={deleteConfirmFaqHandler} setDeleteConfirm={setFaqModel} />:<AddFaq editItem={editItem} setFaqModel={setFaqModel}  />} width={"800px"}  align={"center"}/>

    </>
  );
};
export default FaqManagement;
