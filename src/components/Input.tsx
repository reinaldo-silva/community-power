import React, { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  children = "",
  placeholder,
  ...rest
}) => {
  return (
    <input
      className="px-4 h-14 w-full bg-slate-900 rounded-md"
      {...rest}
      placeholder={`${children} ${placeholder}`}
    />
  );
};

export { Input };
