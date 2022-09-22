import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { Router } from "./Router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

export default App;
