import { hydrateRoot } from "react-dom/client";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono";
import App from "./App";
import "./index.css";

hydrateRoot(document.getElementById("root")!, <App />);
