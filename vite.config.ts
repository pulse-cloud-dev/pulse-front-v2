import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "VITE_"); // VITE_ 접두사를 사용하여 로드

  // Common settings
  const commonSettings = {
    base: '/',
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: "window",
    },
  };

  // Environment-specific configurations
  const envSpecificSettings = {
    development: {
      server: {
        port: parseInt(env.VITE_PORT),
        headers: {
          // "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "unsafe-none",
          "Cross-Origin-Resource-Policy": "cross-origin",
        },
        proxy: {
          "/api": {
            target: `${env.VITE_SERVER}${env.VITE_SERVER_PORT}`,
            changeOrigin: true,
            secure: false,
          },
        },
      },
    },
    production: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id: string) => {
              if (id.includes("node_modules")) {
                return `vendor`;
              }
            },
          },
        },
      },
      server: {
        proxy: {
          "/api": {
            target: env.VITE_PROD_API_URL,
            changeOrigin: true,
            secure: false,
          },
        },
      },
    },
    test: {
      testSpecificOption: true,
    },
  };

  // Merge common settings with environment-specific settings
  return {
    ...commonSettings,
    ...envSpecificSettings[mode as keyof typeof envSpecificSettings],
  };
});
