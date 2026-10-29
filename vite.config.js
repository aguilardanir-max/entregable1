import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Puerto público (front): 5173  |  Puerto privado (API json-server): 3001
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
});
