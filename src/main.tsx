import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
