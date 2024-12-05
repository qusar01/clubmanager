import React, { useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const typeClasses = {
    success: "border-green-500 text-green-700 bg-green-100",
    error: "border-red-500 text-red-700 bg-red-100",
    warning: "border-yellow-500 text-yellow-700 bg-yellow-100",
    info: "border-blue-500 text-blue-700 bg-blue-100",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast toast-top toast-end animate-in fade-in zoom-in z-50 !-top-4">
      <div
        className={`alert rounded-lg border-2 px-4 py-2 shadow-md ${typeClasses[type]}`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
