import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CustomText from "../common/CustomText";
import { MoreOutlined } from "@ant-design/icons";
// import CustomText from "../common/CustomText";
import uiManagement from "../../assets/uiiManagement/card.png"
import deleteIcon from "../../assets/icons/deleteIcon.png"

import { Image } from "antd";
const SignatureUi=()=>{
    return(
        <>
       <div className="bg-[#EFE6DC]">
        <div className="flex gap-2 px-[20px] bg-[#fff] py-[20px]">
            <PlusOutlined style={{fontSize:"18px" }} />
            <CustomText className={"text-[16px] font-semibold !text-[#214344] "} value={"Add New Item"}/>
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
                        <div className="flex items-center gap-2">
                             <div
                                    className="h-[20px] w-[20px] cursor-pointer"
                                    
                                >
                                    <img src={deleteIcon} alt="deleteIcon"/>
                                </div>
                                <div
                                    className="h-[20px] w-[20px] cursor-pointer"
                                >
                                    <EditOutlined style={{ color: "#214344", fontSize: "24px" }} />
                                </div>
                        </div>
                    </div>
                    </>
                )
            })}
           <div>

           </div>
        </div>

        </div>
        </>
    )
}
export default SignatureUi;