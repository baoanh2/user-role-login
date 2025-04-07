import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserSignInProvider } from "./Pages/Contexts/UserSignInContext.jsx";
createRoot(document.getElementById("root")).render(
  <UserSignInProvider>
    <App />
  </UserSignInProvider>
);
