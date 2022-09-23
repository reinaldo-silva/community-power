import React, { useEffect, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { CaretDown } from "phosphor-react";

interface DropdownItemProps {
  description: string;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  description,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <a
        href="#"
        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-white"
      >
        {description}
      </a>
    </li>
  );
};

interface DropdownProps {
  items: {
    id: number;
    description: string;
  }[];
  setChatSelected: (chatSelected: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, setChatSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, [window]);

  return (
    <div className="relative">
      <Button
        description="Selecione um chat"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <CaretDown weight="fill" size={18} />
      </Button>

      <div
        className={`${
          !isOpen && "hidden"
        } absolute z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-slate-900`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {items.map((item) => (
            <DropdownItem
              onClick={() => {
                setChatSelected(item.id);
                setIsOpen(false);
              }}
              description={item.description}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Dropdown };
