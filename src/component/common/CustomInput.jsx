import { Input } from "antd";


const CustomInput = ({ onchange, placeholder, type,size,inputValue ,name,className,addonBefore}) => {
  return (
    <>
        
        <Input
        name={name}
        size={size}
        type={`${type ?? "text"}`}
        onChange={onchange}
        placeholder={placeholder}
        value={inputValue}
        className={`${className}`}
        addonBefore={addonBefore}
        />

       
    </>
  );
};
export default CustomInput;
