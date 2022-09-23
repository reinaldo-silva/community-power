import { CircleNotch } from "phosphor-react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex w-fll justify-center flex-col items-center gap-4 h-52">
      <h4 className="text-lg">Aguarde</h4>
      <CircleNotch
        size={40}
        weight="bold"
        className="animate-spin text-teal-500"
      />
    </div>
  );
};

export { Loading };
