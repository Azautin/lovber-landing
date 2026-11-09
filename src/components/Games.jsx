import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import Heading from "./Heading.jsx";
import Reveal, { Item } from "./Reveal.jsx";

/*
 * Juegos: una colección que crece. Cada juego tiene su portada (colores de
 * mobile/src/features/games/content.ts) y una casilla final anuncia que vienen más.
 */

/* Portadas animadas, una por juego. */
function MatchArt() {
  return (
    <div className="art-match" aria-hidden="true">
      <span className="mc back">🎬</span>
      <motion.span
        className="mc front"
        animate={{ rotate: [6, 14, 6], x: [0, 10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        🍝
        <i>
          <Heart size={10} fill="currentColor" />
        </i>
      </motion.span>
    </div>
  );
}

function CardArt() {
  return (
    <motion.div
      className="art-card"
      aria-hidden="true"
      animate={{ rotateY: [0, 0, 180, 180, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.5, 0.85, 1] }}
    >
      <span>?</span>
    </motion.div>
  );
}

const SLICES = ["#F8D9CF", "#FDE7C8", "#F8E4EC", "#E7E0FF", "#D9EEE3", "#FFFFFF"];
function WheelArt() {
  const r = 40;
  const step = 360 / SLICES.length;
  return (
    <div className="art-wheel" aria-hidden="true">
      <i className="art-arrow" />
      <motion.svg
        viewBox="-42 -42 84 84"
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        {SLICES.map((fill, i) => {
          const a0 = ((i * step - 90) * Math.PI) / 180;
          const a1 = (((i + 1) * step - 90) * Math.PI) / 180;
          return (
            <path
              key={i}
              d={`M0 0 L${r * Math.cos(a0)} ${r * Math.sin(a0)} A${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} Z`}
              fill={fill}
              stroke="#fff"
              strokeWidth="1.5"
            />
          );
        })}
        <circle r="7" fill="#4b3043" />
      </motion.svg>
    </div>
  );
}

function SplitArt() {
  return (
    <div className="art-split" aria-hidden="true">
      <motion.span
        animate={{ flexGrow: [1, 1.8, 1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🏖️
      </motion.span>
      <motion.span
        animate={{ flexGrow: [1, 1, 1.8, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🏔️
      </motion.span>
      <b>o</b>
    </div>
  );
}

function QuestionArt() {
  return (
    <div className="art-question" aria-hidden="true">
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        ¿Qué canción te recuerda a nosotros?
      </motion.span>
    </div>
  );
}

const GAMES = [
  { name: "Match", hook: "Elijan en secreto. Solo verán en qué coinciden.", Art: MatchArt, bg: "linear-gradient(160deg,#FFE3D6,#F4A99A)" },
  { name: "Sin filtro", hook: "Preguntas que no se hacen todos los días.", Art: CardArt, bg: "linear-gradient(160deg,#F7D9CF,#E88E83)" },
  { name: "Ruleta", hook: "Verdad, reto… o beso. Que decida la suerte.", Art: WheelArt, bg: "linear-gradient(160deg,#EDE6FF,#B9A6F2)" },
  { name: "Esto o aquello", hook: "¿Qué tan en sintonía están de verdad?", Art: SplitArt, bg: "linear-gradient(160deg,#FFE9C7,#F4B266)" },
  { name: "Pregunta del día", hook: "Una nueva cada día, para charlar.", Art: QuestionArt, bg: "linear-gradient(160deg,#D9EEE3,#8FC9AB)" },
];

const hover = { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } };

export default function Games() {
  return (
    <section id="juegos" className="band band-games">
      <div className="wrap games-grid">
        <Reveal variant="fade" stagger={0.08} className="games-copy">
          <Item as="span" variant="down" className="eyebrow">
            Juegos
          </Item>
          <Heading>¿Cuánto conoces *de verdad* a tu pareja?</Heading>
          <Item as="p" className="lead">
            Una colección de juegos para jugar juntos en un mismo teléfono:
            pásale el teléfono, ríanse y descúbranse un poco más.
          </Item>
          <Item className="games-count">
            <b>{GAMES.length - 1}</b> juegos y una pregunta diaria · y vienen más
          </Item>
        </Reveal>

        <Reveal variant="fade" stagger={0.07} className="shelf">
          {GAMES.map(({ name, hook, Art, bg }) => (
            <Item key={name} variant="scale" className="cover" whileHover={hover}>
              <div className="cover-art" style={{ background: bg }}>
                <Art />
              </div>
              <b>{name}</b>
              <small>{hook}</small>
            </Item>
          ))}
          <Item variant="scale" className="cover cover-soon">
            <div className="cover-art">
              <motion.span
                className="soon-plus"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plus size={26} />
              </motion.span>
            </div>
            <b>Más juegos</b>
            <small>Nuevos juegos en camino.</small>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
