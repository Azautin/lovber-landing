import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Gift, Heart, MapPin, MessageCircle, PenLine, Sparkles } from "lucide-react";
import Heading from "./Heading.jsx";
import Marquee from "./Marquee.jsx";
import Mascot from "./Mascot.jsx";
import { TabBar } from "./Screens.jsx";
import { useStack } from "./Slide.jsx";
import { LINKS } from "../config.js";

const ORBIT = [
  { Icon: PenLine, bg: "#FFDDE6", fg: "#C23462", label: "Escribirle" },
  { Icon: Gift, bg: "#FDE7C8", fg: "#B8741A", label: "Regalo" },
  { Icon: MessageCircle, bg: "#E7E0FF", fg: "#5B43C9", label: "Pasó algo" },
  { Icon: MapPin, bg: "#D9EEE3", fg: "#2F7D5B", label: "Este finde" },
];

function HomeScreen() {
  return (
    <div className="screen-page">
      <div className="app-title">
        lovber<span>.</span>
      </div>
      <div className="bubble">
        Faltan 5 días para su cumple. ¿Te ayudo con el regalo?
      </div>
      <div className="halo">
        <motion.div
          style={{ position: "absolute", inset: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT.map(({ Icon, bg, fg }, i) => {
            const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 4;
            return (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${Math.cos(a) * 98}px - 19px)`,
                  top: `calc(50% + ${Math.sin(a) * 98}px - 19px)`,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: bg,
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "0 6px 12px -6px rgba(75,48,67,.4)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <Icon size={18} color={fg} />
              </motion.div>
            );
          })}
        </motion.div>
        <Mascot size={92} mood="idle" />
      </div>
      <div className="talk-pill">
        <MessageCircle size={12} /> Conversar con Lovber
      </div>
      <div
        style={{
          marginTop: "auto",
          background: "#F2E9E2",
          borderRadius: 16,
          padding: "10px 12px",
          fontSize: 11,
        }}
      >
        <b style={{ fontSize: 8.5, letterSpacing: ".12em", color: "#887780" }}>
          GESTO DE HOY · 3 MIN
        </b>
        <div style={{ fontWeight: 700, marginTop: 3 }}>
          Una nota donde no la espere
        </div>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/** Teléfono del hero: solo la pantalla de inicio, con Pinguitin. */
function Phone({ tilt }) {
  return (
    <motion.div
      className="phone"
      style={tilt}
      initial={{ opacity: 0, y: 60, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="screen">
        <HomeScreen />
      </div>
    </motion.div>
  );
}

function StoreBadge({ href, store, line }) {
  const live = !!href;
  return (
    <a
      className="store-badge"
      href={live ? href : undefined}
      aria-disabled={!live}
      aria-label={live ? `Descargar en ${store}` : `${store}: próximamente`}
    >
      <Sparkles size={22} />
      <span>
        <small>{live ? line : "Próximamente en"}</small>
        <strong>{store}</strong>
      </span>
    </a>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mark = useRef(null);
  // Salida tipo diapositiva: mientras «Cómo funciona» sube, el hero se aleja y se oscurece.
  const covered = useStack(ref, mark);
  const scale = useTransform(covered, [0, 1], [1, 0.9]);
  const lift = useTransform(covered, [0, 1], [0, -60]);
  const dim = useTransform(covered, [0, 1], [1, 0.25]);
  const shade = useTransform(covered, [0, 1], [0, 0.55]);
  const cue = useTransform(covered, [0, 0.15], [1, 0]);
  const blobA = useTransform(covered, [0, 1], [0, 160]);
  const blobB = useTransform(covered, [0, 1], [0, -120]);

  // Inclinación 3D del teléfono siguiendo el cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <>
      <div className="snap-mark" ref={mark} aria-hidden="true" />
      <section className="hero" id="top" ref={ref}>
        <motion.div
          className="blob"
          style={{ width: 420, height: 420, background: "#F8E5D9", top: 40, right: -80, y: blobA }}
        />
        <motion.div
          className="blob"
          style={{ width: 300, height: 300, background: "#EDE6F1", bottom: 0, left: -80, y: blobB }}
        />
        <motion.div className="hero-body" style={{ scale, y: lift, opacity: dim }}>
          <div className="wrap hero-grid">
            <div>
              <motion.span
                className="eyebrow"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                El amor está en los detalles
              </motion.span>
              <Heading as="h1" mount delay={0.25} stagger={0.09}>
                Querer también es *estar presente.*
              </Heading>
              <motion.p
                className="lead"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                ¿No sabes qué escribirle, qué regalarle o cómo hablar de algo que
                pasó? Toca a Pinguitin y te ayuda a encontrar las palabras.
                Él recuerda lo que le gusta a tu pareja y las fechas que importan.
              </motion.p>
              <motion.div
                className="hero-actions"
                id="descargar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <StoreBadge href={LINKS.appStore} store="App Store" line="Descárgala en" />
                <StoreBadge href={LINKS.playStore} store="Google Play" line="Disponible en" />
              </motion.div>
              <motion.p
                className="hero-note"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Heart size={14} color="#E88E83" fill="#E88E83" />
                Empieza gratis. Tu pareja no necesita instalar nada.
              </motion.p>
            </div>
            <div className="stage" onPointerMove={onMove} onPointerLeave={onLeave}>
              <div className="stage-fit">
                <Phone tilt={{ rotateX, rotateY }} />
                <motion.div
                  className="floaty-card floaty-a"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                  transition={{ delay: 1.1, y: { duration: 4, repeat: Infinity } }}
                >
                  <span style={{ fontSize: 22 }}>🎂</span> Su cumple es en 5 días
                </motion.div>
                <motion.div
                  className="floaty-card floaty-b"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                  transition={{ delay: 1.4, y: { duration: 4.6, repeat: Infinity } }}
                >
                  <span style={{ fontSize: 20 }}>🎞️</span> Rollo de octubre · 3/24
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            className="hero-next"
            style={{ opacity: cue }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <a href="#como-funciona">
              Descubre cómo funciona
              <motion.span
                style={{ display: "inline-flex" }}
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </a>
          </motion.div>
          <Marquee />
        </motion.div>
        <motion.div className="hero-shade" style={{ opacity: shade }} aria-hidden="true" />
      </section>
    </>
  );
}
