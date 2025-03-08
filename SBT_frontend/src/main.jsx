<<<<<<< HEAD
import React from "react"; // Import React explicitly
=======
import { StrictMode } from "react";
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { StoreContextProvider } from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
=======

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
);
