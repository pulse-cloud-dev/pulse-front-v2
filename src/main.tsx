import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import "vite/modulepreload-polyfill";

const loadNaverMapScript = () => {
  const existingScript = document.getElementById("naver-map-script");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
};
loadNaverMapScript();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);