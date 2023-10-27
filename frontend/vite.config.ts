import react from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_PROXY_SERVER_URL,
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
  } = loadEnv(mode, process.cwd());

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), tsconfigPathsPlugin()],
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT) || 3000,
      proxy: {
        [VITE_APP_API_ORIGIN_URL]: {
          target: VITE_APP_PROXY_SERVER_URL,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('react')) {
              return 'react';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
            }
            if (id.includes('react-redux')) {
              return 'react-redux';
            }
          },
        },
      },
    },
  });
};

export default config;
