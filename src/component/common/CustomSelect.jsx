

import { Select } from "antd";
const CustomSelect = ({
  options = [],
  onchange,
  className = "",
  placeholder = "Select an option",
  value,
  required
}) => {
  return (
    <Select
      // defaultValue="lucy"
      value={value}
      onChange={onchange}
      options={options}
      className={`${className}`}
      placeholder={placeholder}
      
    />
  );
};

export default CustomSelect;