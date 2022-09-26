import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  description: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ description, children, ...rest }) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 w-full rounded-md text-sm uppercase font-bold hover:shadow-xl transition disabled:opacity-50 flex gap-2 justify-center items-center disabled:cursor-not-allowed"
      {...rest}
    >
      <span>{description}</span>

      {children && <span>{children}</span>}
    </button>
  );
};

export { Button };
