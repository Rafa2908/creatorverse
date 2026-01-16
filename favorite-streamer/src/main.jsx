import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CreatorProvider from "./context/CreatorContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CreatorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CreatorProvider>
  </StrictMode>
);
