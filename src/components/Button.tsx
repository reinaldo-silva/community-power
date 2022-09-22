import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  description: string;
}

const Button: React.FC<ButtonProps> = ({ description, ...rest }) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 w-full mt-4 rounded-md text-sm uppercase font-bold hover:shadow-xl transition disabled:opacity-50"
      {...rest}
    >
      {description}
    </button>
  );
};

export { Button };
