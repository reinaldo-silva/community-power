import React, { FormEvent, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BodyPage } from "../components/BodyPage";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../service/api";

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([] as string[]);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const { data } = await api.post("users", { name, password, email });

      setIsLoading(false);

      if (data.message) {
        Array.isArray(data.data.message)
          ? setErrorMessages(data.data.message)
          : setErrorMessages([data.data.message]);
        return;
      }

      navigate("/login");
    },
    [email, password]
  );

  return (
    <BodyPage>
      <div className="w-full flex h-auto flex-col justify-center items-center gap-4">
        <div className="bg-slate-800 w-[400px] h-auto p-8 shadow-lg rounded-md">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-4 w-full"
            autoComplete="off"
          >
            <h2 className="text-3xl text-zinc-100 mb-4 w-full text-center font-bold">
              Novo cadastro
            </h2>

            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              name="name"
              id="name"
              autoComplete="off"
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              name="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              name="new-password"
              autoComplete="off"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button description="Entrar" disabled={isLoading} />

            <Link to="/login" className="font-bold hover:underline text-sm">
              Já tenho uma conta
            </Link>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          {errorMessages.map((message) => (
            <div className="p-4 bg-red-300 rounded-md border-4 border-red-500 text-red-500 font-bold text-md capitalize">
              <h1>{message}</h1>
            </div>
          ))}
        </div>
      </div>
    </BodyPage>
  );
};

export { SignUp };
