import { Plus } from "phosphor-react";
import React from "react";

interface LoggedInUsersProps {
  users: String[];
  limit?: number;
}

const LoggedInUsers: React.FC<LoggedInUsersProps> = ({ users, limit = 3 }) => {
  return (
    <div className="flex ">
      {users.slice(0, limit).map((user, key) => (
        <div key={key} className="flex">
          <div
            className={`w-8 h-8 bg-slate-900 rounded-full flex justify-center items-center`}
          >
            {user.substring(0, 1)}
          </div>
          {users.length > limit && key === limit - 1 && (
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
  );
};

export { LoggedInUsers };
