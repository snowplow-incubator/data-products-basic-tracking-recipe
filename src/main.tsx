import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "todomvc-app-css/index.css";
import Todo from "./pages/Todo";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Todo />
  </StrictMode>
);
