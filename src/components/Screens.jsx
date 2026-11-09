import { motion } from "framer-motion";
import {
  Cake,
  CalendarHeart,
  ChevronRight,
  Dices,
  Droplets,
  Flower2,
  Images,
  Music,
  NotebookText,
  PartyPopper,
  Settings,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import Mascot from "./Mascot.jsx";

/* Maquetas de pantallas de la app, con datos de ejemplo. Reflejan mobile/src/features. */

/** Películas de Recuerdos (mobile/src/features/memories/film.ts), aproximadas con filtros CSS. */
export const FILMS = [
  { id: "N0", name: "Natural", filter: "none" },
  { id: "A6", name: "Analógico", filter: "sepia(.22) saturate(1.15) contrast(1.06)" },
  { id: "B1", name: "Plata", filter: "grayscale(1) contrast(1.12) brightness(1.04)" },
  { id: "C1", name: "Brisa", filter: "saturate(.8) hue-rotate(-14deg) brightness(1.06)" },
  { id: "F2", name: "Desvaído", filter: "contrast(.82) saturate(.7) brightness(1.1)" },
  { id: "R3", name: "Rubor", filter: "sepia(.3) saturate(1.35) hue-rotate(-18deg)" },
];

/** Una foto real con una de las películas aplicada (fotos de Unsplash en public/photos). */
export function Photo({ src, alt = "", film = "A6", className = "", style, children }) {
  const f = FILMS.find((x) => x.id === film) ?? FILMS[0];
  return (
    <div className={`photo ${className}`} style={style}>
      <img src={src} alt={alt} loading="lazy" style={{ filter: f.filter }} />
      <i className="grain" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Barra inferior de la app: cinco pestañas con Pinguitin al centro, sin nombre. */
export function TabBar({ active }) {
  const tabs = [
    ["plans", CalendarHeart, "Planes"],
    ["games", Dices, "Juegos"],
    ["home", null, null],
    ["memories", Images, "Recuerdos"],
    ["world", NotebookText, "Mundo"],
  ];
  return (
    <div className="mini-tab">
      {tabs.map(([id, Icon, label]) => (
        <div key={id} className={id === active ? "on" : ""}>
          {Icon ? <Icon size={15} /> : <Mascot size={22} float={false} />}
          {label}
        </div>
      ))}
    </div>
  );
}

export const NOTES = [
  [Utensils, "Su comida", "Sushi, Pastas, Chocolate amargo", 3, "#FBE9DC", "#C2693A"],
  [Flower2, "Sus flores", "Tulipanes, Girasoles", 2, "#F8E4EC", "#BE4B7A"],
  [Music, "Su música", "Indie, Canciones tranquilas", 2, "#ECE6F7", "#6D4FC2"],
  [ShieldCheck, "Para cuidarle", "Alergia al maní", 1, "#FBEFCB", "#A7771A"],
];

/** Fila de notas de Mundo. */
export function NoteRow({ Icon, name, summary, count, bg, fg, style }) {
  return (
    <div className="note-row" style={style}>
      <span className="note-ico" style={{ background: bg, color: fg }}>
        <Icon size={14} />
      </span>
      <span className="note-txt">
        <b>{name}</b>
        <small>{summary}</small>
      </span>
      <em style={{ color: fg }}>{count}</em>
      <ChevronRight size={12} className="note-chev" />
    </div>
  );
}

/** Mundo: perfil, fechas en píldoras, Bienestar y notas en lista. */
export function WorldScreen({ highlight, notes = NOTES }) {
  return (
    <div className="screen-page">
      <div className="world-profile">
        <span className="world-avatar">C</span>
        <div>
          <b>Camila</b>
          <small>Juntos hace 1 año y 2 meses · 430 días</small>
        </div>
        <span className="world-gear">
          <Settings size={13} />
        </span>
      </div>
      <div className="world-pills">
        <div>
          <small>
            <Cake size={10} /> CUMPLEAÑOS
          </small>
          <b>En 5 días</b>
          <span>22 oct</span>
        </div>
        <div>
          <small>
            <PartyPopper size={10} /> ANIVERSARIO
          </small>
          <b>En 300 días</b>
          <span>13 ago · 2 años</span>
        </div>
      </div>
      <div className="world-cycle">
        <Droplets size={13} color="#E88E83" />
        <span>
          <b>Seguir su ciclo</b>
          <small>Opcional · para acompañarle con atención</small>
        </span>
      </div>
      <small className="world-label">SUS NOTAS</small>
      <div className="note-list">
        {notes.map(([Icon, name, summary, count, bg, fg], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={highlight === name ? "note-hl" : ""}
          >
            <NoteRow
              Icon={Icon}
              name={name}
              summary={summary}
              count={count}
              bg={bg}
              fg={fg}
            />
          </motion.div>
        ))}
      </div>
      <TabBar active="world" />
    </div>
  );
}
