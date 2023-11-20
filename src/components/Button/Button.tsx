// @ts-nocheck
import React, { FC, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fallback?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  type,
  loading,
  fallback,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex disabled:opacity-60 disabled:cursor-default items-center justify-center truncate ${
        className || ""
      }`}
    >
      {loading ? fallback : children}
    </button>
  );
};

export default Button;
