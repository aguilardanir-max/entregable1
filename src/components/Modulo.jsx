import { useState } from "react";
import Formulario from "./Formulario";
import Tabla from "./Tabla";

// Módulo CRUD genérico: une Formulario + Tabla para una colección.
export default function Modulo({ modulo, crud, catalogos }) {
  const [editando, setEditando] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const mostrar = (res) => {
    setAviso({ tipo: res.ok ? "success" : "danger", texto: res.mensaje });
    setTimeout(() => setAviso(null), 4000);
  };

  const guardar = async (registro) => {
    const res = editando ? await crud.actualizar(editando.id, registro) : await crud.crear(registro);
    if (res.ok) setEditando(null);
    mostrar(res);
  };

  const eliminar = async (fila) => {
    if (!window.confirm(`¿Desea eliminar el registro #${fila.id}? Esta acción no se puede deshacer.`)) return;
    const res = await crud.eliminar(fila.id);
    if (editando?.id === fila.id) setEditando(null);
    mostrar(res);
  };

  const filas = crud.datos.filter((f) => JSON.stringify(f).toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <section>
      {aviso && (
        <div className={`alert alert-${aviso.tipo} alert-dismissible`} role="alert">
          {aviso.texto}
          <button type="button" className="btn-close" onClick={() => setAviso(null)} aria-label="Cerrar"></button>
        </div>
      )}

      <Formulario
        modulo={modulo}
        catalogos={catalogos}
        registroEditar={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      <div className="card shadow-sm">
        <div className="card-header encabezado-card d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>
            <i className={`bi ${modulo.icono} me-2`}></i>
            Listado de {modulo.titulo.toLowerCase()} ({filas.length})
          </span>
          <div className="d-flex gap-2">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Buscar…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-sm btn-light" onClick={crud.recargar} title="Recargar desde la API">
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          {crud.cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-secondary" role="status"></div>
              <div className="mt-2 text-secondary small">Cargando información…</div>
            </div>
          ) : crud.error ? (
            <div className="alert alert-danger m-3">{crud.error}</div>
          ) : (
            <Tabla modulo={modulo} filas={filas} catalogos={catalogos} onEditar={setEditando} onEliminar={eliminar} />
          )}
        </div>
      </div>
    </section>
  );
}
