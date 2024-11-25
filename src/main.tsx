import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DemoApp from "./components/DemoApp/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoApp />
  </StrictMode>
);
