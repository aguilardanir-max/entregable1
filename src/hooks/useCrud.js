import { useCallback, useEffect, useState } from "react";
import { helpFetch } from "../helpers/helpFetch";

// Hook personalizado: concentra el estado y las operaciones CRUD de una colección.
//   useState  -> datos, cargando, error
//   useEffect -> lectura inicial (Read) al montar el componente
export const useCrud = (coleccion) => {
  const api = helpFetch();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    const res = await api.get(coleccion);
    if (res.err) {
      setError(res.statusText);
      setDatos([]);
    } else {
      setError(null);
      setDatos(res.data);
    }
    setCargando(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coleccion]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // CREATE
  const crear = async (registro) => {
    const res = await api.post(coleccion, registro);
    if (res.err) return { ok: false, mensaje: res.statusText };
    setDatos((prev) => [...prev, res.data]);
    return { ok: true, mensaje: "Registro creado correctamente." };
  };

  // UPDATE
  const actualizar = async (id, registro) => {
    const res = await api.put(coleccion, id, registro);
    if (res.err) return { ok: false, mensaje: res.statusText };
    setDatos((prev) => prev.map((d) => (d.id === id ? res.data : d)));
    return { ok: true, mensaje: "Registro actualizado correctamente." };
  };

  // DELETE
  const eliminar = async (id) => {
    const res = await api.del(coleccion, id);
    if (res.err) return { ok: false, mensaje: res.statusText };
    setDatos((prev) => prev.filter((d) => d.id !== id));
    return { ok: true, mensaje: "Registro eliminado correctamente." };
  };

  return { datos, cargando, error, recargar: cargar, crear, actualizar, eliminar };
};
