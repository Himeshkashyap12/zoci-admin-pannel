import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import CustomText from "./CustomText";
import { Image } from "antd";
const CustomSlider = ({EventSalesSlider}) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (
      swiperInstance &&
      swiperInstance.params &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative w-[95%] mx-auto">
      {/* Custom Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -left-10 z-10 transform -translate-y-1/2 cursor-pointer
                   "
      >
        <LeftOutlined  style={{fontSize:"16px",color:"#214344"}}/>
      </button>
      <button
        ref={nextRef}
        className="absolute top-1/2 -right-10 z-10 transform -translate-y-1/2 cursor-pointer"
      >
        <RightOutlined  style={{fontSize:"16px",color:"#214344"}}/>
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        onSwiper={setSwiperInstance} // 👈 capture swiper instance
      >
       {EventSalesSlider?.map((item,idx)=>{
        return(
            <SwiperSlide>
          <div className=" flex justify-between items-center px-20 ">
            <CustomText className={"!text-[24px] font-bold !text-[#214344] "} value={item?.sourceName??"-"}/>
            <CustomText className={"!text-[24px] font-bold !text-[#214344] "} value={item?.city??"Not mentioned"}/>
            <CustomText className={"!text-[24px] font-bold !text-[#214344] "} value={`Rs. ${item?.sales}`}/>
            <Image className="!size-[100px] object-cover" src={item?.image??"https://zoci-data.s3.ap-south-1.amazonaws.com/productImages/1763887620428_no-image-icon-6.png"}/>
            </div>
        </SwiperSlide>
        )
       }) }
        
       
      </Swiper>
    </div>
  );
};

export default CustomSlider;
