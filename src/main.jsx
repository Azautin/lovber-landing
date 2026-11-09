import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import "./styles.css";
import "./motion.css";
import "./sections.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Respeta «reducir movimiento» del sistema en todas las animaciones. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
