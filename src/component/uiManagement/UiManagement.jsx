import {useNavigate} from "react-router-dom";
import CustomText from "../common/CustomText.jsx";
import { useState } from "react";
import UiManagementButton from "./UiManagementButton.jsx";
import UiManagementFilter from "./UiManagementFilter.jsx";
import CollectionTable from "./CollectionTable.jsx";
import CarousalUi from "./uiCarousal/CarousalUi.jsx";
const UiManagement=()=>{
    const [collection,setCollection]=useState(true)
    return(
        <>
      <div className="flex flex-col gap-5 p-[24px]">
        <CustomText
          className={"!text-[#214344] !text-[20px]"}
          value={"Ui Management"}
        />
        <UiManagementButton setCollection={setCollection} collection={collection}/>
        {collection && <UiManagementFilter/>}
       {collection? <CollectionTable/>:<CarousalUi/>}
      </div>
     
        </>
    )
}
export default UiManagement;