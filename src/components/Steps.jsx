import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Check, Gift, MapPin, MessageCircle, PenLine } from "lucide-react";
import Heading from "./Heading.jsx";
import Mascot from "./Mascot.jsx";
import { TabBar, WorldScreen } from "./Screens.jsx";
import { EASE } from "./Reveal.jsx";
import { useEnter } from "./Slide.jsx";

/* Pantalla 1: el perfil inicial, como en el onboarding de la app. */
function ProfileScreen() {
  const fields = [
    ["¿Cómo se llama?", "Camila"],
    ["Su cumpleaños", "22 de octubre de 1998"],
    ["Juntos desde", "13 de agosto de 2025"],
  ];
  return (
    <div className="screen-page">
      <div className="app-title">
        lovber<span>.</span>
      </div>
      <div style={{ display: "grid", justifyItems: "center", marginTop: 4 }}>
        <Mascot size={70} mood="happy" />
      </div>
      <b style={{ fontSize: 17, textAlign: "center", letterSpacing: "-0.03em" }}>
        Cuéntame de esa persona
      </b>
      {fields.map(([label, value], i) => (
        <motion.div
          key={label}
          className="how-field"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
        >
          <small>{label}</small>
          {value}
        </motion.div>
      ))}
      <div className="how-cta">Continuar</div>
    </div>
  );
}

/* Pantalla 2: Mundo, con una nota que se acaba de guardar. */
function WorldStep() {
  return (
    <>
      <WorldScreen highlight="Sus flores" />
      <motion.div
        className="how-toast how-toast-float"
        style={{ x: "-50%" }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
      >
        <Check size={14} /> Guardado en Sus flores: Girasoles
      </motion.div>
    </>
  );
}

/* Pantalla 3: Hoy, con el personaje abierto y sus cuatro opciones. */
const INTENTS = [
  [PenLine, "Escribirle", "#FFDDE6", "#C23462"],
  [Gift, "Hacerle un regalo", "#FDE7C8", "#B8741A"],
  [MessageCircle, "Pasó algo…", "#E7E0FF", "#5B43C9"],
  [MapPin, "Este finde", "#D9EEE3", "#2F7D5B"],
];

function TodayScreen() {
  return (
    <div className="screen-page">
      <div className="app-title">
        lovber<span>.</span>
      </div>
      <div className="bubble">Faltan 5 días para su cumple. ¿Te ayudo con el regalo?</div>
      <div style={{ display: "grid", justifyItems: "center", marginTop: 6 }}>
        <Mascot size={82} mood="love" />
      </div>
      <div className="how-intents">
        {INTENTS.map(([Icon, label, bg, fg], i) => (
          <motion.span
            key={label}
            style={{ background: bg, color: fg }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.09, type: "spring", stiffness: 380, damping: 18 }}
          >
            <Icon size={13} /> {label}
          </motion.span>
        ))}
      </div>
      <TabBar active="home" />
    </div>
  );
}

const STEPS = [
  {
    title: "Cuéntale sobre esa persona",
    text: "Su nombre y, si quieres, su cumpleaños. En dos minutos Pinguitin ya sabe quién importa.",
    Screen: ProfileScreen,
  },
  {
    title: "Guarda lo que vas notando",
    text: "Lo que le encanta y lo que es mejor evitar. Los detalles que se te escaparían quedan a mano.",
    Screen: WorldStep,
  },
  {
    title: "Actúa con intención",
    text: "Te recuerda lo importante de hoy. Tócalo y te ayuda a escribirle, pensar un regalo o armar el finde.",
    Screen: TodayScreen,
  },
];

const STEP_MS = 4500;

/**
 * Una sola pantalla: los tres pasos avanzan solos (o tocando cada uno),
 * sin paradas de scroll extra.
 */
export default function Steps() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.6 });

  // Avanza solo mientras la sección está a la vista; tocar un paso reinicia la cuenta.
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => setActive((v) => (v + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, inView, reduce]);

  // Entrada: el contenido sube y aparece mientras la sección tapa al inicio.
  const enter = useEnter(ref);
  const enterY = useTransform(enter, [0.3, 1], [140, 0]);
  const enterOpacity = useTransform(enter, [0.45, 0.95], [0, 1]);

  const { Screen } = STEPS[active];
  return (
    <section id="como-funciona" className="how" ref={ref} data-nav="dark">
      {/* Parada de scroll: la sección vive en el `.deck`, no es hija directa de <main>. */}
      <span className="snap-mark" style={{ top: 0 }} aria-hidden="true" />
      <div className="how-pin">
        <motion.div
          className="wrap how-grid"
          style={{ y: enterY, opacity: enterOpacity }}
        >
          <div className="how-copy">
            <span className="eyebrow">Cómo funciona</span>
            <Heading as="h2">Tan simple como *prestar atención*</Heading>
            <ol className="how-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === active ? "on" : ""}>
                  <button onClick={() => setActive(i)} aria-current={i === active || undefined}>
                    <span className="how-n">{i + 1}</span>
                    <span className="how-t">{s.title}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {i === active && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        {s.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ol>
            <div className="how-bar" aria-hidden="true">
              <motion.i
                key={`${active}-${inView}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView && !reduce ? 1 : 0 }}
                transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              />
            </div>
          </div>
          <div className="how-stage">
            <div className="phone how-phone">
              <div className="screen">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    style={{ position: "absolute", inset: 0 }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Screen />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
