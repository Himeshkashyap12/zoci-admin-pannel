import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailRegex, specialChar } from "../../../constants/regex";
import { createOrderAsync } from "../../../feature/order/orderSlice";
import CustomButton from "../../common/CustomButton";
import CustomDate from "../../common/CustomDate";
import CustomInput from "../../common/CustomInput";
import CustomSelect from "../../common/CustomSelect";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
import { PlusCircleOutlined } from "@ant-design/icons";
import CustomModal from "../../common/CustomModal";
import CreateShipROcketLocation from "./CreateShipRocketLocation";
const CreateOrderAtShipRocket = ({ shipRocketAddress, orderItems, status ,item }) => {
  const [shipRocketModel,setShiprocketModel]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId=Cookies.get("orderId"); 
  const shipRocketToken = Cookies.get("shipRocketToken");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");
  const subTotalInitialValue = 0;
  const { isLoading } = useSelector((state) => state?.order);
  const subTotal = orderItems?.map((item) => {
      return subTotalInitialValue + item?.selling_price;
    })
    ?.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    console.log(item,"dfhg");
    
  const [error, setError] = useState({
    email: ""
  });
  const name=item?.customerName?.split(" ");
  
  const [orderInput, setOrderInput] = useState({
    order_id: orderId,
    order_date: formattedDate,
    billing_customer_name:name[0],
    billing_last_name:name[1],
    pickup_location: "",
    billing_address: item?.customerAddress,
    billing_city: item?.customerCity,
    billing_pincode: item?.customerPincode,
    billing_state: item?.customerState,
    billing_country: "INDIA",
    billing_email: item?.customerEmail,
    billing_phone: item?.customerMobile,
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: "Online",
    shipping_charges: null,
    giftwrap_charges: null,
    transaction_charges: null,
    total_discount: null,
    sub_total: subTotal,
    length: null,
    breadth: null,
    height: null,
    weight: null,
    tag: ""
  });

  
  const locationOption = shipRocketAddress?.map((item) => {
    return { label: item?.pickup_location, value: item?.pickup_location };
  });
  const paymentMethodOption = [
    { label: "UPI", value: "UPI" },
    { label: "Online", value: "Online" },
    { label: "Cash", value: "Cash" }
  ];
  const orderInputHandler = (e, item) => {
    const { name, value } = e.target;
    if (!item) {
      if (name != "billing_email" && name!="billing_address" && specialChar?.test(value)) return;
      name == "billing_email" && !emailRegex?.test(value)
        ? setError({ ...error, email: "Email is Wrong" })
        : setError({ ...error, email: "" });
      if (name == "billing_pincode" && value?.length > 6) return;
      if (name == "billing_phone" && value?.length > 10) return;
      setOrderInput({ ...orderInput, [name]: value });
    } else {
      setOrderInput({ ...orderInput, item: e });
    }
  };

  const cancelHandler=()=>{
    setOrderInput({ order_id: orderId,
    order_date: formattedDate,
    billing_customer_name: "",
    billing_last_name: "",
    pickup_location: "",
    billing_address: "",
    billing_city: "",
    billing_pincode: "",
    billing_state: "",
    billing_country: "INDIA",
    billing_email: "",
    billing_phone: "",
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: "Online",
    shipping_charges: null,
    giftwrap_charges: null,
    transaction_charges: null,
    total_discount: null,
    sub_total: subTotal,
    length: null,
    breadth: null,
    height: null,
    weight: null,
    tag: ""
  })
  }
  const submitOrderHandler = async () => {
    try {
      const data = {
        method: "POST",
        endpoint: "/v1/external/orders/create/adhoc",
        body: {
          ...orderInput,
        },
      };
      const res = await dispatch(
        createOrderAsync({ shipRocketToken, data })
      ).unwrap();
      if (res?.status_code == 1) {
        toast.success("Order Created Successfully");
        if (status == "makeToOrder") {
          navigate("/admin/make-order");
        } else {
          navigate("/admin/order-online");
        }
      } else {
        const errors=Object.values(res?.response?.data?.errors);
        errors?.map((item)=>{          
          return toast.error(item[0]);
        });
      }
    } catch (error) {
     toast.error("Something went wrong. Please try again.");  
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className="w-[70%] mx-auto pt-5">
      <div className="flex flex-col gap-7">
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Order Id"}
              />
              <CustomInput
                name="order_id"
                className="rounded-full !border-[#214344] "
                value={orderInput?.order_id}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Date"}
              />
              <CustomDate
                onchange={(e, value) =>
                  setOrderInput({ ...orderInput, order_date: value })
                }
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer First Name"}
              />
              <CustomInput
                name="billing_customer_name"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer First Name"
                value={orderInput?.billing_customer_name}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Last Name"}
              />
              <CustomInput
                name="billing_last_name"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer Last Name"
                value={orderInput?.billing_last_name}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2 ">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Pickup Location"}
              />
              <Row gutter={[20,20]} align={"center"} justify={"center"}>
                <Col span={22}>
                  <CustomSelect
                  value={orderInput?.pickup_location}
                  onchange={(e) => {
                    setOrderInput({ ...orderInput, pickup_location: e });
                  }}
                  options={locationOption}
                  className="!rounded-full w-full"
                />
                </Col>
                <Col span={2}>
                <div className="pt-1 cursor-pointer" onClick={()=>{setShiprocketModel(true)}}>
                        <PlusCircleOutlined style={{color:"#214345",fontSize:"24px"}} />
                   </div>

                </Col>
              </Row>
              
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Billing Address"}
              />
              <CustomInput
                name="billing_address"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Billing Address"
                value={orderInput?.billing_address}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Billing City"}
              />
              <CustomInput
                name="billing_city"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Billing City"
                value={orderInput?.billing_city}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
           <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Billing State"}
              />
              <CustomInput
                name="billing_state"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Billing State"
                value={orderInput?.billing_state}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
         
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Billing Pincode"}
              />
              <CustomInput
                name="billing_pincode"
                type={"number"}
                className="rounded-full !border-[#214344] "
                placeholder="Enter Billing Pincode"
                value={orderInput?.billing_pincode}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Payment Mode"}
              />
              <CustomSelect
                value={orderInput?.payment_method}
                onchange={(e) => {
                  setOrderInput({ ...orderInput, payment_method: e });
                }}
                options={paymentMethodOption}
                placeholder="Payment Mode"
                className="!rounded-full"
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Billing Email"}
              />
              <CustomInput
                name="billing_email"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Billing Email"
                value={orderInput?.billing_email}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
              {error?.email && orderInput?.billing_email != "" && (
                <CustomText
                  className={"!text-[12px] !text-[red]"}
                  value={error?.email}
                />
              )}
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Customer Phone Number"}
              />
              <CustomInput
                type={"number"}
                name="billing_phone"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Customer Phone Number"
                value={orderInput?.billing_phone}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
              {error?.phone && orderInput?.billing_phone != "" && (
                <CustomText
                  className={"!text-[12px] !text-[red]"}
                  value={error?.phone}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Shipping Charges"}
              />
              <CustomInput
                type={"number"}
                name="shipping_charges"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Shipping Charges"
                value={orderInput?.shipping_charges}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Giftwrap Charges"}
              />
              <CustomInput
                type={"number"}
                name="giftwrap_charges"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Giftwrap Charges"
                value={orderInput?.giftwrap_charges}
                onchange={(e) => {
                  orderInputHandler(e)
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Transaction Charges"}
              />
              <CustomInput
                type={"number"}
                name="transaction_charges"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Transaction Charges"
                value={orderInput?.transaction_charges}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Total Discount"}
              />
              <CustomInput
                type={"number"}
                name="total_discount"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Total Discount"
                value={orderInput?.total_discount}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Sub Total"}
              />
              <CustomInput
                type={"number"}
                name="sub_total"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Sub Total"
                value={orderInput?.sub_total}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Parcel length"}
              />
              <CustomInput
                type={"number"}
                name="length"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Parcel Length"
                value={orderInput?.length}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Parcel Breadth"}
              />
              <CustomInput
                type={"number"}
                name="breadth"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Parcel Breadth"
                value={orderInput?.breadth}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Parcel height"}
              />
              <CustomInput
                type={"number"}
                name="height"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Parcel Height"
                value={orderInput?.height}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row gutter={[40, 40]}>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Parcel weight"}
              />
              <CustomInput
                type={"number"}
                name="weight"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Parcel Weight"
                value={orderInput?.weight}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="flex flex-col gap-2">
              <CustomText
                className={"text-[#214344] !font-[600] !text-[14px]"}
                value={"Parcel tag"}
              />
              <CustomInput
                name="tag"
                className="rounded-full !border-[#214344] "
                placeholder="Enter Parcel Tag"
                value={orderInput?.tag}
                onchange={(e) => {
                  orderInputHandler(e);
                }}
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
                className={"!bg-[#214344] !text-[#fff] w-[250px]"}
                onclick={() => {
                  submitOrderHandler();
                }}
                value={"Submit"}
              />
            </div>
          </Col>
        </Row>
      </div>

            <CustomModal closeIcon  footer={false} setOpen={setShiprocketModel} open={shipRocketModel} modalBody={<CreateShipROcketLocation item={item} setShiprocketModel={setShiprocketModel} />} width={"700px"}  align={"center"}/>

    </div>
  );
};
export default CreateOrderAtShipRocket;
