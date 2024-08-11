import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider dir="rtl">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
