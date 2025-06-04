import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 절대경로를 위한 alias 설정
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // SCSS를 쓸 때마다 자동으로 index.scss 파일이 맨 위에 포함되게 하는 설정
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/constants/index.scss" as *;`,
      },
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target:
          "http://ec2-3-37-53-105.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
        secure: false,
      },
      "/members": {
        target:
          "http://ec2-3-37-53-105.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
