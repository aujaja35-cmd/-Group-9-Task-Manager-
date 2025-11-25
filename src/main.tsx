import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Wrap App in BrowserRouter with basename for GitHub Pages
createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/-Group-9-Task-Manager-">
    <App />
  </BrowserRouter>
);
