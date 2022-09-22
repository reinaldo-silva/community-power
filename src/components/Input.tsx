import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input className="px-4 h-14 w-full bg-slate-900 rounded-md" {...rest} />
  );
};

export default Input;
