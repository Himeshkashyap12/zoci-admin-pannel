
import { DatePicker, Space } from 'antd';
const CustomDate=({onchange,className})=>{
    return(
        <>
        <DatePicker  disabledDate={(current) => {
                      return current && current > new Date().setHours(0, 0, 0, 0);
                    }} 
                     className={`${className}`} onChange={onchange} />
        </>
    )
}
export default CustomDate;