import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// import { BaseUrl } from "@/stores/replace";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {//代理api
        // target: "http://192.168.43.76:5000/",// 代理接口(注意只要域名就够了)
        target: 'http://127.0.0.1:5000/',// 代理接口(注意只要域名就够了)
        //  target: 'http://10.133.29.27:5000/',// 代理接口(注意只要域名就够了)


        changeOrigin: true,//是否跨域
        ws: true, // proxy websockets
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

