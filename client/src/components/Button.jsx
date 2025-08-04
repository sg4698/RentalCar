import React from "react";

const Button = ({
  type = "button",
  onClick,
  children,
  loading = false,
  disabled = false,
  className = "",
  colorClass = "bg-blue-600 hover:bg-blue-700 text-white",
}) => {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors duration-200";

  const cursorClass =
    loading || disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer";

  const combinedClass = `${baseClasses} ${colorClass} ${cursorClass} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClass}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
