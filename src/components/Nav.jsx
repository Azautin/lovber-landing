import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  ["como-funciona", "Cómo funciona"],
  ["que-hace", "Qué hace"],
  ["recuerdos", "Recuerdos"],
  ["juegos", "Juegos"],
  ["precios", "Planes"],
  ["preguntas", "Preguntas"],
];

// Altura de la línea con la que se decide qué sección está «debajo» de la barra.
const LINE = 40;

export default function Nav() {
  const [current, setCurrent] = useState({ id: "top", dark: false });

  // La sección actual es la última (en orden del documento) que cruza la línea de la barra:
  // si una sección tapa a otra fija, gana la que tapa.
  useEffect(() => {
    const read = () => {
      let found = null;
      for (const s of document.querySelectorAll("main section")) {
        const r = s.getBoundingClientRect();
        if (r.top <= LINE && r.bottom > LINE) found = s;
      }
      const next = { id: found?.id || "", dark: found?.dataset.nav === "dark" };
      setCurrent((c) => (c.id === next.id && c.dark === next.dark ? c : next));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  // Flotante en el inicio; de borde a borde en el resto de secciones.
  const docked = current.id !== "top";
  const active = LINKS.some(([id]) => id === current.id) ? current.id : null;

  return (
    <motion.header
      className={`nav ${docked ? "docked" : ""} ${current.dark ? "dark" : ""}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <a href="#top" className="logo" aria-label="Lovber, inicio">
          lovber<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Principal">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "on" : ""}
              aria-current={active === id ? "true" : undefined}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <motion.a
          href="#top"
          className="btn btn-primary"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Quiero probarla
        </motion.a>
      </div>
    </motion.header>
  );
}
