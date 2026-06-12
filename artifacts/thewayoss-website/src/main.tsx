import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const app = <App />;

if (import.meta.env.PROD && root.innerHTML.trim().length > 0) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
