import { useEffect, useState } from "react";

// Formulario genérico para Crear / Editar. Los campos vienen de config/modulos.js
const vacio = (campos) =>
  campos.reduce((acc, c) => ({ ...acc, [c.name]: c.type === "date" ? new Date().toISOString().slice(0, 10) : "" }), {});

export default function Formulario({ modulo, catalogos, registroEditar, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(vacio(modulo.campos));
  const [validado, setValidado] = useState(false);

  // useEffect: al seleccionar un registro para editar, se cargan sus datos en el formulario
  useEffect(() => {
    setValores(registroEditar ? { ...registroEditar } : vacio(modulo.campos));
    setValidado(false);
  }, [registroEditar, modulo]);

  const manejarCambio = (e) => setValores((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setValidado(true);
      return;
    }
    // Normaliza tipos: números y llaves foráneas se guardan como Number
    const registro = { ...valores };
    modulo.campos.forEach((c) => {
      if (c.type === "number" || c.type === "select") registro[c.name] = Number(registro[c.name]);
    });
    onGuardar(registro);
  };

  const editando = Boolean(registroEditar);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header encabezado-card">
        <i className={`bi ${modulo.icono} me-2`}></i>
        {editando ? `Editar ${modulo.singular.toLowerCase()}` : `Registrar ${modulo.singular.toLowerCase()}`}
      </div>
      <form className={`card-body ${validado ? "was-validated" : ""}`} onSubmit={manejarEnvio} noValidate>
        <div className="row g-3">
          {modulo.campos.map((c) => (
            <div className="col-12 col-md-6 col-lg-4" key={c.name}>
              <label htmlFor={c.name} className="form-label fw-semibold small">
                {c.label}
              </label>
              {c.type === "select" ? (
                <select
                  id={c.name}
                  name={c.name}
                  className="form-select"
                  value={valores[c.name]}
                  onChange={manejarCambio}
                  required={c.required}
                >
                  <option value="">Seleccione…</option>
                  {catalogos[c.origen].map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={c.name}
                  name={c.name}
                  type={c.type}
                  min={c.min}
                  className="form-control"
                  value={valores[c.name]}
                  onChange={manejarCambio}
                  required={c.required}
                />
              )}
              <div className="invalid-feedback">Campo obligatorio o con formato inválido.</div>
            </div>
          ))}
        </div>
        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-corp">
            <i className="bi bi-check2-circle me-1"></i>
            {editando ? "Actualizar" : "Guardar"}
          </button>
          {editando && (
            <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
