import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Base URL for the project. Must exactly match your GitHub repo name for Pages
  base: "/-Group-9-Task-Manager-/",

  // Local dev server configuration
  server: {
    host: "::",   // allows access from network
    port: 8080,   // your usual localhost port
  },

  // Plugins
  plugins: [react()],

  // Path aliases for easier imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Optional: build options (ensures all assets are correctly referenced)
  build: {
    outDir: "dist",        // default output folder
    emptyOutDir: true,     // clear old build files before building
    sourcemap: false,      // optional: remove sourcemaps for GitHub Pages
  },
});
