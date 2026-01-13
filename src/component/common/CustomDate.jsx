
import { DatePicker, Space } from 'antd';
const CustomDate=({onchange,className,less=false})=>{
    return(
        <>
        <DatePicker disabledDate={(current) => {
        const today = new Date().setHours(0, 0, 0, 0);

        if (!current) return false;

        return less
          ? current.valueOf() < today   // past dates disabled
          : current.valueOf() > today;  // future dates disabled
      }} 
                     className={`${className}`} onChange={onchange} />
        </>
    )
}
export default CustomDate;