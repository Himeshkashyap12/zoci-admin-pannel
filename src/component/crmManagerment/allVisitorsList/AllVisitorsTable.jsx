import { useState } from "react";
import CustomTable from "../../common/CustomTable";
import CustomText from "../../common/CustomText";
import { useNavigate } from "react-router-dom";

const AllVisitorsTable=()=>{
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const navigate=useNavigate();
     const columns = [
         {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"S No."}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text) => <CustomText  value={1}/>
    },
    
    {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Product Name"}/>
      ),
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text) =>  <div className="cursor-pointer" onClick={()=>{navigate(`/admin/crm-all-visitors-list/${1}`)}}><CustomText value={"Product Name"}/></div>
    },
      {
      title: (
        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"SKU"}/>

      ),
      dataIndex: "sku",
      key: "sku",
      width: 150,
      render: (text) =>  <CustomText value={"Product Name"}/>
    },
    {
      title: (
       <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Size"}/>

      ),
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (text) =>  <CustomText value={"Product Name"}/>
    },
    {
      title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Price"}/>,
      dataIndex: "price",
      key: "price",
      width: 130,
      render: (text) =>   <CustomText value={"Product Name"}/>
    },
    {
      title: (
                <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Available Qut."}/>
      ),
      dataIndex: "quantity",
      key: "quantity",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={"Product Name"}/>
    },
    {
      title: ( <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Metal Type"}/>),
      dataIndex: "metalType",
      key: "metalType",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={"Product Name"}/>
    },
    {
      title: ( <CustomText className="!text-[14px] !text-[#fff] font-semibold" value={"Vendor"}/>),
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
      render: (text) => <CustomText value={"Product Name"}/>
    },
    {
      title: (   <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"In Stock"}/>),
      dataIndex: "category",
      key: "category",
      width: 200,
      align: "center",
      render: (text) =>  <CustomText value={"Product Name"}/>
    },
    {
      title: (<CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Action"}/>),
      dataIndex: "action",
      align: "center",
      key: "action",
      width: 130,
     
    },
  ];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }
];
 const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
 const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
    return(
        <>
              <CustomTable rowSelection={rowSelection}  dataSource={data} columns={columns}/>

        </>
    )
}
export default AllVisitorsTable;