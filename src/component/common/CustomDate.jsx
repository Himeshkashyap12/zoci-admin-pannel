
import { DatePicker, Space } from 'antd';
const CustomDate=({onchange,className})=>{
    return(
        <>
        <DatePicker className={`${className}`} onChange={onchange} />
        </>
    )
}
export default CustomDate;