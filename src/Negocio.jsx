import { useState } from "react";
import Encabezado from "./components/Encabezado";
import Pie from "./components/Pie";
import Resumen from "./components/Resumen";
import Modulo from "./components/Modulo";
import { useCrud } from "./hooks/useCrud";
import { MODULOS } from "./config/modulos";

// Componente principal del negocio: gestiona las 5 colecciones de la API
// (productos, clientes, proveedores, compras y ventas) mediante el hook useCrud.
export default function Negocio() {
  const [activo, setActivo] = useState(MODULOS[0].clave);

  const productos = useCrud("productos");
  const clientes = useCrud("clientes");
  const proveedores = useCrud("proveedores");
  const compras = useCrud("compras");
  const ventas = useCrud("ventas");

  const cruds = { productos, clientes, proveedores, compras, ventas };
  const catalogos = {
    productos: productos.datos,
    clientes: clientes.datos,
    proveedores: proveedores.datos,
    compras: compras.datos,
    ventas: ventas.datos,
  };

  const modulo = MODULOS.find((m) => m.clave === activo);

  return (
    <>
      <Encabezado />

      <main className="container my-4">
        <Resumen catalogos={catalogos} />

        <ul className="nav nav-tabs nav-corp mb-4">
          {MODULOS.map((m) => (
            <li className="nav-item" key={m.clave}>
              <button className={`nav-link ${activo === m.clave ? "active" : ""}`} onClick={() => setActivo(m.clave)}>
                <i className={`bi ${m.icono} me-1`}></i>
                {m.titulo}
              </button>
            </li>
          ))}
        </ul>

        <Modulo key={modulo.clave} modulo={modulo} crud={cruds[modulo.clave]} catalogos={catalogos} />
      </main>

      <Pie />
    </>
  );
}
