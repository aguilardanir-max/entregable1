# Gestión de Negocio — CRUD con React, helpFetch y json-server

**Universidad Libre · Facultad de Ingeniería · Programación Web · Semestre VI · 2026-II**
**Laboratorio IV — React: manejo de CRUD con API ficticia (json-server)**

**Estudiante:** NOMBRE APELLIDO DEL ESTUDIANTE (editar en `src/config/autor.js`)

## Descripción

Aplicación Front-end desarrollada en React que consume una API ficticia (json-server) con la información
de un negocio: **productos, clientes, proveedores, compras y ventas**. Implementa las cuatro operaciones
CRUD (Create, Read, Update, Delete) mediante un *helper* de `fetch` (`helpFetch`), un hook personalizado
(`useCrud`) y los hooks `useState` y `useEffect`. La interfaz usa Bootstrap con un estilo sobrio y corporativo.

## Arquitectura

| Archivo | Responsabilidad |
|---|---|
| `src/index.jsx` | Punto de entrada; monta `Negocio` en el DOM e importa Bootstrap. |
| `src/Negocio.jsx` | Componente principal: pestañas, resumen e instancias de `useCrud`. |
| `src/helpers/helpFetch.js` | Helper reutilizable de peticiones HTTP (GET, POST, PUT, DELETE). |
| `src/hooks/useCrud.js` | Hook con `useState` / `useEffect` y operaciones CRUD por colección. |
| `src/config/modulos.js` | Definición de campos y columnas de cada módulo. |
| `src/config/autor.js` | Datos del estudiante (se reflejan en toda la aplicación). |
| `src/components/` | `Modulo`, `Formulario`, `Tabla`, `Resumen`, `Encabezado`, `Pie`. |
| `db.json` | Base de datos ficticia servida por json-server. |

## Puertos

- **Público (Front React/Vite):** http://localhost:5173
- **Privado (API json-server):** http://localhost:3001

## Ejecución

```bash
npm install
npm start          # levanta API (3001) y Front (5173) al mismo tiempo
```

O en dos terminales:

```bash
npm run api        # Terminal 1 -> json-server en el puerto 3001
npm run dev        # Terminal 2 -> React en el puerto 5173
```

## Endpoints de la API

`GET/POST /productos` · `GET/PUT/DELETE /productos/:id` (ídem para `clientes`, `proveedores`, `compras`, `ventas`).

## Repositorio

URL: _pegar aquí el enlace del repositorio de GitHub_
