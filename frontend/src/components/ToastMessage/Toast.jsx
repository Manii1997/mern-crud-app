import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const Toast = ({ isShow, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-10 right-4 transition-all duration-300 ${
        isShow ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`min-w-72 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === "delete" ? "after:bg-red-50" : "after:bg-green-50"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDelete className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
