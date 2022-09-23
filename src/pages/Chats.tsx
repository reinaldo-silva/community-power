import { Plus } from "phosphor-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BodyPage } from "../components/BodyPage";
import { Button } from "../components/Button";
import { Dropdown } from "../components/Dropdown";
import { Input } from "../components/Input";
import { socket, useAuthContext } from "../context/Auth";
import { chats } from "../utils/chatsData";

interface ChatCardProps {
  description: string;
  totalMessages: number;
  users: String[];
  isOnline: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({
  description,
  totalMessages,
  users,
  isOnline,
}) => {
  return (
    <div className="relative w-[300px] bg-sky-800 h-16 rounded-md flex justify-between px-6 items-center uppercase font-bold">
      <div className="flex flex-col">
        {description}
        <small
          className={`${
            isOnline ? "text-emerald-400" : "text-rose-500"
          } lowercase leading-tight`}
        >
          {isOnline ? "online" : "offline"}
        </small>
      </div>
      <div className="flex ">
        {users.slice(0, 3).map((user, key) => (
          <div key={key} className="flex">
            <div
              className={`w-8 h-8 bg-slate-900 rounded-full flex justify-center items-center`}
            >
              {user.substring(0, 1)}
            </div>
            {users.length > 3 && key === 2 && (
              <div className="w-8 h-8 bg-slate-900 rounded-full flex justify-center items-center">
                <Plus weight="bold" />
              </div>
            )}
          </div>
        ))}

        {users.length === 0 && (
          <small className="flex justify-end text-[12px] w-[120px]">
            Nenhum usuário conectado
          </small>
        )}
      </div>

      <div className="text-sm absolute w-8 h-8 flex justify-center items-center top-[-10px] right-[-10px] bg-gradient-to-r from-pink-500 to-orange-500 p-1 rounded-full">
        {totalMessages}
      </div>
    </div>
  );
};

const Chats: React.FC = () => {
  const [chatSelected, setChatSelected] = useState(0);
  const navigate = useNavigate();
  const { name, setName, chatsInfo } = useAuthContext();

  const joinChat = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      navigate(`/chats/${chatSelected}`);
    },
    [chatSelected]
  );

  useEffect(() => {
    const arrayIds: String[] = [];

    if (!chatsInfo[0]) {
      socket.emit("getChats");
    }

    chatsInfo[0] &&
      chatsInfo.forEach((chat) => {
        chat.usersSocketIds.forEach((e) => arrayIds.push(e));
      });

    arrayIds.findIndex((id) => id === socket.id) >= 0 && socket.emit("leave");
  }, [chatsInfo]);

  return (
    <BodyPage breadcrumbs={[{ description: "Chats", to: "/chats" }]}>
      <div className="py-8 flex justify-around w-full">
        <form className="w-[400px] flex flex-col gap-6" onSubmit={joinChat}>
          <h2 className="text-gray-100 font-bold text-lg">Community chats</h2>

          <div className="flex flex-col justify-center">
            <h3
              className={`${
                chatSelected !== 0
                  ? "border-teal-500 text-teal-500"
                  : "border-slate-300"
              }  border-4 font-extrabold w-full px-4 h-16 rounded-md text-center flex justify-center items-center`}
            >
              {chatSelected === 0
                ? "Selecione um chat"
                : chats.find((chat) => chat.id === chatSelected)?.description}
            </h3>
            <Dropdown items={chats} setChatSelected={setChatSelected} />
          </div>

          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button
            description="Entrar agora!"
            disabled={chatSelected === 0 || name.length <= 2}
            type="submit"
          />
        </form>

        <div className="flex flex-col gap-6">
          <h2 className="text-gray-100 font-bold text-lg">Chats disponíveis</h2>

          {chatsInfo.map((chat) => (
            <ChatCard
              isOnline={true}
              totalMessages={chat.messagesCount}
              users={chat.usersConnects}
              key={chat.id}
              description={chat.description}
            />
          ))}
        </div>
      </div>
    </BodyPage>
  );
};

export { Chats };
