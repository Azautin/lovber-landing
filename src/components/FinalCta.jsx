import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Heading from "./Heading.jsx";
import Mascot from "./Mascot.jsx";
import Reveal, { Item } from "./Reveal.jsx";
import { LINKS } from "../config.js";

// Corazoncitos que suben despacio detrás de Lovber (posiciones fijas).
const HEARTS = [
  { x: "12%", s: 14, d: 0, t: 7 },
  { x: "26%", s: 20, d: 2.2, t: 9 },
  { x: "41%", s: 12, d: 4.5, t: 8 },
  { x: "58%", s: 18, d: 1.1, t: 10 },
  { x: "73%", s: 13, d: 3.4, t: 7.5 },
  { x: "88%", s: 17, d: 5.6, t: 9.5 },
];

function Waitlist() {
  const [state, setState] = useState("idle");
  async function submit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    try {
      const res = await fetch(LINKS.waitlist, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }
  if (state === "done")
    return (
      <motion.p
        className="lead"
        role="status"
        style={{ marginTop: 28 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        ¡Listo! Te avisaremos cuando Lovber esté disponible ♡
      </motion.p>
    );
  return (
    <form className="waitlist" onSubmit={submit}>
      <input
        name="email"
        type="email"
        required
        placeholder="tu@correo.com"
        aria-label="Tu correo"
      />
      <button className="btn" disabled={state === "sending"}>
        {state === "sending" ? "Enviando…" : "Avísame"}
      </button>
      {state === "error" && (
        <p role="alert" style={{ flexBasis: "100%", fontSize: 13, color: "#f0c9ad" }}>
          No pudimos guardar tu correo. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}

function StoreLink({ href, store, live, off }) {
  return (
    <motion.a
      className="store-badge"
      href={href || undefined}
      aria-disabled={!href}
      whileHover={href ? { y: -3 } : undefined}
      whileTap={href ? { scale: 0.97 } : undefined}
    >
      <Sparkles size={22} />
      <span>
        <small>{href ? live : off}</small>
        <strong>{store}</strong>
      </span>
    </motion.a>
  );
}

export default function FinalCta() {
  return (
    <section className="cta-band" data-nav="dark">
      <Reveal className="cta" variant="scale" stagger={0.1} duration={1}>
        {HEARTS.map((h, i) => (
          <motion.i
            key={i}
            className="cta-heart"
            aria-hidden="true"
            style={{ left: h.x }}
            animate={{ y: [0, -340], opacity: [0, 0.55, 0], scale: [0.7, 1, 0.8] }}
            transition={{
              duration: h.t,
              delay: h.d,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <Heart size={h.s} fill="#f0a39b" color="#f0a39b" />
          </motion.i>
        ))}
        <Item variant="pop" style={{ display: "grid", justifyContent: "center" }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mascot size={120} mood="love" />
          </motion.div>
        </Item>
        <Heading as="h2">Empieza hoy a estar más presente</Heading>
        <Item as="p" className="lead">
          Es gratis para empezar. Y lo hicimos con mucho cariño, para que tú
          también puedas dárselo a esa persona.
        </Item>
        <Item className="cta-actions">
          <StoreLink
            href={LINKS.appStore}
            store="App Store"
            live="Descárgala en"
            off="Próximamente en"
          />
          <StoreLink
            href={LINKS.playStore}
            store="Google Play"
            live="Disponible en"
            off="Próximamente en"
          />
        </Item>
        {LINKS.waitlist ? <Item><Waitlist /></Item> : null}
        <Item
          as="p"
          variant="fade"
          style={{
            marginTop: 28,
            fontSize: 13,
            color: "#d9c9d4",
            display: "inline-flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <Heart size={14} fill="#f0a39b" color="#f0a39b" /> Hecho con amor
        </Item>
      </Reveal>
    </section>
  );
}
