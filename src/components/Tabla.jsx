// Tabla genérica con acciones Editar / Eliminar.
export default function Tabla({ modulo, filas, catalogos, onEditar, onEliminar }) {
  if (filas.length === 0) {
    return <div className="alert alert-light border text-center mb-0">No hay registros para mostrar.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead className="tabla-head">
          <tr>
            <th scope="col">#</th>
            {modulo.columnas.map((c) => (
              <th scope="col" key={c.titulo} className={c.alinear === "end" ? "text-end" : ""}>
                {c.titulo}
              </th>
            ))}
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id}>
              <td className="text-secondary">{fila.id}</td>
              {modulo.columnas.map((c) => (
                <td key={c.titulo} className={c.alinear === "end" ? "text-end" : ""}>
                  {c.render(fila, catalogos)}
                </td>
              ))}
              <td className="text-center text-nowrap">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(fila)}>
                  <i className="bi bi-pencil-square"></i> Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(fila)}>
                  <i className="bi bi-trash3"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
