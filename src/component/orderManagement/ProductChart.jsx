

import React from "react";
import Chart from "react-apexcharts";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import calender from "../../assets/chart/calender.png"
import { Avatar, Image } from "antd";
const ProductChart=({exchangedCategories})=>{  
      const options = {
    chart: {
      id: "basic-line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: exchangedCategories?.categories?.map((item)=>item?.name),
    },

    // color for the series
    colors: ["#E8EDF5"],
    // stroke goes inside options
    stroke: {
      curve: "smooth",
      width: 3,
    },

    // hide Y axis: turn off axis, labels, ticks, border
    yaxis: {
      show: false,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // hide horizontal grid lines produced by Y axis
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },

    // optional clean look
    legend: { show: false },
    tooltip: { enabled: true },
  };

  const series = [
    {
      name: "series-1",
      data: exchangedCategories?.categories?.map((item)=>item?.value),
    },
  ];

    return(
  <div className="bg-[#fff] rounded-md p-[24px] w-full">
    <div className="flex flex-col gap-[20px]">
    <div className="flex justify-between items-center">
       <CustomText className={"!text-[20px] text-[#0D141C] font-[500]"} value={"Product Exchanged In Categories"}/>
       {/* <CustomButton value={<div className="flex gap-2 items-center"> */}
        {/* <Image preview={false} className="!size-[16px] object-cover"  src={calender}/> */}
        {/* <CustomText className={"!text-[#fff]"} value={"Last 7 days"}/> */}
        {/* </div>}/> */}
    </div>
    <div className="flex flex-col gap-4">
       <CustomText className={"!text-[30px] text-[#0D141C] font-[700]"} value={`+ ${exchangedCategories?.percent}`}/>
       <div className="flex gap-2 items-center">
       <CustomText className={"!text-[16px] !text-[#214344] font-[300]"} value={"Last 30 Days"}/>
       <CustomText className={"!text-[20px] !text-[#088738] font-[500]"} value={`+ ${exchangedCategories?.last30Days}`}/>
       </div>
    </div>
    <div>
   <Chart height={200} options={options} series={series} type="bar"  />
   </div>
   </div>
   </div>)
}

export default ProductChart;