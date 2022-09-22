import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../service/api";

interface LoginResponse {
  user: {
    email: string;
    id: string;
    name: string;
  };
  token: string;
  error?: string;
  message?: string[];
  statusCode?: number;
}

interface CookiesData {
  name?: string;
  token?: string;
  id?: string;
  email?: string;
}

export interface AuthContextData {
  signOut: () => void;
  signIn: (data: {
    email: string;
    password: string;
  }) => Promise<{ error?: boolean; data: LoginResponse }>;
  cookies: CookiesData;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "name",
    "token",
    "id",
    "email",
  ]);
  const navigate = useNavigate();
  const param = useParams();

  const signOut = useCallback(() => {
    removeCookie("name");
    removeCookie("email");
    removeCookie("id");
    removeCookie("token");
    navigate("/login");
  }, []);

  const signIn = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<{ error?: boolean; data: LoginResponse }> => {
      const { data } = await api
        .post<LoginResponse>("sessions", {
          email,
          password,
        })
        .then((response) => {
          if (!response.data.error) {
            navigate("/");
            setCookie("name", response.data.user.name);
            setCookie("email", response.data.user.email);
            setCookie("id", response.data.user.id);
            setCookie("token", response.data.token);

            return response;
          }

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          return response;
        })
        .catch((err) => {
          return err.response;
        });

      return { error: !data ? true : false, data };
    },

    []
  );

  useEffect(() => {
    if (cookies.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;
    }
  }, [cookies]);

  api.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async ({ response }: any) => {
      if (response?.status === 401) {
        signOut();
        navigate("/login");
        return false;
      }

      return false;
    }
  );

  return (
    <AuthContext.Provider
      value={{
        cookies,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider };
