import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Component tagging functionality can be added here if needed
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: mode === "development",
      },
      includeAssets: [
        "favicon.svg",
        "icons/logo_192.png",
        "icons/logo_512.png",
      ],
      manifest: {
        name: "SafeYatri",
        short_name: "SafeYatri",
        description: "Travel safety companion: safe routes, local news, trip planner",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          // PNG icons for Android installability (must be exact sizes)
          {
            src: "/icons/logo_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/logo_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/logo_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
