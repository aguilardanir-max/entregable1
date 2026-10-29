const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

// Indicadores generales calculados con los datos consumidos de la API.
export default function Resumen({ catalogos }) {
  const totalVentas = catalogos.ventas.reduce((s, v) => s + v.cantidad * v.precioUnitario, 0);
  const totalCompras = catalogos.compras.reduce((s, c) => s + c.cantidad * c.costoUnitario, 0);

  const tarjetas = [
    { titulo: "Productos", valor: catalogos.productos.length },
    { titulo: "Clientes", valor: catalogos.clientes.length },
    { titulo: "Proveedores", valor: catalogos.proveedores.length },
    { titulo: "Total compras", valor: moneda(totalCompras) },
    { titulo: "Total ventas", valor: moneda(totalVentas) },
  ];

  return (
    <div className="row g-3 mb-4">
      {tarjetas.map((t) => (
        <div className="col-6 col-lg" key={t.titulo}>
          <div className="card tarjeta-kpi h-100">
            <div className="card-body py-3">
              <div className="text-uppercase small text-secondary">{t.titulo}</div>
              <div className="fs-5 fw-semibold">{t.valor}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
