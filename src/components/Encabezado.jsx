import { AUTOR } from "../config/autor";

export default function Encabezado() {
  return (
    <header className="encabezado-corp">
      <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <h1 className="h4 mb-0 fw-semibold">{AUTOR.empresa} — Sistema de Gestión</h1>
          <small className="text-light opacity-75">
            {AUTOR.universidad} · {AUTOR.facultad} · {AUTOR.asignatura} · {AUTOR.laboratorio}
          </small>
        </div>
        <div className="text-md-end">
          <div className="fw-semibold">{AUTOR.nombre}</div>
          <small className="text-light opacity-75">
            {AUTOR.codigo} · Semestre {AUTOR.semestre} · {AUTOR.periodo}
          </small>
        </div>
      </div>
    </header>
  );
}
