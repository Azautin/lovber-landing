import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ITEMS = [
  "Gratis para empezar",
  "Tu pareja no necesita cuenta",
  "Lovber nunca envía nada por ti",
  "Tus fotos se quedan en tu teléfono",
  "Juegos para jugar juntos",
  "Tú decides qué se envía a la IA",
  "iOS y Android",
  "Hecha con amor",
];

/** Cinta continua con las promesas de Lovber, al pie de la diapositiva de inicio. */
export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {ITEMS.map((t) => (
        <li key={t}>
          <Heart size={14} fill="#E88E83" color="#E88E83" />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <motion.div
      className="marquee"
      aria-label="Lo que prometemos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </motion.div>
  );
}
