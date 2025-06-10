// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/constants/index.scss" as *;`,
      },
    },
  },
  server: {
    host: true,
    // 개발 환경에서 사용하는 프록시
    proxy: {
      "/members": {
        target: "https://titkoon.shop",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader("cookie");
            proxyReq.setHeader("origin", "https://titkoon.shop");
          });
        },
      },
      "/api": {
        target: "https://titkoon.shop",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.removeHeader("cookie");
            proxyReq.setHeader("origin", "https://titkoon.shop");
          });
        },
      },
    },
  },
});
