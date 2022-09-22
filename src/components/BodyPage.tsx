import classNames from "classnames";
import { SignIn, SignOut } from "phosphor-react";
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { useAuthContext } from "../context/Auth";
import { Breadcrumbs, ItemBreadcrumbs } from "./Breadcrumbs";

interface BodyPageProps {
  children: ReactNode;
  breadcrumbs?: ItemBreadcrumbs[];
}

const BodyPage: React.FC<BodyPageProps> = ({ children, breadcrumbs }) => {
  const { signOut, cookies } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <header className="min-h-[80px] w-full flex items-center justify-between px-4">
        <Link to="/">
          <img className="w-full h-8" src={Logo} alt="" />
        </Link>

        {pathname !== "/login" && (
          <div className="flex flex-col items-end gap-2">
            <button
              className={classNames(
                "flex items-center justify-center gap-2  font-bold",
                {
                  "text-orange-500": cookies.token,
                  "text-green-400": !cookies.token,
                }
              )}
              onClick={signOut}
            >
              {cookies.token ? (
                <>
                  Sair <SignOut size={24} weight="bold" />
                </>
              ) : (
                <>
                  Entrar <SignIn size={24} weight="bold" />
                </>
              )}
            </button>

            {cookies.name && (
              <span className="text-sm font-bold">{cookies.name}</span>
            )}
          </div>
        )}
      </header>

      {breadcrumbs && <Breadcrumbs data={breadcrumbs} />}

      <main className="flex flex-1 w-full h-[100vh-80px] max-w-[1200px] px-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default BodyPage;
