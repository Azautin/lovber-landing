import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// host 0.0.0.0: accesible desde otros dispositivos de la red local (p. ej. el teléfono).
export default defineConfig({
  plugins: [react()],
  server: { host: "0.0.0.0" },
  preview: { host: "0.0.0.0" },
});
