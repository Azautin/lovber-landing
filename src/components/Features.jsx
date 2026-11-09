import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, MapPin, MessageCircle, PenLine, Plus } from "lucide-react";
import Reveal, { EASE, Item } from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { NOTES, NoteRow } from "./Screens.jsx";

/** Tarjeta del bento: entra al scroll, sube al pasar el cursor y lleva un foco de luz. */
function Card({ className = "", tag, accent, title, text, children, delay = 0 }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal
      className={`card ${accent ? "card-plus" : ""} ${className}`}
      variant="scale"
      delay={delay}
      stagger={0.07}
      hover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      onPointerMove={onMove}
    >
      {tag ? (
        <Item as="span" variant="fade" className={`tag ${accent ? "plus" : ""}`}>
          {tag}
        </Item>
      ) : null}
      <Item as="h3">{title}</Item>
      <Item as="p">{text}</Item>
      {children ? <div className="card-visual">{children}</div> : null}
    </Reveal>
  );
}

const INTENTS = [
  [PenLine, "Escribirle", "#FFDDE6", "#C23462"],
  [Gift, "Hacerle un regalo", "#FDE7C8", "#B8741A"],
  [MessageCircle, "Pasó algo…", "#E7E0FF", "#5B43C9"],
  [MapPin, "Este finde", "#D9EEE3", "#2F7D5B"],
];

/* Tira de días del calendario de Planes: el día elegido queda al centro. */
const DAYS = [
  ["L", 19],
  ["M", 20],
  ["M", 21, true],
  ["J", 22, true],
  ["V", 23],
  ["S", 24, true],
  ["D", 25],
];

function CalendarStrip() {
  const [sel, setSel] = useState(3);
  return (
    <div className="cal">
      <div className="cal-days" role="group" aria-label="Días de la semana">
        {DAYS.map(([d, n, dot], i) => (
          <button
            key={n}
            className={`${i === sel ? "on" : ""} ${i === 0 ? "today" : ""}`}
            onClick={() => setSel(i)}
            aria-pressed={i === sel}
            aria-label={`${d} ${n}`}
          >
            <small>{d}</small>
            <b>{n}</b>
            {dot ? <i /> : null}
          </button>
        ))}
      </div>
      <motion.div
        key={sel}
        className="cal-day"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {sel === 3 ? (
          <>
            <b>🎂 Cumpleaños de Camila</b>
            <span>Jueves 22 de octubre</span>
          </>
        ) : sel === 2 ? (
          <>
            <b>🍝 Cena en casa</b>
            <span>Miércoles 21 · plan</span>
          </>
        ) : sel === 5 ? (
          <>
            <b>🌅 Caminata al atardecer</b>
            <span>Sábado 24 · plan</span>
          </>
        ) : (
          <>
            <b className="cal-empty">
              <Plus size={14} /> Añadir plan a este día
            </b>
            <span>Sin planes todavía</span>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="que-hace" className="band">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Qué hace Lovber"
          title="Todo lo que importa, en un solo lugar"
          lead="Un compañero que recuerda lo importante y te da una mano cuando la necesitas."
        />
        <div className="bento bento-3">
          <Card
            tag="Mundo"
            title="Lo que le importa, a mano"
            text="Sus gustos, sus fechas y lo que conviene cuidar."
          >
            <div className="note-list card-notes">
              {NOTES.slice(0, 3).map(([Icon, name, summary, count, bg, fg], i) => (
                <Item key={name} variant="left" delay={i * 0.06}>
                  <NoteRow
                    Icon={Icon}
                    name={name}
                    summary={summary}
                    count={count}
                    bg={bg}
                    fg={fg}
                  />
                </Item>
              ))}
            </div>
          </Card>
          <Card
            tag="Con IA"
            accent
            delay={0.08}
            title="Tócalo y te ayuda"
            text="Para escribirle, pensar un regalo o hablar de algo que pasó."
          >
            <div className="intents">
              {INTENTS.map(([Icon, label, bg, fg]) => (
                <Item
                  as="span"
                  variant="pop"
                  key={label}
                  style={{ background: bg, color: fg }}
                >
                  <Icon size={15} /> {label}
                </Item>
              ))}
            </div>
            <div className="chat">
              <Item variant="left" delay={0.5} className="ai">
                Cuéntame un recuerdo que solo ustedes entiendan ♡
              </Item>
            </div>
          </Card>
          <Card
            tag="Planes"
            delay={0.16}
            title="Tiempo para dos"
            text="Un calendario con sus fechas e ideas para cuando no sepan qué hacer."
          >
            <CalendarStrip />
          </Card>
        </div>
      </div>
    </section>
  );
}
