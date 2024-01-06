import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    base: './',
    build: {
        outDir: '.vite/renderer/main_window',
    },
    resolve: {
        alias: {
            '@': '/src/', // 添加别名
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    }
})
