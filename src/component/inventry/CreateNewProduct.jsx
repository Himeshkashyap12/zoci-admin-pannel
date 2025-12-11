import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import CustomText from "../common/CustomText";
import { Button, Col, Image, Row } from "antd";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelect";
import "./inventary.css";
import CustomLabel from "../common/CustomLabel";
import CustomRadio from "../common/CustomRadio";
import CustomImageUpload from "../common/CustomImageUpload";
import TextArea from "antd/es/input/TextArea";
import CustomButton from "../common/CustomButton";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAsync } from "../../feature/uiManagement/UiManagementSlice";
import { getImageUrlAsync } from "../../feature/media/mediaSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { createProductHandlerAsync, getAllProductByIdAsync, updateProductAsync } from "../../feature/inventaryManagement/inventarySlice";
import { compareNewAndOldObject } from "../../constants/constants";
const CreateNewProduct = () => {
  const {state}=useLocation();
  console.log(state,"status");
  
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const token=Cookies.get("token")
  const {category}=useSelector(state=>state?.ui);
  const {isCreateProductLoading,productById,error}=useSelector(state=>state?.inventary);
  const {isMediaLoading}=useSelector(state=>state?.media);
console.log(productById?.product);

  console.log(error,"bhhb");
  
  const [productInput,setProductInput]=useState({
    title: "",
    description: "",
    price: 0,
    sku: "",
    otherCharges: 0,
    productionSource:"",
    category: "",
    subCategory: "",
    yearOfDesign: 2025,
    collection: "",
    baseMetalType: "",
    metalColor: "",
    stone: "",
    designTags:"",
    weight: 0,
    size: "",
    quantity: 0,
    hudNo: "",
    madefor: "",
    exclusive: "",
    images: {
        modalImage: "",
        productImage: "",
        additional1: "",
        additional2: ""
    },
    video: []
  })
  console.log(productInput?.video);
  
 
  console.log(productInput);
  
  const madeForOption = [
    { label: "Men", value: "Men" },
    { label: "Women", value: "Women" },
    { label: "Unisex", value: "Unisex" },
  ];
  const exclusiveSelect = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  const categoryData=category?.categories?.map((item)=>{
    return {label:item?.title,value:item?.title}
  });


   const productInputHandler=(e)=>{
      const {name,value}=e.target;
      setProductInput({...productInput,[name]:value})
   }
  
  const getCategoryHandler=async()=>{
    try {
      const res=await dispatch(getCategoryAsync(token))
      
    } catch (error) {
      console.log(error);
      
    }
  }


   const handleUpload = async (e,status) => {
    console.log(status);
    
      const file = e.target.files[0];
        if (!file) return;
              try {
              const formData = new FormData();
              formData.append("productImages", file);
              const res=await dispatch(getImageUrlAsync({token,formData})).unwrap();
              if(res.message){
                  toast.success(res?.message) 
                  console.log(res);
                  
                 switch(status){
                  case "modelImage":
                           setProductInput({...productInput,images:{...productInput?.images,modalImage:res?.images[0]}})
                           break;
                  case "productImage":
                           setProductInput({...productInput,images:{...productInput?.images,productImage:res?.images[0]}})
                           break;
                 case "additionalImage1":
                           setProductInput({...productInput,images:{...productInput?.images,additional1:res?.images[0]}})
                           break;
                 case "additionalImage2":
                           setProductInput({...productInput,images:{...productInput?.images,additional2:res?.images[0]}})
                           break;
                 case "video":
                           setProductInput({...productInput,video:res?.images})
                           break;
                      
                 }
              }
              } catch (err) {
              console.error(err);
            }
      };
  const createProductHandler=async()=>{
   try {
    if(!state){
    const data={...productInput}
       const res=await dispatch(createProductHandlerAsync({token,data})).unwrap();
        if(res.status && res.status_code==201){
      toast.success(res.message);
      navigate("/admin/inventary")
        }else{
      {res?.response?.data?.errors.map((item)=>{
        return( toast.error(item))
      })}
      
    }
    
    }else{
      const updatedData=compareNewAndOldObject({oldObj:productById?.product,newObj:productInput})
      console.log(updatedData,"jbhvh");
       const res=await dispatch(updateProductAsync({token,data:updatedData,id:productById?.product?._id})).unwrap();

       if(res.status){
      toast.success(res.message);
      navigate("/admin/inventary")
    }
    }
   
    
   
   } catch (error) {
    console.log(error);
    
    toast.error("Something went wrong!")
    
   }
    
  }


  const getProductByIdData=async()=>{
    try {

      const res=await dispatch(getAllProductByIdAsync({token,id:state})).unwrap();
      
      if(res.success){
        setProductInput(res.product)
      }
   
   }
      
     catch (error) {
      console.log(err);
      
    }
  }
  useEffect(()=>{
   getProductByIdData();
  },[])

  useEffect(()=>{
     getCategoryHandler()
  },[])
  if(isMediaLoading || isCreateProductLoading) return <Loader/>
  return (
    <>
      <div className="flex flex-col gap-5 p-[24px]">
        <div className="flex gap-2 items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/admin/inventary");
            }}
          >
            <CustomText
              className={"!text-[#214344] !text-[20px]"}
              value={<LeftOutlined />}
            />
          </div>
          <CustomText
            className={"!text-[#214344] !text-[20px]"}
            value={
              "Inventory Management & Analysis → Create Products Individually "
            }
          />
        </div>
        <div className="product-form  xl:!w-[1024px] md:!w-[800px] sm:!w-[500px] !w-[400px]  mx-auto ">
          <div className="flex flex-col gap-[30px]">
            <div className="flex justify-center">
              <CustomText
                className={"!text-[#214344] !text-[30px] font-[500]"}
                value={"Create Product"}
              />
            </div>
            <Row gutter={[40, 40]}>
              <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
                <div className="flex flex-col gap-2">
                   <CustomLabel required value={"Prodution Source"} />
                   <CustomSelect value={productInput?.productionSource} onchange={(e)=>{setProductInput({...productInput,productionSource:e})}} options={[{label:"Company Custom",value:"Company Custom"},{label:"Vendor Custom",value:"Vendor Custom"}]} className="!rounded-full" />
                </div>
              </Col>
              <Col xxl={12} xl={12} md={12} sm={24} xs={24}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Prodution Category"} />
                  <CustomSelect value={productInput?.category} onchange={(e)=>{setProductInput({...productInput,category:e})}} options={categoryData} className="!rounded-full" />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Sub Category"} />
                   <CustomInput name={"subCategory"} value={productInput?.subCategory} onchange={(e)=>{productInputHandler(e)}}  className="!rounded-full" />

                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Year of Design"} />
                     <CustomInput
                        name="yearOfDesign"
                        value={productInput.yearOfDesign}
                        onchange={productInputHandler}
                        className="!rounded-full"
                      />

                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Base Metal Type"} />
                   <CustomInput name="baseMetalType"
                        value={productInput.baseMetalType}
                       onchange={productInputHandler} 
                       className="!rounded-full" />

                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Metal Color"} />
                  <CustomInput 
                   name="metalColor"
                    value={productInput.metalColor}
                    onchange={productInputHandler}
                      className="!rounded-full" />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel value={"Stone(if Any)"} />
                  <CustomInput name="stone"
                    value={productInput.stone}
                    onchange={productInputHandler} 
                    className="!rounded-full" />

                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Size"} />
                  <CustomInput  name="size"
                        value={productInput?.size}
                        onchange={productInputHandler}
                        className="!rounded-full" />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel value={"Part of any Collection(if any)"} />
                  <CustomInput  name="collection"
                       onchange={productInputHandler}
                       value={productInput?.collection}
                        className="!rounded-full" />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Quantity Avaliable"} />
                  <CustomInput name="quantity"
                      value={productInput?.quantity}
                      onchange={productInputHandler}
                      className="!rounded-full" />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel value={"Weight in Grams"} />
                  <CustomInput name="weight"
                      value={productInput?.weight}
                      onchange={productInputHandler}
                      className="!rounded-full" />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Price"} />
                  <CustomInput 
                   name="price"
                    value={productInput?.price}
                    onchange={productInputHandler}
                    className="!rounded-full" />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"HUD No."} />
                    <CustomInput name="hudNo"
                        value={productInput.hudNo}
                        onchange={productInputHandler}
                        className="!rounded-full" />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"SKU ID"} />
                    <CustomInput 
                    name="sku"
                  value={productInput.sku}
                  onchange={productInputHandler} className="!rounded-full" />

                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel value={"Other charges (If any)"} />
                  <CustomInput 
                  name="otherCharges"
                  value={productInput?.otherCharges}
                  onchange={productInputHandler}
                   
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Made For"} />
                  <CustomRadio name={"madefor"} value={productInput?.madefor} defaultValue={"men"} onchange={productInputHandler}  options={madeForOption} />
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel value={"Exclusive"} />
                  <CustomRadio name={"exclusive"} value={productInput?.exclusive} defaultValue={true} onchange={productInputHandler} options={exclusiveSelect} />
                </div>
              </Col>
            </Row>
            <div className="flex flex-col gap-[30px] bg-[#fff] p-[30px] rounded-md">
              <CustomText
                className={"!text-[18px] font-[500]"}
                value={"Upload Media Files"}
              />
              <Row gutter={[40, 40]}>
                <Col span={12}>
                  <div className="flex flex-col gap-2">
                    <CustomText
                      className={"!text-[#214344] !text-[16px]"}
                      value={"Model Image"}
                    />
                    <CustomImageUpload
                     imageUploadHandler={(e)=>{handleUpload(e,"modelImage")}}
                      label={
                        <div className="relative w-[20%]">
                        <Image
                          className="!size-[100px]"
                          preview={false}
                           src={productInput?.images?.modalImage==""?
                            "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764011866002_add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg":
                            productInput?.images?.modalImage
                          }
                        />
                        </div>
                      }
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex flex-col gap-2">
                    <CustomText
                      className={"!text-[#214344] !text-[16px]"}
                      value={"Product Image"}
                    />
                    <CustomImageUpload
                     imageUploadHandler={(e)=>{handleUpload(e,"productImage")}}c
                      label={
                        <Image
                          className="!size-[100px]"
                          preview={false}
                          src={productInput?.images?.productImage==""?
                            "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764011866002_add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg":
                            productInput?.images?.productImage
                          }
                        />
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[40, 40]}>
                <Col span={12}>
                  <div className="flex flex-col gap-2">
                    <CustomText
                      className={"!text-[#214344] !text-[16px]"}
                      value={"Additional Image 1"}
                    />
                    <CustomImageUpload
                     imageUploadHandler={(e)=>{handleUpload(e,"additionalImage1")}}
                      label={
                        <Image
                          className="!size-[100px]"
                          preview={false}
                           src={productInput?.images?.additional1==""?
                            "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764011866002_add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg":
                            productInput?.images?.additional1
                          }
                        />
                      }
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex flex-col gap-2">
                    <CustomText
                      className={"!text-[#214344] !text-[16px]"}
                      value={"Additional Image 2"}
                    />
                    <CustomImageUpload
                     imageUploadHandler={(e)=>{handleUpload(e,"additionalImage2")}}
                      label={
                        <Image
                          className="!size-[100px]"
                          preview={false}
                           src={productInput?.images?.additional2==""?
                            "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764011866002_add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg":
                            productInput?.images?.additional2
                          }
                        />
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className="flex flex-col gap-2">
                    <CustomText
                      className={"!text-[#214344] !text-[16px]"}
                      value={"Upload Video"}
                    />
                    <CustomImageUpload
                     imageUploadHandler={(e)=>{handleUpload(e,"video")}}
                      label={
                        productInput?.video?.length==0 ?
                        (<Image
                          className="!size-[100px]"
                          preview={false}
                          src={
                            "https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1764011866002_add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
                          }
                        />):(<video className="rounded-xl" autoPlay width="250">
                                <source src={productInput?.video[0]} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>)
                      
                      }
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <Row gutter={[40, 40]}>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Prodution Name"} />
                  <div className="relative">
                    <CustomInput 
                     name="title"
                        value={productInput?.title}
                        onchange={productInputHandler}
                    className="!rounded-full" />
                    <div className="absolute top-1 right-1">
                      <CustomButton
                      onclick={()=>{setProductInput({...productInput,title:null})}}
                        className={"!text-[#fff] !h-[24px] "}
                        value={"Refresh"}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Design Tags "} />
                  {/* <CustomInput className="!rounded-full" /> */}
                   <div className="relative">
                    <CustomInput 
                    name="designTags"
                        value={productInput?.designTags}
                        onchange={productInputHandler}
                    className="!rounded-full" />
                    <div className="absolute top-1 right-1">
                      <CustomButton
                      onclick={()=>{setProductInput({...productInput,designTags:null})}}
                        className={"!text-[#fff] !h-[24px] "}
                        value={"Refresh"}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={[40, 40]}>
              <Col span={24}>
                <div className="flex flex-col gap-2">
                  <CustomLabel required value={"Description"} />
                   <div className="relative">
                   <TextArea name="description" value={productInput?.description} onChange={productInputHandler} className="!min-h-[150px]" />
                    <div className="absolute bottom-2 right-2">
                      <CustomButton
                      onclick={()=>{setProductInput({...productInput,description:null})}}
                        className={"!text-[#fff] !h-[24px] "}
                        value={"Refresh"}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
           <div className="flex justify-center gap-[20px]">
              <CustomButton onclick={()=>{createProductHandler()}} className={"!text-[#fff] w-[300px]"} value={"Submit"}/>
              <Button className={"!text-[#214344] rounded-full w-[300px]"}>Cancel</Button>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateNewProduct;
