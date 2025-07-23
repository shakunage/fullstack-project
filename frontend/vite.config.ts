import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 5173,
    allowedHosts: ["rrv7front"],
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    "process.env.SSR_BACKEND_URL": JSON.stringify(process.env.SSR_BACKEND_URL),
    "process.env.NHL_API_URL": JSON.stringify(process.env.NHL_API_URL),
    "process.env.CSR_BACKEND_URL": JSON.stringify(process.env.CSR_BACKEND_URL),
    global: {},
  },
});
