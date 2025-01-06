const { VITE_MODE, VITE_DOMAIN, VITE_PORT, VITE_SERVER, VITE_SERVER_PORT, VITE_VERSION } = import.meta.env;

export const envConst = {
  mode: VITE_MODE,
  port: VITE_PORT,
  domain: VITE_DOMAIN,
  server: VITE_SERVER,
  server_port: VITE_SERVER_PORT,
  version: VITE_VERSION,
};
