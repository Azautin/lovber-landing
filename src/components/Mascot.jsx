import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Geometría de ojos del personaje de la app (mismo diseño que LovBerAvatar). */
const EYES = {
  capsule: [
    { cx: 43, w: 4.6, top: 33, bot: 54, end: 43.5, a: -0.22, sw: 0 },
    { cx: 58.75, w: 4.4, top: 32, bot: 52, end: 42, a: -0.22, sw: 0 },
  ],
  happy: [
    { cx: 43, w: 6.4, top: 41.3, bot: 42.9, end: 46, a: 0.67, sw: 2.4 },
    { cx: 60, w: 6.4, top: 40.3, bot: 41.9, end: 45, a: 0.67, sw: 2.4 },
  ],
  surprised: [
    { cx: 43, w: 6, top: 37, bot: 49, end: 43, a: 0, sw: 0 },
    { cx: 60, w: 6, top: 37, bot: 49, end: 43, a: 0, sw: 0 },
  ],
  // Mira hacia arriba y a un lado, como pensando.
  thinking: [
    { cx: 46, w: 4.2, top: 30, bot: 47, end: 38.5, a: -0.22, sw: 0 },
    { cx: 61.5, w: 4, top: 29, bot: 45.5, end: 37.3, a: -0.22, sw: 0 },
  ],
  sleepy: [
    { cx: 43, w: 6.4, top: 43.7, bot: 45.3, end: 41, a: 0.67, sw: 2.4 },
    { cx: 59, w: 6.4, top: 43.7, bot: 45.3, end: 41, a: 0.67, sw: 2.4 },
  ],
};

function eyePath({ cx, w, top, bot, end, a }) {
  const l = cx - w,
    r = cx + w,
    d = w * a,
    ct = (4 * top - end) / 3,
    cb = (4 * bot - end) / 3;
  return `M ${l} ${end} C ${l + d} ${ct}, ${r - d} ${ct}, ${r} ${end} C ${r - d} ${cb}, ${l + d} ${cb}, ${l} ${end} Z`;
}

const HEART =
  "M 0 3.2 C -6 -1, -4.6 -5.6, -1.9 -5.2 C -0.9 -5, 0 -4.2, 0 -3.4 C 0 -4.2, 0.9 -5, 1.9 -5.2 C 4.6 -5.6, 6 -1, 0 3.2 Z";

/** Mezcla un color hacia el negro para el tono oscuro de los ojos. */
export function darken(hex, amount = 0.5) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.round(v * (1 - amount));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => ch(v).toString(16).padStart(2, "0"))
    .join("")}`;
}

/**
 * Pinguitin, el personaje de la app. `mood`: idle | happy | surprised | sleepy | love | thinking.
 * Los ojos se transforman entre emociones y parpadean.
 */
export default function Mascot({
  size = 220,
  color = "#2563EB",
  mood = "idle",
  float = true,
  style,
}) {
  const uid = useId().replace(/:/g, "");
  const dark = darken(color);
  const shape = mood === "idle" || mood === "love" ? "capsule" : mood;
  const loving = mood === "love";
  const thinking = mood === "thinking";
  return (
    <motion.svg
      width={size}
      height={size * 1.18}
      viewBox="0 -12 100 118"
      role="img"
      aria-label="Pinguitin, tu compañero"
      style={style}
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <clipPath id={`face-${uid}`}>
          <ellipse cx="50" cy="45" rx="30" ry="26" />
        </clipPath>
      </defs>
      <g fill={color}>
        <path d="M 50 14 C 44 8, 38 3, 31 0 C 35 6, 41 11, 49 15 Z" />
        <path d="M 50 14 C 47 8, 46 1, 48 -7 C 53 -1, 54 6, 52 14 Z" />
        <path d="M 50 14 C 56 8, 62 4, 69 1 C 64 7, 57 12, 51 15 Z" />
      </g>
      {[
        [34, -14],
        [66, 14],
      ].map(([x, r]) => (
        <g key={x} transform={`translate(${x},84) rotate(${r})`}>
          <path
            d="M -9 2 C -11 -4, -3 -7, 0 -3 C 3 -7, 11 -4, 9 2 C 7 8, -7 8, -9 2 Z"
            fill="#FB923C"
            stroke="#EA580C"
            strokeWidth="1.2"
          />
        </g>
      ))}
      <circle cx="50" cy="46" r="41" fill={color} />
      <path
        d="M 50 30 C 69 30, 82 42, 82 57 C 82 74, 68 84, 50 84 C 32 84, 18 74, 18 57 C 18 42, 31 30, 50 30 Z"
        fill="#fff"
      />
      <g transform="translate(0,12)">
        <g clipPath={`url(#face-${uid})`}>
          <g className="blink">
            {EYES[shape].map((eye, i) => (
              <motion.path
                key={i}
                initial={false}
                animate={{
                  d: eyePath(eye),
                  strokeWidth: eye.sw,
                  opacity: loving ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
                fill={dark}
                stroke={dark}
                strokeLinejoin="round"
              />
            ))}
            <AnimatePresence>
              {loving &&
                [43, 59].map((cx) => (
                  <motion.g
                    key={cx}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.18, 1] }}
                    exit={{ scale: 0 }}
                    transition={{
                      scale: { repeat: Infinity, duration: 0.9 },
                    }}
                    style={{ transformOrigin: `${cx}px 44px` }}
                  >
                    <g transform={`translate(${cx},44) scale(1.15)`}>
                      <path d={HEART} fill="#E5546E" />
                      <circle cx="-2" cy="-2.6" r="0.9" fill="#fff" opacity="0.85" />
                    </g>
                  </motion.g>
                ))}
            </AnimatePresence>
          </g>
        </g>
      </g>
      <AnimatePresence>
        {loving &&
          [
            [14, 9, 0.5],
            [87, 11, 0.42],
            [93, 35, 0.36],
            [7, 33, 0.38],
          ].map(([x, y, s], i) => (
            <motion.g
              key={x}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [0, -8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.5 }}
            >
              <g transform={`translate(${x},${y}) scale(${s})`}>
                <path d={HEART} fill="#F29AA8" />
              </g>
            </motion.g>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {thinking &&
          [
            [11, 12, 17, 0],
            [86, 10, 21, 0.6],
            [95, 32, 14, 1.2],
          ].map(([x, y, size, delay]) => (
            <motion.text
              key={x}
              x={x}
              y={y}
              fontSize={size}
              fontWeight="900"
              textAnchor="middle"
              fill="#E88E83"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: [0, -6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay }}
            >
              ?
            </motion.text>
          ))}
      </AnimatePresence>
    </motion.svg>
  );
}
