import React from "react";
import { BodyPage } from "../components/BodyPage";
import { Input } from "../components/Input";

const Creative: React.FC = () => {
  return (
    <BodyPage breadcrumbs={[{ description: "Creative", to: "/creative" }]}>
      <div className="flex w-full gap-2">
        <nav className="bg-slate-800 w-[300px] rounded-md shadow-md p-4">
          <Input placeholder="Digite aqui">Icone</Input>
        </nav>
        <div className="bg-pink-400 flex flex-1">Conteudo</div>
      </div>
    </BodyPage>
  );
};

export default Creative;
