import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { builtinModules } from 'node:module';

const externalModules = [
  'electron',
  'electron-squirrel-startup',
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

// https://vitejs.dev/config
export default defineConfig({
  plugins: [reactRefresh()],  // for 状态保留
  define: {
    MAIN_WINDOW_VITE_DEV_SERVER_URL: undefined,
    MAIN_WINDOW_VITE_NAME: JSON.stringify('main_window'),
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => 'main.js',
    },
    emptyOutDir: false,
    outDir: '.vite/build',
    rollupOptions: {
      external: externalModules,
    },
  },
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
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
});
