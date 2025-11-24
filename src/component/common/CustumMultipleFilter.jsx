import { Cascader } from "antd"

const CustomMultipleFilter=({onchange,option,placeholder})=>{
    return(
        <>
        <Cascader options={option} onChange={onchange} placeholder={placeholder} />
        </>
    )
}

export default CustomMultipleFilter;