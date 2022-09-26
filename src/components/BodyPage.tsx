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
  const { signOut, cookies, chatsInfo } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="w-full flex flex-col  bg-slate-900 shadow-md">
        <header className="min-h-[80px] w-full flex items-center justify-between px-4 gap-8">
          <div className="flex items-center gap-8 flex-1">
            <Link to="/">
              <img className="w-full h-8" src={Logo} alt="" />
            </Link>
            <div className="flex justify-end flex-1 gap-4">
              <div className="px-4 ">
                <Link
                  to="/creative"
                  className="text-sm font-bold hover:underline transition uppercase"
                >
                  creative
                </Link>
              </div>

              <Link
                to="/chats"
                className="bg-slate-700 hover:bg-sky-800 rounded-full text-sm transition hover:shadow-md relative z-10 h-6 px-2 flex justify-center items-center"
              >
                {chatsInfo
                  .map((chat) => chat.messagesCount)
                  .reduce((total, num) => total + Math.round(num), 0) > 0 && (
                  <span className="animate-ping absolute bg-gradient-to-r from-pink-500 to-orange-500 rounded-full h-5 w-10"></span>
                )}
                <h2 className="font-bold">Chats</h2>
              </Link>
            </div>
          </div>

          {pathname !== "/login" && (
            <div className="flex flex-col items-end gap-2">
              <button
                className={classNames(
                  "flex items-center justify-center gap-2  font-bold",
                  {
                    "text-orange-500": cookies.token,
                    "text-teal-500": !cookies.token,
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
      </div>

      <main className="flex flex-1 w-full h-[100vh-80px] max-w-[1200px] p-8  overflow-y-auto justify-center">
        {children}
      </main>
    </div>
  );
};

export { BodyPage };
