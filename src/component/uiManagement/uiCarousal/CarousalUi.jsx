import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import HomeVideo from "./HomeVideo.jsx"
import MenCategory from "./MenCategoryUi.jsx";
import WoMenCategory from "./WomenCategoryUi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getHomeVideosAsync } from "../../../feature/uiManagement/UiManagementSlice.js";
import { useEffect } from "react";
import Cookies from "js-cookie";
const CarousalUi=()=>{
    const dispatch=useDispatch();
    const token=Cookies.get("token");
    const {homeVideos} =useSelector(state=>state?.ui);
    
    const getHomeVideos=async()=>{
        try {
            const res=await dispatch(getHomeVideosAsync({token})).unwrap();
            console.log(res);
            
            
        } catch (error) {
           console.log(error);
            
        }
    }



    useEffect(()=>{
        getHomeVideos()
    },[])
    return(
        <>
       <div className="flex flex-col gap-5 p-[24px]">
        <HomeVideo homeVideos={homeVideos}/>
        <MenCategory/>
        <WoMenCategory/>

       </div>
        </>
    )
}
export default CarousalUi;