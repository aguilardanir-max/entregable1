import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";
import Negocio from "./Negocio";
import { AUTOR } from "./config/autor";

document.title = `Gestión de Negocio | ${AUTOR.nombre}`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Negocio />
  </React.StrictMode>
);
