import CustomTable from "../common/CustomTable";
import CustomText from "../common/CustomText";
import SignatureUi from "./SignatureUi";
import UiCollection from "./UiCollection";

const CollectionTable=()=>{
    const dataSource = [
  {
    key: '1',
    name: <UiCollection/>,
    age: <SignatureUi/>,
  },
  
];


const columns = [
  {
    title:        <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Collection"}/>
,
    dataIndex: 'name',
    key: 'name',
    width:600,
  },
  {
    title:  <CustomText  className="!text-[14px] !text-[#fff] font-semibold" value={"Signature"}/>,
    dataIndex: 'age',
    key: 'age',
    width:600,

  }
];
    return(
        <>
       
       <CustomTable dataSource={dataSource} columns={columns}/>
        </>
    )
}
export default CollectionTable;