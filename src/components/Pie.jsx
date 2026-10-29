import { AUTOR } from "../config/autor";

export default function Pie() {
  return (
    <footer className="pie-corp mt-5">
      <div className="container py-3 text-center small">
        © {new Date().getFullYear()} {AUTOR.universidad} — {AUTOR.laboratorio} · Desarrollado por{" "}
        <strong>{AUTOR.nombre}</strong> ({AUTOR.codigo})
      </div>
    </footer>
  );
}
