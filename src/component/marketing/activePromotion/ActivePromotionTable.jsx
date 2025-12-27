import { useEffect, useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import {useDispatch, useSelector} from "react-redux"
import { deleteNewPromotionAsync, getAllPromotionAsync } from "../../../feature/marketing/marketingSlice";
import Cookies from "js-cookie";
import { isoToIST } from "../../../constants/constants";
import { Image, Space } from "antd";
import Loader from "../../loader/Loader";
import CustomPagination from "../../common/CustomPagination";
import { EditOutlined } from "@ant-design/icons";
import deleteIcon from ".././../../assets/icons/deleteIcon.png"
import CustomModal from "../../common/CustomModal";
import ConfirmationPopup from "../../common/ConfirmationPopup";
import { toast } from "react-toastify";
import CreateNewPromotion from "../CreateNewPromotion";

const ActivePromotionTable=()=>{
       const token=Cookies.get("token");  
      const dispatch=useDispatch();
      const [page,setPage]=useState(1);
      const [seletedId,setDeletedId]=useState("");
      const [edit,setEdit]=useState(false);
      const [promotionModel ,setPromotionModel]=useState(false);
      const {promotion,isLoading}=useSelector(state=>state?.marketing);
      const [edititem,setEditItem]=useState(null)
            console.log(edititem,"dfdsvgfvdh");
            
        const getActivePromotion=async()=>{
          try {
            const data={isActive:true,limit:10,page:page}
          const res=await dispatch(getAllPromotionAsync({token,data})).unwrap();
          
          } catch (error) {
            console.log(error);
           
          }
        }



         const confirmationPopUpHandler=async()=>{
           try {
            const res=await dispatch(deleteNewPromotionAsync({token,id:seletedId})).unwrap();
            if(res.status){
            toast.success(res.message);
            setPromotionModel(false);
            getActivePromotion();
          }
            
           } catch (error) {
            console.log(error);
            setPromotionModel(false);

            
           }
         }


        useEffect(()=>{
        getActivePromotion();
        },[page]);

     
     const columns = [
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Promocode"}/>
      ),
      dataIndex: "code",
      key: "code",
      width: 200,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Type"}/>

      ),
      dataIndex: "type",
      key: "type",
      align:"center",
      width: 200,
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Value"}/>

      ),
      dataIndex: "value",
      key: "value",
      width: 150,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Usage Limit"}/>,
      dataIndex: "usageLimit",
      key: "usageLimit",
      width: 150,
      align:"center",
      render: (text) =>   <CustomText value={text}/>
    },
    {
      title: (
          <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Used Count"}/>
      ),
      dataIndex: "usageCount",
      key: "usageCount",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={text}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Range"}/>),
      dataIndex: "maxOrderValue",
      key: "maxOrderValue",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text??"NA"}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Category"}/>),
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Expiry Date"}/>),
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={isoToIST(text)}/>
    },
     {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Status"}/>),
      dataIndex: "isActive",
      key: "isActive",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText className={"!text-[#088738] !text-[14px]"} value={"Active"}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Banner"}/>),
      dataIndex: "banner",
      key: "banner",
      width: 200,
      align: "center",
      render: (text) =>  <Image className="!size-[50px]"  src={text}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>),
      dataIndex: "action",
      align: "center",
      key: "action",
      width: 130,
      render: (_, record) => (
        <Space size="middle">
          <div
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => {
             setEdit(false), setPromotionModel(true),setDeletedId(record?._id);
            }}
          >
            <img src={deleteIcon} alt="deleteIcon"/>
          </div>
          <div
             onClick={()=>{setEdit(true),setEditItem(record),setPromotionModel(true)}}
            className="h-[20px] w-[20px] cursor-pointer"
          >
            <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
          </div>
        </Space>
      ),
     
     
    },
  ];
if(isLoading) return <Loader/>
    return(
        <>
        <CustomTable  scroll={{x:1700}}  dataSource={promotion?.promos} columns={columns}/>
        <CustomPagination pageNumber={page} total={promotion?.total} onchange={(e)=>{setPage(e)}}/>
       <CustomModal  footer={false} setOpen={setPromotionModel} open={promotionModel} modalBody={!edit?<ConfirmationPopup confirmationPopUpHandler={confirmationPopUpHandler} setOpen={setPromotionModel} />:<CreateNewPromotion edit={edit} edititem={edititem} setOpen={setPromotionModel}/>} width={edit?"1052px":"552px"} align={"center"}/>

         </>
    )
}
export default ActivePromotionTable;