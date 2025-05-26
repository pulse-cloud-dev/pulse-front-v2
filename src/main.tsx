import ReactDOM from "react-dom/client";
import App from "./app";
import "vite/modulepreload-polyfill";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
