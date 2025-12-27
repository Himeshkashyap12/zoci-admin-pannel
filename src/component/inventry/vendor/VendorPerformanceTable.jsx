import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../common/CustomPagination";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import Loader from "../../loader/Loader";
const VendorPerformanceTable=({page,setPage})=>{
  const navigate=useNavigate();
      const {vendorPerformance,isLoading}=useSelector(state=>state?.inventary);            
      const vendorData=vendorPerformance?.data?.map((item)=>{
    return {...item,key:item?.vendorId}
  })
    const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 70,
      align:"center",
      render: (_,text,idx) =>  <CustomText  value={idx+1}/>
    },
   
      {
      title: (
       <div > <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Vendor"}/></div>

      ),
      dataIndex: "vendorName",
      key: "vendorName",
      width: 200,
      render: (_,text) => {        
        return (
            <div className="cursor-pointer" onClick={()=>{navigate(`/admin/vendor-performance/${text?.phoneNumber}`)}}><CustomText value={text?.vendorName}/></div>
        )
      } 
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"SKU Quantity"}/>

      ),
      dataIndex: "skuQuantity",
      key: "skuQuantity",
      width: 180,
      align:"center",
      render: (text) =>  <CustomText value={text}/>
    },
  
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Quantity"}/>
      ),
      dataIndex: "productQuantity",
      key: "productQuantity",
      width: 180,
      align: "center",
      render: (text) =>  <CustomText value={` ${text}`}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Average Rating"}/>),
      dataIndex: "averageRating",
      key: "averageRating",
      width: 150,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Total Sales"}/>),
      dataIndex: "totalSales",
      key: "totalSales",
      width: 180,
      align: "center",
      render: (text) => <CustomText value={text}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Revenue"}/>),
      dataIndex: "revenue",
      key: "revenue",
      width: 300,
      align: "center",
      render: (text) =>  <CustomText value={`Rs. ${text}`}/>
    },
  
     
  ];
  if(isLoading) return <Loader/>
    return(
        <>
              <CustomTable scroll={{x:1400}} dataSource={vendorData} columns={columns}/>
              <CustomPagination pageNumber={page} total={vendorPerformance?.totalVendors} onchange={(e)=>{setPage(e)}}/>

        </>
    )
}
export default VendorPerformanceTable;