import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import uiManagement from "../../assets/uiiManagement/card.png"
import { Image } from "antd";
import CustomModal from "../common/CustomModal";
import AddNewCollection from "./AddNewCollection";
import { useState } from "react";
const UiCollection=()=>{
    const [collectionModel,setCollectionModel]=useState();
    return(
        <div className="bg-[#EFE6DC]">
        <div className="flex gap-2 px-[20px] bg-[#fff] py-[20px]" onClick={()=>{setCollectionModel(true)}}>
            <PlusOutlined style={{fontSize:"18px" }}/>
            <CustomText className={"text-[16px] font-semibold !text-[#214344] "} value={"Add Collection"}/>

        </div>
        <div className="flex flex-col gap-1  ">
            {[1,2,3,4]?.map((item)=>{
                return(
                    <>
                    <div className="flex justify-between items-center bg-[#fff] px-[20px]">
                        <div className="flex gap-[10px] items-center">
                            <Image preview={false} className="!size-[100px]" src={uiManagement}/>
                            <CustomText className={"text-[16px]  !text-[#214344] "} value={"Signature (9)"}/>

                        </div>
                        <div>
                            <MoreOutlined style={{fontSize:"24px"}} />
                        </div>
                    </div>
                    </>
                )
            })}
           <div>

           </div>
        </div>
            <CustomModal closeIcon  footer={false} setOpen={setCollectionModel} open={collectionModel} modalBody={<AddNewCollection setOpen={setCollectionModel}/>} width={"700px"}  align={"center"}/>

        </div>
        
    )
}
export default UiCollection;