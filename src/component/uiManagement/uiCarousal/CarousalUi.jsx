import { LeftOutlined } from "@ant-design/icons";
import CustomText from "../../common/CustomText";
import HomeVideo from "./HomeVideo.jsx"
import MenCategory from "./MenCategoryUi.jsx";
import WoMenCategory from "./WomenCategoryUi.jsx";
const CarousalUi=()=>{
    return(
        <>
       <div className="flex flex-col gap-5 p-[24px]">
        <HomeVideo/>
        <MenCategory/>
        <WoMenCategory/>

       </div>
        </>
    )
}
export default CarousalUi;