import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Estados de entrada reutilizables: todos parten de `hidden` y llegan a `show`. */
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 24 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.4 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 420, damping: 16 },
    },
  },
};

const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -70px 0px" };

/**
 * Raíz de una animación de scroll. Sus `Item` hijos heredan el estado
 * (hidden → show) y entran escalonados, así que basta un observador por bloque.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  stagger = 0,
  duration = 0.85,
  hover,
  as = "div",
  className,
  style,
  ...rest
}) {
  const Tag = motion[as];
  const base = VARIANTS[variant] ?? VARIANTS.up;
  const variants = {
    hidden: base.hidden,
    show: {
      ...base.show,
      transition: {
        duration,
        delay,
        ease: EASE,
        staggerChildren: stagger,
        delayChildren: delay + (stagger ? 0.12 : 0),
        ...base.show.transition,
      },
    },
  };
  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      whileHover={hover}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Elemento que entra cuando lo hace su `Reveal` padre. */
export function Item({
  children,
  variant = "up",
  delay = 0,
  duration = 0.65,
  as = "div",
  className,
  style,
  ...rest
}) {
  const Tag = motion[as];
  const base = VARIANTS[variant] ?? VARIANTS.up;
  const variants = {
    hidden: base.hidden,
    show: {
      ...base.show,
      transition: { duration, delay, ease: EASE, ...base.show.transition },
    },
  };
  return (
    <Tag className={className} style={style} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}
