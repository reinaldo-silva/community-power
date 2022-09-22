import { CaretRight } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

export interface ItemBreadcrumbs {
  description: string;
  to: string;
}

interface BreadcrumbsProps {
  data: ItemBreadcrumbs[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ data }) => {
  return (
    <nav className="w-full px-8 pb-2">
      <ol className="list-reset flex items-center">
        {data.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index !== 0 && (
              <CaretRight size={16} weight="bold" className="text-zinc-200" />
            )}
            <Link
              to={item.to}
              className="text-zinc-200 hover:underline capitalize mr-2"
            >
              {item.description}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
