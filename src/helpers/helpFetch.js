// Helper reutilizable para consumir la API de json-server.
// Encapsula fetch, cabeceras, tiempo máximo de espera y manejo de errores.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TIMEOUT_MS = 8000;

export const helpFetch = () => {
  const customFetch = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const config = {
      method: options.method || "GET",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      signal: controller.signal,
    };
    if (options.body !== undefined) config.body = JSON.stringify(options.body);

    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, config);
      if (!res.ok) {
        return { err: true, status: res.status, statusText: res.statusText || "Error en la solicitud", data: null };
      }
      const data = await res.json();
      return { err: false, status: res.status, statusText: "OK", data };
    } catch (error) {
      const abortado = error.name === "AbortError";
      return {
        err: true,
        status: 0,
        statusText: abortado
          ? "Tiempo de espera agotado."
          : "No se pudo conectar con la API. Verifique que json-server esté activo en el puerto 3001.",
        data: null,
      };
    } finally {
      clearTimeout(timer);
    }
  };

  const get = (endpoint) => customFetch(endpoint);
  const post = (endpoint, body) => customFetch(endpoint, { method: "POST", body });
  const put = (endpoint, id, body) => customFetch(`${endpoint}/${id}`, { method: "PUT", body });
  const del = (endpoint, id) => customFetch(`${endpoint}/${id}`, { method: "DELETE" });

  return { get, post, put, del };
};
