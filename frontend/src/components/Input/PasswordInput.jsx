import { useState } from "react";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <FaLock className="opacity-70" />
        <input
          type={isShowPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Password"}
          className="grow"
        />
        {isShowPassword ? (
          <FaRegEye
            className="cursor-pointer text-sky-500"
            onClick={toggleShowPassword}
          />
        ) : (
          <FaRegEyeSlash
            className="cursor-pointer "
            onClick={toggleShowPassword}
          />
        )}
      </label>
    </div>
  );
};

export default PasswordInput;
