import { defineConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "VITE_ENV");

  // Common settings
  const commonSettings = {
    plugins: [
      react(), // Enables React fast refresh and JSX/TSX support
      tsconfigPaths(), // Supports paths defined in tsconfig.json
    ],
    define: {
      "process.env.MODE": JSON.stringify(process.env.MODE),
      "process.env.PORT": JSON.stringify(process.env.PORT),
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
    },
    envPrefix: "VITE_ENV",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }, // Add custom aliases if needed
    },
  };

  // Environment-specific configurations
  const envSpecificSettings = {
    development: {
      server: {
        port: 3000,
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
        },
        proxy: {
          "/api": {
            target: env.VITE_ENV_API_URI || "http://localhost:4000",
            changeOrigin: true,
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
    },
    test: {
      testSpecificOption: true, // Placeholder for any test-specific configuration
    },
  };

  // Merge common settings with environment-specific settings
  return {
    ...commonSettings,
    ...envSpecificSettings[mode as keyof typeof envSpecificSettings], // Apply settings based on the current mode
  };
});
