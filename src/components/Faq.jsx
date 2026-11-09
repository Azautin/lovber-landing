import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Mascot from "./Mascot.jsx";
import Reveal, { EASE } from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";

// Cada pregunta trae la reacción de Lovber: su expresión y lo que dice en el globo.
const QA = [
  {
    q: "¿Cuánto cuesta?",
    a: "Puedes empezar gratis. Además habrá dos planes mensuales, de USD 5 y USD 10. Muy pronto te contamos qué incluye cada uno.",
    mood: "happy",
    say: "Empezar es gratis. Lo demás, te lo cuento muy pronto.",
  },
  {
    q: "¿Mi pareja necesita instalar Lovber?",
    a: "No. Lovber es solo para ti: tu pareja no necesita cuenta y no ve nada de lo que guardas. Los juegos se juegan juntos en tu mismo teléfono.",
    mood: "love",
    say: "Soy solo para ti. Tu pareja solo nota los detalles.",
  },
  {
    q: "¿Dónde se guardan mis fotos?",
    a: "Solo en tu teléfono. Las fotos de Recuerdos y del rollo no se suben a ningún servidor; en tu cuenta solo viajan sus ajustes. Por eso, si cambias de teléfono, esos momentos se ven como una página escrita.",
    mood: "surprised",
    say: "Tus fotos se quedan contigo, en tu teléfono.",
  },
  {
    q: "¿Cómo son los juegos?",
    a: "Cartas para conocerse, una ruleta, retos y más, con una pregunta nueva cada día. Se juegan juntos en un mismo teléfono, pasándoselo por turnos.",
    mood: "happy",
    say: "Pásale el teléfono y a jugar.",
  },
  {
    q: "¿Cuándo sale la app?",
    a: "Estamos terminando las versiones de iOS y Android. Cuando estén publicadas, los botones de esta página llevarán directo a cada tienda.",
    mood: "surprised",
    say: "¡Muy pronto! Estamos terminando iOS y Android.",
  },
];

const IDLE = { mood: "thinking", say: "¿Tienes dudas? Toca una pregunta y te cuento." };

/** Lovber escucha: piensa mientras no hay pregunta abierta y reacciona a cada respuesta. */
function Buddy({ mood, say }) {
  const thinking = mood === "thinking";
  return (
    <div className="faq-buddy">
      <AnimatePresence mode="wait">
        <motion.p
          key={say}
          className="faq-bubble"
          role="status"
          initial={{ opacity: 0, y: 10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {say}
        </motion.p>
      </AnimatePresence>
      <div className="faq-mascot">
        <div className="faq-disc" aria-hidden="true" />
        {/* Mientras piensa ladea la cabeza; al cambiar de respuesta da un saltito. */}
        <motion.div
          animate={thinking ? { rotate: [-6, 6, -6] } : { rotate: 0 }}
          transition={
            thinking
              ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 200, damping: 14 }
          }
        >
          <motion.div
            key={say}
            initial={{ y: 14, scale: 0.94 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 12 }}
          >
            <Mascot size={190} mood={mood} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function QaItem({ item, open, onToggle, i }) {
  const id = `faq-${i}`;
  return (
    <Reveal
      variant="up"
      delay={i * 0.06}
      className={`faq-item ${open ? "open" : ""}`}
    >
      <button
        className="faq-q"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {item.q}
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ display: "flex" }}
        >
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <motion.p
              className="faq-a"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(null);
  const current = open === null ? IDLE : QA[open];
  return (
    <section id="preguntas" className="band">
      <div className="wrap faq-grid">
        <div className="faq-side">
          <SectionHead eyebrow="Preguntas" title="Lo que quizá te estés preguntando" />
          <Buddy mood={current.mood} say={current.say} />
        </div>
        <div className="faq">
          {QA.map((item, i) => (
            <QaItem
              key={item.q}
              item={item}
              i={i}
              open={open === i}
              onToggle={() => setOpen((v) => (v === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
