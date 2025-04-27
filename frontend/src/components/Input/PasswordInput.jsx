import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 py-2 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-1 mr-3  outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={26}
          className="text-primary cursor-pointer ml-2 text-blue-600"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={26}
          className="text-primary cursor-pointer ml-2 text-blue-600"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
