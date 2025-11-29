import CustomTable from "../../../common/CustomTable";
import CustomText from "../../../common/CustomText";

const MakeToOrderDetailsTable=({item})=>{


   const columns = [
    
    {
      title: <CustomText value="SNo." className="!text-[14px] !text-white font-semibold" />,
      key: "sno",
      width: 80,
      render: (_, __, index) => <CustomText value={`${index + 1}.`} />
    },

    {
      title: <CustomText value="Customer Comment" className="!text-[14px] !text-white font-semibold" />,
      dataIndex: "productName",
      key: "productName",
      render: (value) => (
        <div className="flex flex-col">
          <CustomText value={value} />
        </div>
      ),
    },

    {
      title: <CustomText value="Advance Payment" className="!text-[14px] !text-white font-semibold" />,
      dataIndex: "advancePayment",
      key: "advancePayment",
      render: (value) => <CustomText value={`Rs. ${value}`} />,
    },

    {
      title: <CustomText value="Due Payment" className="!text-[14px] !text-white font-semibold" />,
      dataIndex: "duePayment",
      key: "duePayment",
      render: (value) => <CustomText value={`Rs. ${value}`} />,
    },

    {
      title: <CustomText value="Date" className="!text-[14px] !text-white font-semibold" />,
      dataIndex: "date",
      key: "date",
      render: (value) => <CustomText value={value} />,
    },

    {
      title: <CustomText value="Total price" className="!text-[14px] !text-white font-semibold" />,
      dataIndex: "price",
      key: "price",
      render: (value) => <CustomText value={`Rs. ${value}`} />,
    },
  ];
    
    return(
        <>
              <CustomTable   dataSource={item} columns={columns}/>


        </>
    )
} 
export default MakeToOrderDetailsTable;