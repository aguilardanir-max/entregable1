// Definición declarativa de cada módulo del negocio.
// Un único componente genérico (Modulo.jsx) construye tabla y formulario a partir de aquí.
const moneda = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(n) || 0);

const nombreDe = (lista, id) => lista.find((x) => x.id === Number(id))?.nombre ?? "—";

export const MODULOS = [
  {
    clave: "productos",
    titulo: "Productos",
    singular: "Producto",
    icono: "bi-box-seam",
    campos: [
      { name: "codigo", label: "Código", type: "text", required: true },
      { name: "nombre", label: "Nombre", type: "text", required: true },
      { name: "categoria", label: "Categoría", type: "text", required: true },
      { name: "precio", label: "Precio de venta (COP)", type: "number", required: true, min: 0 },
      { name: "stock", label: "Existencias", type: "number", required: true, min: 0 },
    ],
    columnas: [
      { titulo: "Código", render: (f) => f.codigo },
      { titulo: "Nombre", render: (f) => f.nombre },
      { titulo: "Categoría", render: (f) => f.categoria },
      { titulo: "Precio", render: (f) => moneda(f.precio), alinear: "end" },
      { titulo: "Stock", render: (f) => f.stock, alinear: "end" },
    ],
  },
  {
    clave: "clientes",
    titulo: "Clientes",
    singular: "Cliente",
    icono: "bi-people",
    campos: [
      { name: "nombre", label: "Nombre / Razón social", type: "text", required: true },
      { name: "documento", label: "Documento / NIT", type: "text", required: true },
      { name: "email", label: "Correo electrónico", type: "email", required: true },
      { name: "telefono", label: "Teléfono", type: "text", required: true },
      { name: "ciudad", label: "Ciudad", type: "text", required: true },
    ],
    columnas: [
      { titulo: "Nombre", render: (f) => f.nombre },
      { titulo: "Documento", render: (f) => f.documento },
      { titulo: "Correo", render: (f) => f.email },
      { titulo: "Teléfono", render: (f) => f.telefono },
      { titulo: "Ciudad", render: (f) => f.ciudad },
    ],
  },
  {
    clave: "proveedores",
    titulo: "Proveedores",
    singular: "Proveedor",
    icono: "bi-truck",
    campos: [
      { name: "nombre", label: "Razón social", type: "text", required: true },
      { name: "nit", label: "NIT", type: "text", required: true },
      { name: "email", label: "Correo electrónico", type: "email", required: true },
      { name: "telefono", label: "Teléfono", type: "text", required: true },
      { name: "ciudad", label: "Ciudad", type: "text", required: true },
    ],
    columnas: [
      { titulo: "Razón social", render: (f) => f.nombre },
      { titulo: "NIT", render: (f) => f.nit },
      { titulo: "Correo", render: (f) => f.email },
      { titulo: "Teléfono", render: (f) => f.telefono },
      { titulo: "Ciudad", render: (f) => f.ciudad },
    ],
  },
  {
    clave: "compras",
    titulo: "Compras",
    singular: "Compra",
    icono: "bi-cart-plus",
    campos: [
      { name: "proveedorId", label: "Proveedor", type: "select", origen: "proveedores", required: true },
      { name: "productoId", label: "Producto", type: "select", origen: "productos", required: true },
      { name: "cantidad", label: "Cantidad", type: "number", required: true, min: 1 },
      { name: "costoUnitario", label: "Costo unitario (COP)", type: "number", required: true, min: 0 },
      { name: "fecha", label: "Fecha", type: "date", required: true },
    ],
    columnas: [
      { titulo: "Fecha", render: (f) => f.fecha },
      { titulo: "Proveedor", render: (f, c) => nombreDe(c.proveedores, f.proveedorId) },
      { titulo: "Producto", render: (f, c) => nombreDe(c.productos, f.productoId) },
      { titulo: "Cant.", render: (f) => f.cantidad, alinear: "end" },
      { titulo: "Costo unit.", render: (f) => moneda(f.costoUnitario), alinear: "end" },
      { titulo: "Total", render: (f) => moneda(f.cantidad * f.costoUnitario), alinear: "end" },
    ],
  },
  {
    clave: "ventas",
    titulo: "Ventas",
    singular: "Venta",
    icono: "bi-receipt",
    campos: [
      { name: "clienteId", label: "Cliente", type: "select", origen: "clientes", required: true },
      { name: "productoId", label: "Producto", type: "select", origen: "productos", required: true },
      { name: "cantidad", label: "Cantidad", type: "number", required: true, min: 1 },
      { name: "precioUnitario", label: "Precio unitario (COP)", type: "number", required: true, min: 0 },
      { name: "fecha", label: "Fecha", type: "date", required: true },
    ],
    columnas: [
      { titulo: "Fecha", render: (f) => f.fecha },
      { titulo: "Cliente", render: (f, c) => nombreDe(c.clientes, f.clienteId) },
      { titulo: "Producto", render: (f, c) => nombreDe(c.productos, f.productoId) },
      { titulo: "Cant.", render: (f) => f.cantidad, alinear: "end" },
      { titulo: "Precio unit.", render: (f) => moneda(f.precioUnitario), alinear: "end" },
      { titulo: "Total", render: (f) => moneda(f.cantidad * f.precioUnitario), alinear: "end" },
    ],
  },
];
