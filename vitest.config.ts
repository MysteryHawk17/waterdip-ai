import { defineConfig } from "vitest/config";
import path from "path"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    host: "0.0.0.0",
  },
  test: {
    environment: "jsdom",
  },
});
