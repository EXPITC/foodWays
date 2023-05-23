//style
import { GlobalStyles } from "./GlobalStyles";
import RouterSetup from "./components/RouterSetup";
import { UserContextProvider } from "./Context/userContext";
import { API } from "./config/api";
import { AuthModalContextProvider } from "./Context/authModalContext";
if (localStorage?.token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
} else {
  delete API.defaults.headers.common["Authorization"];
}
function App() {
  return (
    <UserContextProvider>
      <AuthModalContextProvider>
        <GlobalStyles />
        <RouterSetup />
      </AuthModalContextProvider>
    </UserContextProvider>
  );
}

export default App;
