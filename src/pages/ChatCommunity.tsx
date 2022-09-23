import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PaperPlaneRight } from "phosphor-react";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { BodyPage } from "../components/BodyPage";
import { Input } from "../components/Input";
import { LoggedInUsers } from "../components/loggedInUsers";
import { socket, useAuthContext } from "../context/Auth";
import { chats } from "../utils/chatsData";

interface MessageProps {
  myMessage?: boolean;
  user: {
    name: string;
    moment: Date;
  };
  message: string;
}

interface Messages {
  chat: string;
  user: {
    name: string;
  };
  description: string;
  moment: Date;
}

const Message: React.FC<MessageProps> = ({ myMessage, user, message }) => {
  return (
    <div className={`flex w-full ${myMessage && "justify-end"}`}>
      <div
        className={`bg-slate-800 p-2 rounded-lg max-w-lg ${
          myMessage ? "danger-arrow-right" : "danger-arrow-left"
        }`}
      >
        {!myMessage && (
          <h4 className="font-bold">{user.name || "Anonimous"}</h4>
        )}
        <p className="leading-relaxed">{message}</p>
        <small className="w-full flex justify-end py-1">
          {format(new Date(user.moment), "EEEE' • 'k'h'm", {
            locale: ptBR,
          })}
        </small>
      </div>
    </div>
  );
};

const ChatCommunity: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { name, chatsInfo } = useAuthContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    socket.on("disconnect", () => {
      navigate("/chats");
    });

    socket.on("messages", ({ messages }) => {
      setMessages(messages);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (!name || !chats.find((chat) => String(chat.id) === params.chat)) {
      navigate("/chats");
    } else socket.emit("join", { name, chat: params.chat });
  }, [socket, name]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    socket.emit("send", { name, chat: params.chat, message });

    setMessage("");
  };

  return (
    <BodyPage
      breadcrumbs={[
        { description: "Chats", to: "/chats" },
        {
          description:
            chats.find((chat) => String(chat.id) === params.chat)
              ?.description || "",
          to: `/chats/${params.chat}`,
        },
      ]}
    >
      <div className="py-8 flex justify-around w-full">
        <div className="bg-slate-900 w-full rounded-md flex flex-col justify-between">
          <div className="drop-shadow-md rounded-t-md p-4 bg-slate-800 text-gray-100 font-bold text-lg flex justify-between">
            <h2>
              #
              {
                chats.find((chat) => String(chat.id) === params.chat)
                  ?.description
              }
            </h2>
            <LoggedInUsers
              users={
                chatsInfo.find((chat) => String(chat.id) === params.chat)
                  ?.usersConnects || []
              }
              limit={7}
            />
          </div>
          <div className="p-6 flex h-full flex-col-reverse gap-4 overflow-auto">
            {messages.map((message, key) => (
              <Message
                key={key}
                user={{ moment: message.moment, name: message.user.name }}
                message={message.description}
                myMessage={message.user.name === name}
              />
            ))}
          </div>
          <form
            onSubmit={sendMessage}
            className="drop-shadow-md p-4 bg-slate-800 rounded-b-md flex justify-center items-center"
          >
            <div className="flex flex-1">
              <Input
                placeholder="Digite aqui sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
            </div>
            <button className="px-4" type="submit">
              <PaperPlaneRight size={32} weight="fill" />
            </button>
          </form>
        </div>
      </div>
    </BodyPage>
  );
};

export { ChatCommunity };
