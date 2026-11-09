import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE } from "./Reveal.jsx";

const WORD = {
  hidden: { y: "118%", rotate: 5, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

/**
 * Titular que entra palabra por palabra, como saliendo de una máscara.
 * Lo que va entre *asteriscos* se marca con <em>. Con `mount` anima al
 * cargar (hero); si no, al entrar en pantalla.
 */
export default function Heading({
  children,
  as = "h2",
  mount = false,
  delay = 0,
  stagger = 0.06,
  className,
}) {
  const Tag = motion[as];
  const text = String(children);
  const plain = text.replaceAll("*", "");
  const words = text.split("*").flatMap((seg, i) =>
    seg
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, em: i % 2 === 1 })),
  );
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = mount
    ? { animate: "show" }
    : {
        whileInView: "show",
        viewport: { once: true, amount: "some", margin: "0px 0px -60px 0px" },
      };
  return (
    <Tag
      className={className}
      aria-label={plain}
      variants={parent}
      initial="hidden"
      {...trigger}
    >
      {/* El espacio va fuera de la máscara: dentro de un inline-block se colapsa
          y las palabras quedaban pegadas. */}
      {words.map(({ w, em }, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <motion.span variants={WORD} style={{ display: "inline-block" }}>
              {em ? <em>{w}</em> : w}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
