import { Col, Row } from "antd";
import CustomText from "../../common/CustomText";
import CustomInput from "../../common/CustomInput";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomButton from "../../common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { addAddressAsync, getAddressAsync } from "../../../feature/order/orderSlice";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { emailRegex, specialChar } from "../../../constants/regex";
const CreateShipROcketLocation=({setShiprocketModel,item})=>{
    const {state}=useLocation();    
    const dispatch=useDispatch();
     const [error, setError] = useState({
            email: "",
            address:""
      });
    const shipRocketToken = Cookies.get("shipRocketToken");
  const { addAddressIsLoading,isLoading } = useSelector((state) => state?.order);
    const [locationInput,setLocationInput]=useState({
        pickup_location: item?.billingPlace,
        name: item?.customerName,
        email:item?.customerEmail,
        phone: item?.customerMobile,
        address: item?.customerAddress,
        address_2: "",
        city: item?.customerCity,
        state: item?.billingPlace,
        country: "India",
        pin_code: item?.customerPincode
    })


    const createLocationHandler=(e)=>{
        const {name,value}=e.target;
        if (name != "email" && specialChar?.test(value)) return;
              name == "email" && !emailRegex?.test(value)
                ? setError({ ...error, email: "Email is Wrong" })
                : setError({ ...error, email: "" });
              if (name == "pin_code" && value?.length > 6) return;
              if (name == "phone" && value?.length > 10) return;
               (name == "address" && value?.length < 10)? setError({...error,address:"Address should be min 10 character"}):
              setError({...error,address:""});
              setLocationInput({...locationInput,[name]:value});
    }
    const submitCreateLocation=async()=>{
         if(!locationInput?.pickup_location ||
                    !locationInput?.name ||
                    !locationInput?.email ||
                    !locationInput?.phone ||
                    !locationInput?.address ||
                    !locationInput?.address_2 ||
                    !locationInput?.city ||
                    !locationInput?.state ||
                    !locationInput?.country ||
                    !locationInput?.pin_code) return toast.error("Please fill all field!")
         try {
            const data={
                method: "POST",
                endpoint: "/v1/external/settings/company/addpickup",
                body:{
                  ...locationInput
                }
            }
          const res=await dispatch(addAddressAsync({shipRocketToken,data})).unwrap();
          if(res?.success){
             toast.success("Location Created Successfully !");
             setShiprocketModel(false);
             const data={  
            method: "GET",
            endpoint: "/v1/external/settings/company/pickup"
            }
             dispatch(getAddressAsync({data,shipRocketToken}))
          }else{
            const shipRocketError=JSON.parse(res?.response?.data?.message);
            const locationError=Object.values(shipRocketError);            
            locationError?.map((item)=>{
                return  toast.error(item[0]);
            })            
          }
         
       } catch (error) {
        toast.error("Something went wrong. Please try again."); 
       }
        
    }

    const cancelHandler=()=>{
        setLocationInput({
        pickup_location: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        pin_code: ""
    }) 
    setShiprocketModel(false);
    }

   if(isLoading) return <Loader/>
    return(
        <>

        <div className="flex gap-2 items-center ">
       
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Create Location To Shiprocket"}
        />
      </div>
        <div className="w-[100%] mx-auto pt-5">
       <div className="flex flex-col gap-7">
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Pickup Location"}
              />
              <CustomInput
                name="pickup_location"
                placeholder={"Enter Pickup Location"}
                value={locationInput?.pickup_location}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Name"}
              />
              <CustomInput
                name="name"
                placeholder={"Enter Customer Name"}
                value={locationInput?.name}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
              />
            </div>
          </Col>
        </Row>
         <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Email"}
              />
              <CustomInput
                name="email"
                placeholder={"Enter Customer Email"}
                value={locationInput?.email}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
              />
            </div>
            {error?.email && locationInput?.email != "" && (
                <CustomText
                  className={"!text-[12px] !text-[red]"}
                  value={error?.email}
                />
              )}
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Phone Number"}
              />
              <CustomInput
                type={"number"}
                name="phone"
                placeholder={"Enter Customer Phone Number"}
                value={locationInput?.phone}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
              />
            </div>
          </Col>
        </Row>
         <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Address Line 1"}
              />
              <CustomInput
                name="address"
                value={locationInput?.address}
                onchange={(e)=>{createLocationHandler(e)}}
                placeholder={" House No. / Flat No. / Road No. "}
                className="rounded-full !border-[#214344]"
              />
            </div>
             {error?.address && locationInput?.address != "" && (
                <CustomText
                  className={"!text-[12px] !text-[red]"}
                  value={error?.address}
                />
              )}
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Address Line 2"}
              />
              <CustomInput
                name="address_2"
                value={locationInput?.address_2}
                onchange={(e)=>{createLocationHandler(e)}}
                placeholder={"Address Line 2 "}
                className="rounded-full !border-[#214344]"
              />
            </div>
          </Col>
        </Row>
         <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"City"}
              />
              <CustomInput
                name="city"
                value={locationInput?.city}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
                placeholder={"Enter City"}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"State"}
              />
              <CustomInput
                name="state"
                value={locationInput?.state}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
                placeholder={"Enter State"}
              />
            </div>
          </Col>
        </Row>
         <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Country"}
              />
              <CustomInput
                name="country"
                value={locationInput?.country}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
                placeholder={"Enter Country"}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Pincode"}
              />
              <CustomInput
                type={"number "}
                name="pin_code"
                value={locationInput?.pin_code}
                onchange={(e)=>{createLocationHandler(e)}}
                className="rounded-full !border-[#214344]"
                placeholder={"Enter Pincode"}

              />
            </div>
          </Col>
        </Row>
         <Row>
          <Col span={24}>
            <div className="flex justify-center items-center gap-3 py-5">
              <CustomButton
                onclick={()=>{cancelHandler()}}
                className={"!bg-[#214344] !text-[#fff] w-[250px]"}
                value={"Cancel"}
              />
              <CustomButton
              disable={addAddressIsLoading?true:false}
                className={"!bg-[#214344] !text-[#fff] w-[250px]"}
                onclick={() => {
                  submitCreateLocation();
                }}
                value={addAddressIsLoading?"Loading...":"Submit"}
              />
            </div>
          </Col>
        </Row>
        </div>
      </div>

        </>
    )
}
export default CreateShipROcketLocation;