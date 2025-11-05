import { Button } from "antd";

const CustomButton = ({ value, onclick, className ,type,disable}) => {
  return (
    <div>
      <Button
         disabled={disable??false}
        className={`    font-semibold    !border-none rounded-full !bg-[#214344] ${className}`}
        onClick={onclick}
        type={type}
      >
        {value}
      </Button>
    </div>
  );
};
export default CustomButton;
